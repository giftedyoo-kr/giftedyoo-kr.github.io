# Youngjae Yoo — Academic Research Website

Youngjae Yoo의 연구 경력, 연구 관심 분야, 논문, 연구과제, 수상 내역 및 연락처를 소개하는 개인 연구자 웹사이트입니다. 정적 HTML/CSS/JavaScript로 구성되어 GitHub Pages에서 바로 배포할 수 있으며, 주요 연구 실적 데이터는 Google Sheets에서 불러옵니다.

## 주요 기능

- **반응형 단일 페이지 구성**: 데스크톱, 태블릿, 모바일 화면 폭에 맞춰 레이아웃과 그래프가 자동 조정됩니다.
- **Kor / Eng 언어 전환**: 한국어와 영어 화면을 전환할 수 있으며 선택한 언어는 브라우저에 저장됩니다.
- **언어별 명함 이미지**: `Kor`에서는 `namecard_kor.png`, `Eng`에서는 `namecard_eng.png`를 표시합니다.
- **홈 대시보드**: SCI/KCI 논문 수, 연도별 논문 추이, R&D 및 Research Contract 과제 수를 요약해서 보여줍니다.
- **Publications**: SCI/KCI/BOOK 필터, 최신 항목 우선 표시, 더보기/접기, DOI 링크, 저자 강조 및 `1저자 / 공동1저자 / 교신저자` 역할 표시를 지원합니다.
- **Projects**: R&D와 Research Contract를 통합 표시하며 유형 및 역할 필터를 제공합니다. 홈 화면의 연속 R&D 과제는 연구명 기준으로 하나의 과제로 집계합니다.
- **Awards**: Google Sheets의 수상 데이터를 불러와 연도, 수상명, 결과 및 주최기관을 표시합니다.
- **Profile / Research / Contact**: 경력, 학력, 연구 분야·방법·관심 주제와 ResearchGate, Google Scholar 등의 외부 링크를 제공합니다.

## 데이터 연동

`script.js`에서 Google Visualization JSONP 방식으로 Google Sheets의 각 탭을 읽습니다.

| 구분 | 시트 탭 |
| --- | --- |
| 국제학술논문 | SCI |
| 국내학술논문 | KCI |
| 연구개발과제 | R&D |
| 연구용역 | 용역 |
| 수상 | 수상 |
| 저서 | 저서 |

한국어/영어 병기가 필요한 데이터는 시트의 영문 컬럼을 우선적으로 사용합니다. 예를 들어 논문은 `제목_영문`, `저자_영문`, `학술지명_영문`, 연구과제는 `연구명_영문`, `지원기관_영문` 등의 컬럼을 사용할 수 있습니다.

## 파일 구조

```text
giftedyoo-kr.github.io-main/
├─ index.html      # 페이지 구조 및 정적 콘텐츠
├─ style.css       # 전체 디자인 및 반응형 스타일
├─ script.js       # 언어 전환, Sheets 연동, 동적 목록·그래프 렌더링
├─ README.md       # 프로젝트 설명
└─ images/
   ├─ profile.png
   ├─ current_position_logo.png
   ├─ namecard_kor.png
   ├─ namecard_eng.png
   └─ README.txt
```

## 이미지 파일

`images` 폴더에는 다음 파일을 사용합니다.

- `profile.png`: PROFILE의 프로필 이미지
- `current_position_logo.png`: 현재 소속기관 로고
- `namecard_kor.png`: 한국어 CONTACT 명함
- `namecard_eng.png`: 영어 CONTACT 명함

이미지 파일이 없는 경우 해당 이미지 영역은 자동으로 숨겨집니다.

## 배포

저장소 루트에 파일을 배치한 뒤 GitHub Pages의 배포 소스를 해당 브랜치의 루트로 설정하면 사용할 수 있습니다. 별도의 빌드 과정이나 서버 측 코드가 필요하지 않습니다.
