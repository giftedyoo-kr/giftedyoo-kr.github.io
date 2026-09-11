/*
  Youngjae Yoo Academic Website
  Client-side interactions, bilingual content, Google Sheets integration,
  publication/project/award rendering, and homepage statistics.
*/

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
   LANGUAGE & LOCALIZATION
========================================================= */

let currentLang = localStorage.getItem("siteLang") || "ko";

const I18N = {
  ko: {
    "hero.description": "기후위기에 따른 적응, 재난·재해 대응, 생태계 보전 등과 관련된 계획 및 정책을 연구합니다.<br>과학적 근거를 정책과 계획으로 연결해 더 회복력 있는 미래를 만드는 연구를 지향합니다.",
    "research.profileLead": "기후변화가 자연환경과 사회에 미치는 영향을 분석하고, 실질적인 정책 수단과 적응 전략으로 연결합니다.",
    "research.profileBody": "주요 관심 분야는 기후위기 적응, 재난·재해 위험평가, GIS 및 위성영상 기반 환경변화 분석, 환경계획 및 정책수립, 자연자본과 생태계서비스입니다.",
    "research.interestsBody": "기후변화가 자연환경과 사회에 미치는 영향을 분석하고, 실질적인 정책 수단과 적응 전략으로 연결합니다.",
    "research.card1": "기후변화 영향과 취약성, 적응정보를 분석하고 기후위기 적응계획과 정책 의사결정을 지원하는 체계와 전략을 연구합니다.",
    "research.card2": "자연환경·인간·기반시설 등에서 발생하는 기후 재난·재해 위험에 대한 위험요인과 영향을 분석하고 공간적으로 평가합니다.",
    "research.card3": "GIS와 위성영상 기반 공간분석, 종분포모형 등 다양한 모델링 기법을 활용해 환경·생태 변화와 공간적 패턴을 분석합니다.",
    "research.card4": "생물다양성, 보호지역, 생태복원, 생태계서비스와 자연자본을 분석하고 생태계 보전·복원과 정책 활용방안을 연구합니다.",
    "project.service": "용역",
    "project.pi": "책임연구원",
    "project.participant": "참여연구원",
    "status.projects": "Loading projects...",
    "status.publications": "Loading publications...",
    "status.awards": "Loading awards...",
    "more.projects": "Projects 더보기",
    "more.publications": "Publications 더보기",
    "collapse": "접기",
    "empty.projects": "해당 조건의 프로젝트가 없습니다.",
    "empty.publications": "표시할 출판물이 없습니다.",
    "empty.awards": "표시할 수상 내역이 없습니다.",
    "award.organizer": "주최",
    "firstauthor": "1저자",
    "cofirst": "공동1저자",
    "corresponding": "교신저자",
    "service.label": "용역",
    "role.pi": "책임연구원",
    "role.participant": "참여연구원",
    "role.researcher": "연구원",
    "role.assistant": "연구보조원",
    "home.publications.total": "총 논문수",
    "home.publications.sci": "SCI 논문수",
    "home.publications.kci": "KCI 논문수",
    "home.projects.total": "총 참여과제수",
    "home.projects.rnd": "R&D 과제수",
    "home.projects.service": "용역과제수",
    "home.projects.note": "※ R&D 과제는 연차와 관계없이 연속과제일 경우 하나의 과제로 집계하였습니다.",
    "contact.phoneLabel": "OFFICE PHONE",
    "contact.phone": "033-259-0127",
    "load.partial": "일부 탭을 불러오지 못했습니다",
    "profile.periodCurrent": "2026.08.–현재",
    "profile.periodProfessor": "2023.03.–2026.08.",
    "profile.periodResearcher": "2019.01.–2019.08.",
    "profile.periodEducation": "2019.09.–2023.02."
  },
  en: {
    "hero.description": "I study planning and policy for climate adaptation, disaster risk reduction, and ecosystem conservation.<br>My research aims to translate scientific evidence into policy and planning for a more resilient future.",
    "research.profileLead": "I analyze how climate change affects natural environments and society, and translate the findings into practical policy instruments and adaptation strategies.",
    "research.profileBody": "My main interests include climate adaptation, disaster and climate risk assessment, GIS- and satellite-based environmental change analysis, environmental planning and policymaking, natural capital, and ecosystem services.",
    "research.interestsBody": "I analyze the impacts of climate change on the natural environment and society and translate these insights into practical policy measures and adaptation strategies.",
    "research.card1": "I analyze climate impacts, vulnerability, and adaptation information, and develop frameworks and strategies that support climate adaptation planning and policy decisions.",
    "research.card2": "I analyze the drivers and impacts of climate-related disasters and hazards affecting the natural environment, people, and infrastructure, and assess these risks spatially.",
    "research.card3": "I use GIS- and satellite-based spatial analysis, species distribution modeling, and other modeling approaches to examine environmental and ecological change and spatial patterns.",
    "research.card4": "I study biodiversity, protected areas, ecological restoration, ecosystem services, and natural capital, with a focus on conservation, restoration, and policy applications.",
    "project.service": "Research Contract",
    "project.pi": "Principal",
    "project.participant": "Participant",
    "status.projects": "Loading projects...",
    "status.publications": "Loading publications...",
    "status.awards": "Loading awards...",
    "more.projects": "View more projects",
    "more.publications": "View more publications",
    "collapse": "Collapse",
    "empty.projects": "No projects match the selected filters.",
    "empty.publications": "No publications to display.",
    "empty.awards": "No awards to display.",
    "award.organizer": "Organizer",
    "firstauthor": "First author",
    "cofirst": "Co-first author",
    "corresponding": "Corresponding author",
    "service.label": "Research Contract",
    "role.pi": "Principal Researcher",
    "role.participant": "Participating Researcher",
    "role.researcher": "Researcher",
    "role.assistant": "Research Assistant",
    "home.publications.total": "Total Papers",
    "home.publications.sci": "SCI Papers",
    "home.publications.kci": "KCI Papers",
    "home.projects.total": "Total Projects",
    "home.projects.rnd": "R&D Projects",
    "home.projects.service": "Research Contracts",
    "home.projects.note": "※ Continuous R&D projects are counted as one project regardless of the project year.",
    "contact.phoneLabel": "OFFICE PHONE",
    "contact.phone": "+82-33-259-0127",
    "load.partial": "Some sheets could not be loaded",
    "profile.periodCurrent": "Aug 2026–Present",
    "profile.periodProfessor": "Mar 2023–Aug 2026",
    "profile.periodResearcher": "Jan 2019–Aug 2019",
    "profile.periodEducation": "Sep 2019–Feb 2023"
  }
};

function t(key) {
  return I18N[currentLang]?.[key] ?? I18N.ko[key] ?? key;
}

function applyStaticLanguage() {
  document.documentElement.lang = currentLang;
  document.body.classList.toggle("lang-en", currentLang === "en");
  document.body.classList.toggle("lang-ko", currentLang === "ko");

  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  document.querySelectorAll(".language-button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  if (personalData?.sections) renderPersonalData();

  document.querySelectorAll(".language-namecard").forEach(img => {
    const nextSrc = currentLang === "en" ? img.dataset.srcEn : img.dataset.srcKo;
    if (nextSrc && img.getAttribute("src") !== nextSrc) {
      img.setAttribute("src", nextSrc);
    }
  });
}

function refreshDynamicLanguage() {
  if (publications.length) renderPublications(currentPublicationFilter);
  if (projects.length) renderProjects();
  if (typeof renderAwardsFromCache === "function") renderAwardsFromCache();
  renderHomeOverview();
}

function setLanguage(lang) {
  currentLang = lang === "en" ? "en" : "ko";
  localStorage.setItem("siteLang", currentLang);
  applyStaticLanguage();
  refreshDynamicLanguage();
}

document.querySelectorAll(".language-button").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

applyStaticLanguage();


/* OPTIONAL IMAGES — hide missing assets and adapt image orientation. */
document.querySelectorAll(".optional-image-slot img").forEach((img) => {
  const slot = img.closest(".optional-image-slot");

  const applyState = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    slot.hidden = false;
    if (
      img.classList.contains("namecard-image") ||
      img.classList.contains("contact-photo")
    ) {
      img.classList.toggle("landscape", img.naturalWidth >= img.naturalHeight);
      img.classList.toggle("portrait", img.naturalWidth < img.naturalHeight);
    }
  };

  img.addEventListener("load", applyState);
  img.addEventListener("error", () => { slot.hidden = true; });

  if (img.complete) {
    if (img.naturalWidth) applyState();
    else slot.hidden = true;
  }
});

/* =========================================================
   GOOGLE SHEETS DATA SOURCE
   Google Visualization JSONP is used to load each sheet tab.
========================================================= */

let SPREADSHEET_ID = "15DexGfSfuem7AJMuJEjm_QOB43uTK07_enAjPhgq900";

const SHEETS = {
  SCI:     { gid: "1044637119", type: "SCI", label: "SCI" },
  KCI:     { gid: "977487788",  type: "KCI", label: "KCI" },
  RND:     { gid: "445426444",  type: "RND", label: "R&D" },
  SERVICE: { gid: "2133901227", type: "SERVICE", label: "용역" },
  AWARD:   { gid: "1362262409", type: "AWARD", label: "수상" },
  BOOK:    { gid: "1750437029", type: "BOOK", label: "저서" }
};

const PERSONAL_DATA_FILE = "personal_data.txt";
var personalData = { global: {}, sections: {} };

function cleanConfigValue(value) {
  return String(value ?? "")
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .trim();
}

function extractGid(value) {
  const text = cleanConfigValue(value);
  const gidMatch = text.match(/(?:^|[?#&\s])gid\s*=\s*(\d+)/i);
  if (gidMatch) return gidMatch[1];
  const numberMatch = text.match(/\b(\d+)\b/);
  return numberMatch ? numberMatch[1] : text;
}

function parsePersonalData(text) {
  const result = { global: {}, sections: {} };
  let current = result.global;

  String(text ?? "").split(/\r?\n/).forEach(rawLine => {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || line.startsWith("//")) return;

    const sectionMatch = line.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const section = sectionMatch[1].trim().toLowerCase();
      result.sections[section] ||= [];
      current = {};
      result.sections[section].push(current);
      return;
    }

    const match = line.match(/^([^:=]+?)\s*[:=]\s*(.*)$/);
    if (!match) return;
    const key = match[1].trim().toLowerCase();
    current[key] = cleanConfigValue(match[2]);
  });

  return result;
}

function pd(section, key, fallback = "") {
  const rows = personalData.sections[section] || [];
  const value = rows[0]?.[key];
  return value !== undefined && value !== "" ? value : fallback;
}

function applyGoogleSheetsPersonalData() {
  const cfg = personalData.sections.google_sheets?.[0] || personalData.global;
  if (cfg.spreadsheet_id) SPREADSHEET_ID = cleanConfigValue(cfg.spreadsheet_id);
  if (cfg.publication_sci_gid) SHEETS.SCI.gid = extractGid(cfg.publication_sci_gid);
  if (cfg.publication_kci_gid) SHEETS.KCI.gid = extractGid(cfg.publication_kci_gid);
  if (cfg.publication_book_gid) SHEETS.BOOK.gid = extractGid(cfg.publication_book_gid);
  if (cfg.project_rnd_gid) SHEETS.RND.gid = extractGid(cfg.project_rnd_gid);
  if (cfg.project_service_gid) SHEETS.SERVICE.gid = extractGid(cfg.project_service_gid);
  if (cfg.award_gid) SHEETS.AWARD.gid = extractGid(cfg.award_gid);
}

function escapePersonal(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function personalPeriod(value) {
  const period = String(value || "");
  return currentLang === "en" ? period.replace(/현재/g, "Present") : period;
}

function personalLocalized(item, baseKey) {
  const preferred = currentLang === "en" ? item[`${baseKey}_en`] : item[`${baseKey}_ko`];
  const fallback = currentLang === "en" ? item[`${baseKey}_ko`] : item[`${baseKey}_en`];
  return preferred || fallback || item[baseKey] || "";
}

function renderPersonalData() {
  const current = personalData.sections.current_position?.[0] || {};
  const currentBox = document.getElementById("currentPosition");
  if (currentBox) {
    const rows = [
      [current.company_name_ko, current.company_name_en],
      [current.department_name_ko, current.department_name_en],
      [current.position_ko, current.position_en]
    ].filter(([ko, en]) => ko || en);
    currentBox.innerHTML = rows.map(([ko, en]) => `
      <div class="current-position-row">
        <strong class="current-ko">${escapePersonal(ko || en || "")}</strong>
        <span class="current-en">${escapePersonal(en || ko || "")}</span>
      </div>`).join("");
  }

  const companyLink = document.getElementById("currentPositionCompanyLink");
  if (companyLink && current.company_url) companyLink.href = current.company_url;
  const companyLogo = document.getElementById("currentPositionLogo");
  if (companyLogo && current.logo_image) companyLogo.src = current.logo_image;

  const profile = personalData.sections.profile?.[0] || {};
  const profileImage = document.getElementById("profileImage");
  if (profileImage && profile.profile_image) profileImage.src = profile.profile_image;

  const expBox = document.getElementById("professionalExperienceTimeline");
  if (expBox) {
    expBox.innerHTML = (personalData.sections.professional_experience || []).map(item => `
      <div class="timeline-item">
        <div class="timeline-period">${escapePersonal(personalPeriod(item.period))}</div>
        <div>
          <span class="timeline-type">${escapePersonal(item.position || "")}</span>
          <h4 class="institution-ko">${escapePersonal(item.institution_ko || item.institution_en || "")}</h4>
          <p class="institution-en">${escapePersonal(item.institution_en || item.institution_ko || "")}</p>
        </div>
      </div>`).join("");
  }

  const eduBox = document.getElementById("educationTimeline");
  if (eduBox) {
    eduBox.innerHTML = (personalData.sections.education || []).map(item => `
      <div class="timeline-item">
        <div class="timeline-period">${escapePersonal(personalPeriod(item.period))}</div>
        <div class="education-content">
          <span class="timeline-type">${escapePersonal(item.degree || "")}</span>
          ${personalLocalized(item, "degree_detail") ? `<p class="degree-detail">${escapePersonal(personalLocalized(item, "degree_detail"))}</p>` : ""}
          <h4 class="institution-ko">${escapePersonal(item.school_department_ko || item.school_department_en || "")}</h4>
          <p class="institution-en">${escapePersonal(item.school_department_en || item.school_department_ko || "")}</p>
        </div>
      </div>`).join("");
  }

  const contact = personalData.sections.contact?.[0] || {};
  const email = document.getElementById("contactEmail");
  if (email && contact.email) { email.textContent = contact.email; email.href = `mailto:${contact.email}`; }
  const phone = document.getElementById("contactPhone");
  if (phone && contact.office_phone) {
    phone.textContent = currentLang === "en" && contact.office_phone_en ? contact.office_phone_en : contact.office_phone;
    phone.href = `tel:${(contact.office_phone_tel || contact.office_phone).replace(/[^+\d]/g, "")}`;
  }
  const rg = document.getElementById("contactResearchGate");
  if (rg && contact.researchgate_url) {
    rg.href = contact.researchgate_url;
    rg.textContent = `${contact.researchgate_label || "ResearchGate"} ↗`;
  }
  const gs = document.getElementById("contactGoogleScholar");
  if (gs && contact.google_scholar_url) {
    gs.href = contact.google_scholar_url;
    gs.textContent = `${contact.google_scholar_label || "Google Scholar"} ↗`;
  }
}

async function loadPersonalData() {
  try {
    const response = await fetch(`${PERSONAL_DATA_FILE}?_=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    personalData = parsePersonalData(await response.text());
    applyGoogleSheetsPersonalData();
    renderPersonalData();
  } catch (error) {
    console.warn(`${PERSONAL_DATA_FILE}을 불러오지 못해 HTML/JavaScript 기본값을 사용합니다.`, error);
  }
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

function pickLang(row, koCandidates, enCandidates = []) {
  if (currentLang === "en") {
    const english = pick(row, enCandidates);
    if (english) return english;
  }
  return pick(row, koCandidates);
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

/* =========================================================
   HOME OVERVIEW
========================================================= */
function setHomeCount(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(value);
}

function publicationYearForOverview(pub) {
  const year = normalizeText(displayYear(pub)).match(/\d{4}/);
  return year ? Number(year[0]) : 0;
}

function normalizeContinuousProjectTitle(row) {
  const raw = pick(row, [
    "과제명", "연구과제명", "사업명", "용역명", "프로젝트명",
    "과업명", "연구명", "제목", "Project"
  ]);

  return normalizeText(raw)
    .replace(/\s+/g, " ")
    .replace(/\s*[\(（]\s*\d+\s*차년도\s*[\)）]\s*$/i, "")
    .replace(/\s*[\(（]\s*Year\s*\d+\s*[\)）]\s*$/i, "")
    .replace(/\s+\d+\s*차년도\s*$/i, "")
    .trim()
    .toLocaleLowerCase("ko-KR");
}

function uniqueRndProjectCount() {
  const keys = new Set();
  projects
    .filter(project => project.__type === "RND")
    .forEach(project => {
      const key = normalizeContinuousProjectTitle(project);
      if (key) keys.add(key);
    });
  return keys.size;
}

function renderHomePublicationChart() {
  const container = document.getElementById("homePublicationChart");
  if (!container) return;

  const paperRows = publications.filter(pub => pub.__type === "SCI" || pub.__type === "KCI");
  const counts = new Map();

  paperRows.forEach(pub => {
    const year = publicationYearForOverview(pub);
    if (!year) return;
    if (!counts.has(year)) counts.set(year, { SCI: 0, KCI: 0 });
    counts.get(year)[pub.__type] += 1;
  });

  const years = [...counts.keys()].sort((a, b) => a - b);
  if (!years.length) {
    container.innerHTML = "";
    return;
  }

  const totals = years.map(year => counts.get(year).SCI + counts.get(year).KCI);
  const maxValue = Math.max(1, ...totals, ...years.map(year => counts.get(year).SCI), ...years.map(year => counts.get(year).KCI));
  const width = Math.max(430, years.length * 58 + 46);
  const height = 142;
  const left = 24;
  const right = 14;
  const top = 16;
  const bottom = 28;
  const plotHeight = height - top - bottom;
  const plotWidth = width - left - right;
  const step = plotWidth / years.length;
  const y = value => top + plotHeight - (value / maxValue) * plotHeight;

  const grid = [0.5, 1].map(ratio => {
    const gy = top + plotHeight * (1 - ratio);
    return `<line x1="${left}" y1="${gy.toFixed(1)}" x2="${width-right}" y2="${gy.toFixed(1)}" class="overview-grid-line"/>`;
  }).join("");

  let bars = "";
  const points = [];

  years.forEach((year, i) => {
    const data = counts.get(year);
    const cx = left + step * (i + 0.5);
    const stackedBarWidth = Math.min(22, step * 0.42);
    const barX = cx - stackedBarWidth / 2;
    const baseY = top + plotHeight;
    const total = data.SCI + data.KCI;
    const totalY = y(total);
    const kciHeight = (data.KCI / maxValue) * plotHeight;
    const sciHeight = (data.SCI / maxValue) * plotHeight;
    const kciY = baseY - kciHeight;
    const sciY = kciY - sciHeight;

    bars += `
      <rect x="${barX.toFixed(1)}" y="${kciY.toFixed(1)}" width="${stackedBarWidth.toFixed(1)}" height="${Math.max(0, kciHeight).toFixed(1)}" class="overview-bar overview-bar-kci"><title>${year} KCI: ${data.KCI}</title></rect>
      <rect x="${barX.toFixed(1)}" y="${sciY.toFixed(1)}" width="${stackedBarWidth.toFixed(1)}" height="${Math.max(0, sciHeight).toFixed(1)}" class="overview-bar overview-bar-sci"><title>${year} SCI: ${data.SCI}</title></rect>
      <text x="${cx.toFixed(1)}" y="${height-8}" text-anchor="middle" class="overview-year-label">${year}</text>`;
    points.push({ x: cx, y: totalY, total, year });
  });

  const linePoints = points.map(point => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const line = `<polyline points="${linePoints}" class="overview-total-line"/>`;
  const dots = points.map(point => `
    <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3" class="overview-total-dot"><title>${point.year} Total: ${point.total}</title></circle>
    <text x="${point.x.toFixed(1)}" y="${Math.max(10, point.y-7).toFixed(1)}" text-anchor="middle" class="overview-total-label">${point.total}</text>`).join("");

  container.innerHTML = `
    <svg class="overview-chart-svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="Annual SCI and KCI publication counts with total papers line">
      ${grid}
      ${bars}
      ${line}
      ${dots}
    </svg>`;
}

function renderHomeOverview() {
  if (typeof publications !== "undefined") {
    const sci = publications.filter(pub => pub.__type === "SCI").length;
    const kci = publications.filter(pub => pub.__type === "KCI").length;
    setHomeCount("homePubTotal", sci + kci);
    setHomeCount("homePubSci", sci);
    setHomeCount("homePubKci", kci);
    renderHomePublicationChart();
  }

  if (typeof projects !== "undefined") {
    const rnd = uniqueRndProjectCount();
    const service = projects.filter(project => project.__type === "SERVICE").length;
    setHomeCount("homeProjectRnd", rnd);
    setHomeCount("homeProjectService", service);
    setHomeCount("homeProjectTotal", rnd + service);
  }
}

/* =========================================================
   PUBLICATIONS
========================================================= */
let publications = [];
let currentPublicationFilter = "ALL";
let publicationsExpanded = false;

function publicationTitle(pub) {
  return pickLang(
    pub,
    ["제목", "논문명", "논문제목", "저서명", "도서명", "책제목", "Title"],
    ["영문제목", "제목_영문", "제목(영문)", "논문명_영문", "논문제목_영문", "저서명_영문", "도서명_영문", "English Title", "Title"]
  );
}
function publicationAuthors(pub) {
  return pickLang(
    pub,
    ["저자", "저자명", "집필자", "Authors", "Author"],
    ["저자_영문", "저자명_영문", "집필자_영문", "Authors", "Author", "Authors (EN)", "English Authors"]
  );
}
function publicationSource(pub) {
  if (pub.__type === "BOOK") {
    const publisher = pickLang(
      pub,
      ["출판사", "발행기관명", "발행처", "출판기관"],
      ["출판사_영문", "발행기관명_영문", "발행처_영문", "출판기관_영문", "Publisher", "Publisher (EN)"]
    );

    return [
      publisher,
      pick(pub, ["ISBN", "isbn"])
    ].filter(Boolean).join(" · ");
  }

  const journal = pickLang(
    pub,
    ["학술지명", "저널명", "Journal"],
    ["학술지명_영문", "저널명_영문", "Journal", "Journal (EN)", "English Journal"]
  );

  return [
    journal,
    pick(pub, ["권호명", "권호", "Volume"]),
    pick(pub, ["페이지", "Pages"])
  ].filter(Boolean).join(" · ");
}
function publicationIndexing(pub) {
  if (pub.__type === "BOOK") return "";
  return pick(pub, ["학술지 등급", "학술지등급", "등급", "색인", "Indexing"]) || pub.__type;
}

function publicationRole(pub) {
  return pick(pub, ["역할", "Role", "role", "참여역할", "저자역할", "집필역할", "구분"]);
}

function publicationAuthorCategory(pub) {
  return pick(pub, ["구분", "저자구분", "저자 구분", "Author Type", "Author Role", "저자역할"]);
}

function publicationAuthorRoles(pub) {
  if (pub.__type === "BOOK") return [];

  const raw = normalizeText(publicationAuthorCategory(pub));
  const value = raw.replace(/\s+/g, "").toLowerCase();
  const roles = [];

  const isCoFirst =
    value.includes("1저자(공동)") ||
    value.includes("공동1저자") ||
    value.includes("공동제1저자") ||
    value.includes("co-firstauthor") ||
    value.includes("cofirstauthor") ||
    (value.includes("1저자") && value.includes("공동"));

  const isFirst =
    !isCoFirst && (
      value.includes("제1저자") ||
      value.includes("1저자") ||
      value.includes("firstauthor")
    );

  const isCorresponding =
    value.includes("교신저자") ||
    value.includes("correspondingauthor") ||
    value.includes("corresponding");

  if (isFirst) roles.push("firstauthor");
  if (isCoFirst) roles.push("cofirst");
  if (isCorresponding) roles.push("corresponding");

  return roles;
}

function authorRoleBadges(pub) {
  return publicationAuthorRoles(pub)
    .map(role => `<span class="author-role-note author-role-${role}">${escapeHtml(t(role))}</span>`)
    .join(" ");
}

function highlightedAuthors(pub) {
  const authors = publicationAuthors(pub);
  if (!authors) return "";

  let safe = escapeHtml(authors);
  const badges = authorRoleBadges(pub);

  if (pub.__type === "SCI") {
    safe = safe.replace(/Yoo,\s*Y\.?/i, match => `<strong class="author-highlight">${match}</strong>`);
  } else if (pub.__type === "KCI") {
    if (/유영재/.test(safe)) {
      safe = safe.replace(/유영재/, '<strong class="author-highlight">유영재</strong>');
    } else {
      safe = safe.replace(/Yoo,\s*Y\.?/i, match => `<strong class="author-highlight">${match}</strong>`);
    }
  }

  return `${badges ? `${badges} ` : ""}${safe}`;
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
  const toggle = document.getElementById("publicationToggle");
  const filtered = publications.filter(pub => filter === "ALL" || pub.__type === filter);

  if (!filtered.length) {
    list.innerHTML = `<div class="publication-empty">${escapeHtml(t("empty.publications"))}</div>`;
    toggle.hidden = true;
    return;
  }

  const visible = publicationsExpanded ? filtered : filtered.slice(0, 5);

  list.innerHTML = visible.map(pub => {
    const authorsHtml = highlightedAuthors(pub);
    const role = publicationRole(pub);
    const indexing = publicationIndexing(pub);
    const doi = normalizeDoi(pick(pub, ["DOI", "doi"]));
    const isbn = pick(pub, ["ISBN", "isbn"]);
    const isArticle = pub.__type === "SCI" || pub.__type === "KCI";
    const classLabel = pub.__type === "BOOK" ? "BOOK" : pub.__type;
    const className = pub.__type === "SCI"
      ? "pub-class-sci"
      : pub.__type === "KCI"
        ? "pub-class-kci"
        : "pub-class-book";

    return `
      <article class="publication-item-sheet ${pub.__type === "BOOK" ? "publication-book" : ""}">
        <span class="pub-year">${escapeHtml(displayYear(pub))}</span>
        <div class="pub-main">
          <h4>${escapeHtml(publicationTitle(pub))}</h4>
          ${authorsHtml ? `<p class="pub-authors-sheet">${authorsHtml}</p>` : ""}
          ${pub.__type === "BOOK" && role ? `<p class="pub-book-role"><span>ROLE</span><strong>${escapeHtml(role)}</strong></p>` : ""}
          ${publicationSource(pub) ? `<p class="pub-journal-sheet">${escapeHtml(publicationSource(pub))}</p>` : ""}
        </div>
        <div class="pub-side">
          <span class="pub-class-badge ${className}">${classLabel}</span>
          ${isArticle && indexing ? `<span class="pub-indexing">${escapeHtml(indexing)}</span>` : ""}
          ${doi ? `<a class="pub-doi" href="${escapeHtml(doi)}" target="_blank" rel="noopener noreferrer">DOI ↗</a>` : ""}
          ${!doi && isbn ? `<span class="pub-isbn">ISBN</span>` : ""}
        </div>
      </article>`;
  }).join("");

  if (filtered.length > 5) {
    toggle.hidden = false;
    toggle.textContent = publicationsExpanded ? t("collapse") : t("more.publications");
  } else {
    toggle.hidden = true;
  }
}

async function loadPublications() {
  const status = document.getElementById("publicationStatus");
  const { rows, failed } = await settleSheets([SHEETS.SCI, SHEETS.KCI, SHEETS.BOOK]);
  publications = rows.filter(publicationTitle).sort((a,b) => parseFlexibleDate(b)-parseFlexibleDate(a));
  updatePublicationCounts();
  renderPublications("ALL");
  renderHomeOverview();
  status.textContent = failed.length ? `${t("load.partial")}: ${failed.join(" | ")}` : "";
}
document.querySelectorAll(".pub-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".pub-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    publicationsExpanded = false;
    renderPublications(button.dataset.filter);
  });
});


document.getElementById("publicationToggle").addEventListener("click", () => {
  publicationsExpanded = !publicationsExpanded;
  renderPublications(currentPublicationFilter);
  if (!publicationsExpanded) {
    document.getElementById("publications").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* =========================================================
   PROJECTS
========================================================= */
let projects = [];
let currentProjectTypeFilter = "ALL";
let currentProjectRoleFilter = "ALL";
let projectsExpanded = false;

function projectTitle(row) {
  return pickLang(
    row,
    ["과제명", "연구과제명", "사업명", "용역명", "프로젝트명", "과업명", "연구명", "제목", "Project"],
    [
      "연구명_영문",
      "과제명_영문",
      "연구과제명_영문",
      "사업명_영문",
      "용역명_영문",
      "프로젝트명_영문",
      "과업명_영문",
      "제목_영문",
      "영문과제명",
      "영문연구명",
      "영문명",
      "Project Title",
      "Title (EN)",
      "English Title"
    ]
  );
}

function projectOrganization(row) {
  return pickLang(
    row,
    ["발주기관", "발주처", "지원기관", "주관기관", "연구기관", "수행기관", "기관명", "부처", "Funding Agency"],
    [
      "지원기관_영문",
      "발주기관_영문",
      "발주처_영문",
      "주관기관_영문",
      "연구기관_영문",
      "수행기관_영문",
      "기관명_영문",
      "부처_영문",
      "Funding Agency",
      "Organization"
    ]
  );
}

function projectRole(row) {
  return pick(row, ["역할", "참여구분", "연구역할", "책임구분", "직책", "구분", "참여형태"]);
}

function projectRoleCategory(row) {
  const role = normalizeText(projectRole(row)).replace(/\s+/g, "");

  if (
    role.includes("책임연구원") ||
    role.includes("연구책임자") ||
    role.includes("과제책임자") ||
    role.includes("책임자")
  ) {
    return "PI";
  }

  // 사용자가 지정한 규칙: 연구원, 연구보조원은 모두 참여연구원으로 분류
  if (
    role.includes("참여연구원") ||
    role.includes("연구보조원") ||
    role === "연구원" ||
    role.includes("참여")
  ) {
    return "PARTICIPANT";
  }

  return "";
}

function projectRoleDisplay(row) {
  const raw = normalizeText(projectRole(row));
  if (currentLang === "ko") {
    return raw || (projectRoleCategory(row) === "PI" ? t("role.pi") : projectRoleCategory(row) === "PARTICIPANT" ? t("role.participant") : "");
  }

  const compact = raw.replace(/\s+/g, "");
  if (compact.includes("책임연구원") || compact.includes("연구책임자") || compact.includes("과제책임자") || compact.includes("책임자")) return t("role.pi");
  if (compact.includes("연구보조원")) return t("role.assistant");
  if (compact === "연구원") return t("role.researcher");
  if (compact.includes("참여연구원") || compact.includes("참여")) return t("role.participant");
  return raw;
}

function projectRoleBadgeClass(row) {
  return projectRoleCategory(row) === "PI" ? "project-role-pi" : "project-role-participant";
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
  return years?.length ? years[years.length - 1] : displayYear(row);
}

function projectRound(row) {
  const raw = pick(row, [
    "차년도", "연차", "차수", "연구차년도", "과제차년도",
    "사업차년도", "연구연차", "과제연차", "Year No.", "Year"
  ]);

  if (!raw) return "";

  const clean = normalizeText(raw);

  if (/차년도/.test(clean)) {
    const number = clean.match(/\d+/);
    return currentLang === "en" && number ? `Year ${number[0]}` : clean;
  }

  const number = clean.match(/\d+/);
  if (number) return currentLang === "en" ? `Year ${number[0]}` : `${number[0]}차년도`;

  if (/차$/.test(clean)) {
    return currentLang === "en" ? clean.replace(/차$/, "") : clean.replace(/차$/, "차년도");
  }

  return clean;
}

function projectDisplayTitle(project) {
  const title = projectTitle(project);
  if (project.__type !== "RND") return title;

  const round = projectRound(project);
  return round ? `${title} (${round})` : title;
}

function updateProjectCounts() {
  document.getElementById("countProjectAll").textContent = projects.length;
  document.getElementById("countRnd").textContent = projects.filter(p => p.__type === "RND").length;
  document.getElementById("countService").textContent = projects.filter(p => p.__type === "SERVICE").length;
  document.getElementById("countPi").textContent = projects.filter(p => projectRoleCategory(p) === "PI").length;
  document.getElementById("countParticipant").textContent = projects.filter(p => projectRoleCategory(p) === "PARTICIPANT").length;
}

function renderProjects() {
  const list = document.getElementById("projectList");
  const toggle = document.getElementById("projectToggle");

  const filtered = projects.filter(project => {
    const typeOk = currentProjectTypeFilter === "ALL" || project.__type === currentProjectTypeFilter;
    const roleOk = currentProjectRoleFilter === "ALL" || projectRoleCategory(project) === currentProjectRoleFilter;
    return typeOk && roleOk;
  });

  if (!filtered.length) {
    list.innerHTML = `<div class="sheet-empty">${escapeHtml(t("empty.projects"))}</div>`;
    toggle.hidden = true;
    return;
  }

  const visible = projectsExpanded ? filtered : filtered.slice(0, 5);

  list.innerHTML = visible.map(project => {
    const organization = projectOrganization(project);
    const typeLabel = project.__type === "RND" ? "R&D" : t("service.label");
    const typeClass = project.__type === "RND" ? "project-type-rnd" : "project-type-service";
    const roleLabel = projectRoleDisplay(project);
    const roleClass = projectRoleBadgeClass(project);

    return `
      <article class="project-item">
        <div class="project-year">${escapeHtml(projectYear(project))}</div>

        <div class="project-main">
          <h3>${escapeHtml(projectDisplayTitle(project))}</h3>

          ${(organization || roleLabel) ? `
            <div class="project-meta-line">
              ${organization ? `<span class="project-organization">${escapeHtml(organization)}</span>` : ""}
              ${roleLabel ? `<span class="project-role-inline ${roleClass}">${escapeHtml(roleLabel)}</span>` : ""}
            </div>
          ` : ""}
        </div>

        <div class="project-type-badge ${typeClass}">${typeLabel}</div>
      </article>`;
  }).join("");

  if (filtered.length > 5) {
    toggle.hidden = false;
    toggle.textContent = projectsExpanded ? t("collapse") : t("more.projects");
  } else {
    toggle.hidden = true;
  }
}

async function loadProjects() {
  const status = document.getElementById("projectStatus");
  const { rows, failed } = await settleSheets([SHEETS.RND, SHEETS.SERVICE]);

  projects = rows
    .filter(projectTitle)
    .sort((a, b) => parseFlexibleDate(b) - parseFlexibleDate(a));

  updateProjectCounts();
  renderProjects();
  renderHomeOverview();

  status.textContent = failed.length ? `${t("load.partial")}: ${failed.join(" | ")}` : "";
}

document.querySelectorAll(".project-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".project-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentProjectTypeFilter = button.dataset.filter;
    projectsExpanded = false;
    renderProjects();
  });
});

document.querySelectorAll(".project-role-filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".project-role-filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentProjectRoleFilter = button.dataset.roleFilter;
    projectsExpanded = false;
    renderProjects();
  });
});


document.getElementById("projectToggle").addEventListener("click", () => {
  projectsExpanded = !projectsExpanded;
  renderProjects();
  if (!projectsExpanded) {
    document.getElementById("projects").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

/* =========================================================
   AWARDS
========================================================= */
function awardContest(row) {
  return pickLang(
    row,
    ["명칭", "대회명", "Award", "Title"],
    ["명칭_영문", "대회명_영문", "영문명칭", "영문대회명", "Award", "Title", "English Title"]
  );
}

function awardResult(row) {
  return pickLang(
    row,
    ["결과", "수상명", "상훈", "Award Result"],
    ["결과_영문", "수상명_영문", "상훈_영문", "Award Result", "Result (EN)"]
  );
}

function awardParticipants(row) {
  return pick(row, ["참가자", "참가자명", "Participants"]);
}

function awardOrganizer(row) {
  return pickLang(
    row,
    ["주최자", "주최기관", "Organizer"],
    ["주최자_영문", "주최기관_영문", "Organizer", "Organizer (EN)"]
  );
}

function awardDateRaw(row) {
  return pick(row, ["수상일", "수상일자", "Date", "날짜", "일자"]);
}

function awardYear(row) {
  const raw = awardDateRaw(row);
  const match = raw.match(/\d{4}/);
  if (match) return match[0];

  const fallback = pick(row, ["수상연도", "연도", "년도"]);
  const fallbackMatch = fallback.match(/\d{4}/);
  return fallbackMatch ? fallbackMatch[0] : fallback;
}

let awardsCache = [];

function renderAwardsFromCache() {
  const list = document.getElementById("awardList");
  if (!awardsCache.length) {
    list.innerHTML = `<div class="sheet-empty">${escapeHtml(t("empty.awards"))}</div>`;
    return;
  }

  list.innerHTML = awardsCache.map(award => {
    const contest = awardContest(award);
    const result = awardResult(award);
    const organizer = awardOrganizer(award);

    return `
      <article class="award-item award-item-plain">
        <div class="award-date">${escapeHtml(awardYear(award))}</div>

        <div class="award-main">
          <h4>${escapeHtml(contest || "")}</h4>
          ${organizer ? `<p><span class="award-meta-label">${escapeHtml(t("award.organizer"))}</span>${escapeHtml(organizer)}</p>` : ""}
        </div>

        <div class="award-result-text">${escapeHtml(result || "")}</div>
      </article>`;
  }).join("");
}

async function loadAwards() {
  const status = document.getElementById("awardStatus");

  try {
    awardsCache = (await loadGoogleSheet(SHEETS.AWARD))
      .filter(row => awardContest(row) || awardResult(row))
      .sort((a, b) => parseFlexibleDate(b) - parseFlexibleDate(a));

    status.textContent = "";
    renderAwardsFromCache();
  } catch (error) {
    console.error("Award load error:", error);
    status.textContent = currentLang === "en"
      ? `Awards could not be loaded: ${error.message}`
      : `수상 데이터를 불러오지 못했습니다: ${error.message}`;
  }
}

async function initializeGoogleSheetsData() {
  await loadPersonalData();
  await Promise.all([
    loadPublications(),
    loadProjects(),
    loadAwards()
  ]);
}

initializeGoogleSheetsData();
