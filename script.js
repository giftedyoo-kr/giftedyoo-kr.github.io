const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const mobileNav = document.getElementById("mobileNav");

function updateHeader() {
  if (window.scrollY > 80) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
}
window.addEventListener("scroll", updateHeader);
updateHeader();

menuButton.addEventListener("click", () => mobileNav.classList.toggle("open"));
document.querySelectorAll(".mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

/* =========================================================
   GOOGLE SHEETS CMS
   한 개의 게시된 Google Spreadsheet에서 gid별 탭을 CSV로 읽습니다.
========================================================= */

const SHEET_BASE =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTTrudN7uIQMIJKVP9c0KALbC-_wKIDtcnXvKBQTe89dBsoPHDZMc90l1NR3vfDoETf3YCE0pgKvPpM/pub";

const SHEETS = {
  SCI:     { gid: "1044637119", type: "SCI" },
  KCI:     { gid: "977487788",  type: "KCI" },
  RND:     { gid: "445426444",  type: "RND" },
  SERVICE: { gid: "2133901227", type: "SERVICE" },
  AWARD:   { gid: "1362262409", type: "AWARD" },
  BOOK:    { gid: "1750437029", type: "BOOK" }
};

function sheetUrl(gid) {
  return `${SHEET_BASE}?gid=${encodeURIComponent(gid)}&single=true&output=csv`;
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .trim();
}

function escapeHtml(value) {
  return normalizeText(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (ch === '"' && quoted && next === '"') {
      cell += '"';
      i++;
    } else if (ch === '"') {
      quoted = !quoted;
    } else if (ch === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && next === "\n") i++;
      row.push(cell);
      if (row.some(v => normalizeText(v) !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    if (row.some(v => normalizeText(v) !== "")) rows.push(row);
  }
  return rows;
}

function rowsToObjects(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map(normalizeText);

  return rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      if (header) obj[header] = normalizeText(row[i]);
    });
    return obj;
  });
}

async function loadSheet(config) {
  const response = await fetch(sheetUrl(config.gid), { cache: "no-store" });
  if (!response.ok) throw new Error(`${config.type}: HTTP ${response.status}`);
  const text = await response.text();
  return rowsToObjects(parseCSV(text)).map(row => ({
    ...row,
    __type: config.type
  }));
}

// 여러 후보 열 제목 중 실제 존재하며 값이 있는 첫 번째 값 반환
function pick(row, candidates) {
  for (const key of candidates) {
    if (Object.prototype.hasOwnProperty.call(row, key) && normalizeText(row[key])) {
      return normalizeText(row[key]);
    }
  }
  return "";
}

function parseFlexibleDate(row) {
  const raw = pick(row, [
    "Date", "날짜", "일자", "게재일자", "수상일", "수상일자",
    "발행일", "출판일", "종료일", "과제종료일", "연구종료일"
  ]);

  let m = raw.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]).getTime();

  m = raw.match(/(\d{4})\D+(\d{1,2})/);
  if (m) return new Date(+m[1], +m[2] - 1, 1).getTime();

  const year = Number(pick(row, ["연도", "년도", "게재연도", "발행연도", "수상연도", "종료연도", "시작연도"])) || 0;
  const month = Number(pick(row, ["게재월", "발행월", "월"])) || 1;
  const day = Number(pick(row, ["게재일", "일"])) || 1;

  return year ? new Date(year, month - 1, day).getTime() : 0;
}

function displayYear(row) {
  const explicit = pick(row, ["연도", "년도", "게재연도", "발행연도", "수상연도"]);
  if (explicit) return explicit;

  const raw = pick(row, ["Date", "날짜", "일자", "수상일", "발행일", "출판일", "종료일", "시작일"]);
  const m = raw.match(/\d{4}/);
  return m ? m[0] : "";
}

function normalizeDoi(value) {
  let doi = normalizeText(value);
  if (!doi) return "";

  const markdownMatch = doi.match(/\((https?:\/\/[^)]+)\)/i);
  if (markdownMatch) doi = markdownMatch[1];

  doi = doi.replace(/^doi:\s*/i, "");
  if (/^https?:\/\//i.test(doi)) return doi;
  return `https://doi.org/${doi}`;
}

/* =========================
   PUBLICATIONS
========================= */

let publications = [];
let currentPublicationFilter = "ALL";

function publicationTitle(pub) {
  return pick(pub, ["제목", "논문명", "논문제목", "저서명", "도서명", "책제목", "Title"]);
}

function publicationAuthors(pub) {
  return pick(pub, ["저자", "저자명", "집필자", "Authors", "Author"]);
}

function publicationSource(pub) {
  if (pub.__type === "BOOK") {
    return [
      pick(pub, ["출판사", "발행기관명", "발행처", "출판기관"]),
      pick(pub, ["ISBN", "isbn"])
    ].filter(Boolean).join(" · ");
  }

  return [
    pick(pub, ["학술지명", "저널명", "Journal"]),
    pick(pub, ["권호명", "권호", "Volume"]),
    pick(pub, ["페이지", "Pages"])
  ].filter(Boolean).join(" · ");
}

function publicationGrade(pub) {
  if (pub.__type === "BOOK") return "BOOK";
  return pick(pub, ["학술지 등급", "학술지등급", "등급"]) || pub.__type;
}

function updatePublicationCounts() {
  const counts = {
    ALL: publications.length,
    SCI: publications.filter(p => p.__type === "SCI").length,
    KCI: publications.filter(p => p.__type === "KCI").length,
    BOOK: publications.filter(p => p.__type === "BOOK").length
  };

  document.getElementById("countAll").textContent = counts.ALL;
  document.getElementById("countSci").textContent = counts.SCI;
  document.getElementById("countKci").textContent = counts.KCI;
  document.getElementById("countBook").textContent = counts.BOOK;
}

function renderPublications(filter = currentPublicationFilter) {
  currentPublicationFilter = filter;
  const list = document.getElementById("publicationList");
  const status = document.getElementById("publicationStatus");

  const filtered = publications.filter(pub => filter === "ALL" || pub.__type === filter);
  status.textContent = "";

  if (!filtered.length) {
    list.innerHTML = '<div class="publication-empty">표시할 출판물이 없습니다.</div>';
    return;
  }

  list.innerHTML = filtered.map(pub => {
    const title = publicationTitle(pub);
    const authors = publicationAuthors(pub);
    const source = publicationSource(pub);
    const year = displayYear(pub);
    const grade = publicationGrade(pub);
    const doi = normalizeDoi(pick(pub, ["DOI", "doi"]));
    const isbn = pick(pub, ["ISBN", "isbn"]);

    return `
      <article class="publication-item-sheet">
        <span class="pub-year">${escapeHtml(year)}</span>

        <div class="pub-main">
          <h4>${escapeHtml(title)}</h4>
          ${authors ? `<p class="pub-authors-sheet">${escapeHtml(authors)}</p>` : ""}
          ${source ? `<p class="pub-journal-sheet">${escapeHtml(source)}</p>` : ""}
        </div>

        <div class="pub-side">
          <span class="pub-grade">${escapeHtml(grade)}</span>
          ${doi ? `<a class="pub-doi" href="${escapeHtml(doi)}" target="_blank" rel="noopener noreferrer">DOI ↗</a>` : ""}
          ${!doi && isbn ? `<span class="pub-isbn">ISBN</span>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

async function loadPublications() {
  const status = document.getElementById("publicationStatus");
  try {
    const [sci, kci, books] = await Promise.all([
      loadSheet(SHEETS.SCI),
      loadSheet(SHEETS.KCI),
      loadSheet(SHEETS.BOOK)
    ]);

    publications = [...sci, ...kci, ...books]
      .filter(publicationTitle)
      .sort((a, b) => parseFlexibleDate(b) - parseFlexibleDate(a));

    updatePublicationCounts();
    renderPublications("ALL");
  } catch (error) {
    console.error("Publication load error:", error);
    status.textContent = "출판물 데이터를 불러오지 못했습니다. 해당 탭이 '웹에 게시'되어 있는지 확인해주세요.";
  }
}

document.querySelectorAll(".pub-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderPublications(button.dataset.filter);
  });
});

/* =========================
   PROJECTS
========================= */

let projects = [];
let currentProjectFilter = "ALL";

function projectTitle(row) {
  return pick(row, [
    "과제명", "연구과제명", "사업명", "용역명", "프로젝트명",
    "과업명", "연구명", "제목", "Project"
  ]);
}

function projectOrganization(row) {
  return pick(row, [
    "발주기관", "발주처", "지원기관", "주관기관", "연구기관",
    "수행기관", "기관명", "부처", "Funding Agency"
  ]);
}

function projectRole(row) {
  return pick(row, [
    "역할", "참여구분", "연구역할", "책임구분", "직책",
    "구분", "참여형태"
  ]);
}

function projectPeriod(row) {
  const direct = pick(row, ["연구기간", "과제기간", "사업기간", "수행기간", "기간"]);
  if (direct) return direct;

  const start = pick(row, ["시작일", "연구시작일", "과제시작일", "시작연도"]);
  const end = pick(row, ["종료일", "연구종료일", "과제종료일", "종료연도"]);
  if (start && end) return `${start} – ${end}`;
  return start || end || "";
}

function projectYear(row) {
  const period = projectPeriod(row);
  const years = period.match(/\d{4}/g);
  if (years?.length) return years[years.length - 1];
  return displayYear(row);
}

function updateProjectCounts() {
  document.getElementById("countProjectAll").textContent = projects.length;
  document.getElementById("countRnd").textContent = projects.filter(p => p.__type === "RND").length;
  document.getElementById("countService").textContent = projects.filter(p => p.__type === "SERVICE").length;
}

function renderProjects(filter = currentProjectFilter) {
  currentProjectFilter = filter;
  const list = document.getElementById("projectList");
  const status = document.getElementById("projectStatus");

  const filtered = projects.filter(p => filter === "ALL" || p.__type === filter);
  status.textContent = "";

  if (!filtered.length) {
    list.innerHTML = '<div class="sheet-empty">표시할 프로젝트가 없습니다.</div>';
    return;
  }

  list.innerHTML = filtered.map(project => {
    const type = project.__type === "RND" ? "R&D" : "RESEARCH SERVICE";
    const org = projectOrganization(project);
    const role = projectRole(project);
    const period = projectPeriod(project);
    const details = [org, role, period].filter(Boolean).join(" · ");

    return `
      <article class="project-item">
        <div class="project-year">${escapeHtml(projectYear(project))}</div>
        <div class="project-main">
          <span class="project-category">${type}</span>
          <h3>${escapeHtml(projectTitle(project))}</h3>
          ${details ? `<p>${escapeHtml(details)}</p>` : ""}
        </div>
        <div class="project-arrow">↗</div>
      </article>
    `;
  }).join("");
}

async function loadProjects() {
  const status = document.getElementById("projectStatus");

  try {
    const [rnd, service] = await Promise.all([
      loadSheet(SHEETS.RND),
      loadSheet(SHEETS.SERVICE)
    ]);

    projects = [...rnd, ...service]
      .filter(projectTitle)
      .sort((a, b) => parseFlexibleDate(b) - parseFlexibleDate(a));

    updateProjectCounts();
    renderProjects("ALL");
  } catch (error) {
    console.error("Project load error:", error);
    status.textContent = "프로젝트 데이터를 불러오지 못했습니다. R&D·용역 탭의 게시 설정을 확인해주세요.";
  }
}

document.querySelectorAll(".project-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".project-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

/* =========================
   AWARDS
========================= */

function awardTitle(row) {
  return pick(row, [
    "수상명", "상훈명", "수상내역", "수상내용", "표창명",
    "상명", "제목", "Award"
  ]);
}

function awardOrganization(row) {
  return pick(row, [
    "수여기관", "수상기관", "주최기관", "기관명", "수여자",
    "주최", "발행기관명"
  ]);
}

function awardDate(row) {
  return pick(row, ["수상일", "수상일자", "Date", "날짜", "일자"]) || displayYear(row);
}

async function loadAwards() {
  const list = document.getElementById("awardList");
  const status = document.getElementById("awardStatus");

  try {
    const awards = (await loadSheet(SHEETS.AWARD))
      .filter(awardTitle)
      .sort((a, b) => parseFlexibleDate(b) - parseFlexibleDate(a));

    status.textContent = "";

    if (!awards.length) {
      list.innerHTML = '<div class="sheet-empty">표시할 수상 내역이 없습니다.</div>';
      return;
    }

    list.innerHTML = awards.map(award => {
      const org = awardOrganization(award);
      const date = awardDate(award);
      const detail = pick(award, ["비고", "내용", "설명", "수상내용"]);

      return `
        <article class="award-item">
          <div class="award-date">${escapeHtml(date)}</div>
          <div>
            <h4>${escapeHtml(awardTitle(award))}</h4>
            ${org ? `<p>${escapeHtml(org)}</p>` : ""}
            ${detail && detail !== awardTitle(award) ? `<p class="award-detail">${escapeHtml(detail)}</p>` : ""}
          </div>
        </article>
      `;
    }).join("");
  } catch (error) {
    console.error("Award load error:", error);
    status.textContent = "수상 데이터를 불러오지 못했습니다. 수상 탭의 게시 설정을 확인해주세요.";
  }
}

/* =========================
   START
========================= */

loadPublications();
loadProjects();
loadAwards();
