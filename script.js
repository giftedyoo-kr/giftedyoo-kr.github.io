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
   GOOGLE SHEETS MULTI-TAB CMS
   Google Visualization JSONP를 사용하여 CORS 문제 없이 gid별 탭을 읽습니다.
========================================================= */

const SPREADSHEET_ID = "15DexGfSfuem7AJMuJEjm_QOB43uTK07_enAjPhgq900";

const SHEETS = {
  SCI:     { gid: "1044637119", type: "SCI", label: "SCI" },
  KCI:     { gid: "977487788",  type: "KCI", label: "KCI" },
  RND:     { gid: "445426444",  type: "RND", label: "R&D" },
  SERVICE: { gid: "2133901227", type: "SERVICE", label: "용역" },
  AWARD:   { gid: "1362262409", type: "AWARD", label: "수상" },
  BOOK:    { gid: "1750437029", type: "BOOK", label: "저서" }
};

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

/*
  <script src="..."> 방식의 JSONP이므로 다른 도메인의 데이터를 읽을 때
  fetch()에서 생길 수 있는 CORS 차단을 받지 않습니다.
*/
function loadGoogleSheet(config) {
  return new Promise((resolve, reject) => {
    const callbackName = `__gs_${config.type}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");

    const cleanup = () => {
      try { delete window[callbackName]; } catch (_) { window[callbackName] = undefined; }
      script.remove();
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`${config.label}: 응답 시간 초과`));
    }, 15000);

    window[callbackName] = (response) => {
      clearTimeout(timer);
      try {
        if (!response || response.status === "error" || !response.table) {
          const detail = response?.errors?.map(e => e.detailed_message || e.message).join(" / ") || "Google Sheets 응답 오류";
          throw new Error(`${config.label}: ${detail}`);
        }
        const rows = visualizationTableToObjects(response.table).map(row => ({
          ...row,
          __type: config.type
        }));
        cleanup();
        resolve(rows);
      } catch (err) {
        cleanup();
        reject(err);
      }
    };

    script.onerror = () => {
      clearTimeout(timer);
      cleanup();
      reject(new Error(`${config.label}: Google Sheets 스크립트를 불러오지 못했습니다.`));
    };

    const tqx = encodeURIComponent(`responseHandler:${callbackName}`);
    script.src = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?gid=${encodeURIComponent(config.gid)}&headers=1&tqx=${tqx}&_=${Date.now()}`;
    document.head.appendChild(script);
  });
}

function visualizationTableToObjects(table) {
  const headers = (table.cols || []).map((col, i) => {
    const label = normalizeText(col.label || col.id || "");
    return label || `COL_${i + 1}`;
  });

  return (table.rows || []).map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      const cell = row.c?.[i];
      if (!cell) obj[header] = "";
      else if (cell.f !== undefined && cell.f !== null) obj[header] = normalizeText(cell.f);
      else obj[header] = normalizeText(cell.v);
    });
    return obj;
  });
}

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

async function settleSheets(configs) {
  const results = await Promise.allSettled(configs.map(loadGoogleSheet));
  const rows = [];
  const failed = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") rows.push(...result.value);
    else failed.push(`${configs[i].label}: ${result.reason?.message || "오류"}`);
  });
  return { rows, failed };
}

/* ========================= PUBLICATIONS ========================= */
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
  document.getElementById("countAll").textContent = publications.length;
  document.getElementById("countSci").textContent = publications.filter(p => p.__type === "SCI").length;
  document.getElementById("countKci").textContent = publications.filter(p => p.__type === "KCI").length;
  document.getElementById("countBook").textContent = publications.filter(p => p.__type === "BOOK").length;
}
function renderPublications(filter = currentPublicationFilter) {
  currentPublicationFilter = filter;
  const list = document.getElementById("publicationList");
  const filtered = publications.filter(pub => filter === "ALL" || pub.__type === filter);
  if (!filtered.length) {
    list.innerHTML = '<div class="publication-empty">표시할 출판물이 없습니다.</div>';
    return;
  }
  list.innerHTML = filtered.map(pub => {
    const doi = normalizeDoi(pick(pub, ["DOI", "doi"]));
    const isbn = pick(pub, ["ISBN", "isbn"]);
    return `
      <article class="publication-item-sheet">
        <span class="pub-year">${escapeHtml(displayYear(pub))}</span>
        <div class="pub-main">
          <h4>${escapeHtml(publicationTitle(pub))}</h4>
          ${publicationAuthors(pub) ? `<p class="pub-authors-sheet">${escapeHtml(publicationAuthors(pub))}</p>` : ""}
          ${publicationSource(pub) ? `<p class="pub-journal-sheet">${escapeHtml(publicationSource(pub))}</p>` : ""}
        </div>
        <div class="pub-side">
          <span class="pub-grade">${escapeHtml(publicationGrade(pub))}</span>
          ${doi ? `<a class="pub-doi" href="${escapeHtml(doi)}" target="_blank" rel="noopener noreferrer">DOI ↗</a>` : ""}
          ${!doi && isbn ? `<span class="pub-isbn">ISBN</span>` : ""}
        </div>
      </article>`;
  }).join("");
}
async function loadPublications() {
  const status = document.getElementById("publicationStatus");
  const { rows, failed } = await settleSheets([SHEETS.SCI, SHEETS.KCI, SHEETS.BOOK]);
  publications = rows.filter(publicationTitle).sort((a,b) => parseFlexibleDate(b)-parseFlexibleDate(a));
  updatePublicationCounts();
  renderPublications("ALL");
  status.textContent = failed.length ? `일부 탭을 불러오지 못했습니다: ${failed.join(" | ")}` : "";
}
document.querySelectorAll(".pub-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderPublications(button.dataset.filter);
  });
});

/* ========================= PROJECTS ========================= */
let projects = [];
let currentProjectFilter = "ALL";

function projectTitle(row) {
  return pick(row, ["과제명", "연구과제명", "사업명", "용역명", "프로젝트명", "과업명", "연구명", "제목", "Project"]);
}
function projectOrganization(row) {
  return pick(row, ["발주기관", "발주처", "지원기관", "주관기관", "연구기관", "수행기관", "기관명", "부처", "Funding Agency"]);
}
function projectRole(row) {
  return pick(row, ["역할", "참여구분", "연구역할", "책임구분", "직책", "구분", "참여형태"]);
}
function projectPeriod(row) {
  const direct = pick(row, ["연구기간", "과제기간", "사업기간", "수행기간", "기간"]);
  if (direct) return direct;
  const start = pick(row, ["시작일", "연구시작일", "과제시작일", "시작연도"]);
  const end = pick(row, ["종료일", "연구종료일", "과제종료일", "종료연도"]);
  return start && end ? `${start} – ${end}` : (start || end || "");
}
function projectYear(row) {
  const years = projectPeriod(row).match(/\d{4}/g);
  return years?.length ? years[years.length-1] : displayYear(row);
}
function updateProjectCounts() {
  document.getElementById("countProjectAll").textContent = projects.length;
  document.getElementById("countRnd").textContent = projects.filter(p => p.__type === "RND").length;
  document.getElementById("countService").textContent = projects.filter(p => p.__type === "SERVICE").length;
}
function renderProjects(filter = currentProjectFilter) {
  currentProjectFilter = filter;
  const list = document.getElementById("projectList");
  const filtered = projects.filter(p => filter === "ALL" || p.__type === filter);
  if (!filtered.length) {
    list.innerHTML = '<div class="sheet-empty">표시할 프로젝트가 없습니다.</div>';
    return;
  }
  list.innerHTML = filtered.map(project => {
    const details = [projectOrganization(project), projectRole(project), projectPeriod(project)].filter(Boolean).join(" · ");
    return `
      <article class="project-item">
        <div class="project-year">${escapeHtml(projectYear(project))}</div>
        <div class="project-main">
          <span class="project-category">${project.__type === "RND" ? "R&D" : "RESEARCH SERVICE"}</span>
          <h3>${escapeHtml(projectTitle(project))}</h3>
          ${details ? `<p>${escapeHtml(details)}</p>` : ""}
        </div>
        <div class="project-arrow">↗</div>
      </article>`;
  }).join("");
}
async function loadProjects() {
  const status = document.getElementById("projectStatus");
  const { rows, failed } = await settleSheets([SHEETS.RND, SHEETS.SERVICE]);
  projects = rows.filter(projectTitle).sort((a,b) => parseFlexibleDate(b)-parseFlexibleDate(a));
  updateProjectCounts();
  renderProjects("ALL");
  status.textContent = failed.length ? `일부 탭을 불러오지 못했습니다: ${failed.join(" | ")}` : "";
}
document.querySelectorAll(".project-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".project-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});

/* ========================= AWARDS ========================= */
function awardTitle(row) {
  return pick(row, ["수상명", "상훈명", "수상내역", "수상내용", "표창명", "상명", "제목", "Award"]);
}
function awardOrganization(row) {
  return pick(row, ["수여기관", "수상기관", "주최기관", "기관명", "수여자", "주최", "발행기관명"]);
}
function awardDate(row) {
  return pick(row, ["수상일", "수상일자", "Date", "날짜", "일자"]) || displayYear(row);
}
async function loadAwards() {
  const list = document.getElementById("awardList");
  const status = document.getElementById("awardStatus");
  try {
    const rows = (await loadGoogleSheet(SHEETS.AWARD)).filter(awardTitle).sort((a,b) => parseFlexibleDate(b)-parseFlexibleDate(a));
    status.textContent = "";
    if (!rows.length) {
      list.innerHTML = '<div class="sheet-empty">표시할 수상 내역이 없습니다.</div>';
      return;
    }
    list.innerHTML = rows.map(award => {
      const org = awardOrganization(award);
      const detail = pick(award, ["비고", "내용", "설명"]);
      return `
        <article class="award-item">
          <div class="award-date">${escapeHtml(awardDate(award))}</div>
          <div>
            <h4>${escapeHtml(awardTitle(award))}</h4>
            ${org ? `<p>${escapeHtml(org)}</p>` : ""}
            ${detail ? `<p class="award-detail">${escapeHtml(detail)}</p>` : ""}
          </div>
        </article>`;
    }).join("");
  } catch (error) {
    console.error("Award load error:", error);
    status.textContent = `수상 데이터를 불러오지 못했습니다: ${error.message}`;
  }
}

loadPublications();
loadProjects();
loadAwards();
