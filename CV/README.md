# Youngjae Yoo — Academic Research Website

개인 연구자 홈페이지 소스입니다.  
프로필·경력·학력·연락처는 `personal_data.txt`, 연구실적·과제·수상 내역은 Google Sheets와 연동해 관리합니다.

## 주요 기능

- Kor / Eng 언어 전환
- PROFILE, RESEARCH, PUBLICATIONS, PROJECTS, AWARDS, CONTACT 구성
- `personal_data.txt` 기반 연락처·경력·학력 반복 블록
- Google Sheets 기반 논문·과제·수상 데이터 연동
- PUBLICATIONS 유형 필터: ALL / SCI / KCI / BOOK
- PROJECTS 유형·역할 필터
- HOME 요약 카드 및 연도별 SCI/KCI 논문 그래프
- PC / 모바일 반응형 레이아웃

## 파일 구조

```text
giftedyoo-kr.github.io-main/
├─ index.html          # 페이지 구조와 정적 fallback 내용
├─ style.css           # 폰트, 글자 크기, 레이아웃, 반응형 스타일
├─ script.js           # 언어 전환 및 데이터 연동
├─ personal_data.txt   # 개인 정보·경력·학력·연락처 설정
├─ README.md           # 프로젝트 설명
└─ images/
   ├─ profile.png
   ├─ current_position_logo.png
   ├─ namecard_kor.png
   └─ namecard_eng.png
```

## `personal_data.txt`

`personal_data.txt`는 INI와 유사한 블록 구조를 사용합니다.  
같은 블록을 반복하면 작성 순서대로 홈페이지에 표시됩니다.

### PROFILE / CURRENT POSITION

```text
[profile]
profile_image=images/profile.png
researchgate_url=...
researchgate_label=ResearchGate
google_scholar_url=...
google_scholar_label=Google Scholar

[current_position]
company_url=...
company_name_ko=...
company_name_en=...
department_name_ko=...
department_name_en=...
position_ko=...
position_en=...
logo_image=images/current_position_logo.png
```

### PROFESSIONAL EXPERIENCE

`[professional_experience]` 블록을 반복해 경력을 추가합니다.

```text
[professional_experience]
period=2026.08.–현재
institution_ko=한국기후변화연구원
institution_en=Korea Research Institute on Climate Change (KRIC)
position=SENIOR RESEARCHER
```

필요하면 `period_k/e`, `institution_k/e`, `position_k/e` 형식도 사용할 수 있습니다.

### EDUCATION

`[education]` 블록을 반복해 학력을 추가합니다.

```text
[education]
period=2019.09.–2023.02.
degree=Ph.D.
degree_detail_ko=...
degree_detail_en=...
school_department_ko=...
school_department_en=...
```

### CONTACT

`[contact]` 블록을 반복하면 작성 순서대로 표시됩니다.

```text
[contact]
title_k=연락처(사무실)
title_e=OFFICE PHONE
value_k=033-259-0127
value_e=+82-33-259-0127
url=tel:0332590127
```

- `title_k`, `value_k`: Kor에서 사용
- `title_e`, `value_e`: Eng에서 사용
- `url`: Kor / Eng 공통 링크
- `url_e`: Eng 전용 링크가 필요할 때 사용
- `url`이 없으면 일반 텍스트로 표시
- 허용 링크: `http`, `https`, `mailto`, `tel`

## CSS 관리

`style.css` 상단은 아래 순서로 구성되어 있습니다.

1. **폰트 설정**
2. **폰트 크기 설정**
3. **나머지 스타일**

전체 기본 폰트는 `--font-main`에서 변경합니다.

```css
--font-main: "Noto Sans KR", sans-serif;
```

자주 조정하는 글씨 크기는 상단 변수로 관리합니다.

```css
--fs-section-title: clamp(18px, 1.55vw, 24px);
--fs-section-title-mobile: 18px;
--fs-subsection-title: 12px;
--fs-profile-institution: 15px;
--fs-contact-title: 9px;
--fs-contact-value: 16px;
```

`--fs-profile-institution`은 **PROFESSIONAL EXPERIENCE의 Kor/Eng 기관명과 EDUCATION의 학교·학과명에 함께 적용**됩니다..  
EDUCATION의 학교·학과명에는 적용되지 않습니다.

CSS의 각 선택자 블록에는 어떤 영역을 조정하는 코드인지 확인할 수 있도록 주석을 추가했습니다.

## Google Sheets 연동

`personal_data.txt`의 `[google_sheets]` 블록에서 스프레드시트 ID와 각 탭 GID를 관리합니다.

```text
[google_sheets]
spreadsheet_id=...
publication_sci_gid=...
publication_kci_gid=...
publication_book_gid=...
project_rnd_gid=...
project_service_gid=...
award_gid=...
```

### SCI / KCI 권장 열제목

```text
제목
제목_영문
저자
저자_영문
학술지명
학술지명_영문
게재연도
권호명
페이지
학술지 등급
DOI
구분
```

### BOOK 권장 열제목

```text
저서명
저서명_영문
집필자
집필자_영문
출판사
출판사_영문
발행연도
ISBN
역할
```

### R&D 권장 열제목

```text
연구명
연구명_영문
지원기관
지원기관_영문
역할
연구기간
차년도
```

### Research Contract 권장 열제목

```text
연구명
연구명_영문
지원기관
지원기관_영문
역할
연구기간
```

### AWARDS 권장 열제목

```text
수상일
명칭
명칭_영문
결과
결과_영문
주최자
주최자_영문
```

`script.js`에는 일부 대체 열제목을 인식하는 alias도 포함되어 있습니다.

## 이미지 파일

- `images/profile.png`: PROFILE 사진
- `images/current_position_logo.png`: 현재 소속기관 로고
- `images/namecard_kor.png`: Kor CONTACT 이미지
- `images/namecard_eng.png`: Eng CONTACT 이미지

파일명이나 경로를 바꾸면 `index.html` 또는 `personal_data.txt`의 대응 경로도 함께 수정해야 합니다.

## 로컬 확인

`personal_data.txt`는 `fetch()`로 읽기 때문에 `index.html`을 `file://` 방식으로 직접 열면 브라우저 보안 정책상 반영되지 않을 수 있습니다.

홈페이지 폴더에서 다음 명령을 실행합니다.

```bash
python -m http.server 8000
```

Windows에서 `python` 명령이 동작하지 않으면:

```bash
py -m http.server 8000
```

그다음 브라우저에서 `http://localhost:8000`으로 접속합니다.
