# giftedyoo-kr.github.io — cumulative update v2

기준 버전: 직전 제공본 `giftedyoo-kr.github.io-main_updated.zip`

## 이번 변경사항
- 첫 화면 `REPUBLIC OF KOREA` 제거
- 첫 화면 한국어 소개문에서 `지역의` 삭제
- Contact의 전화번호를 KO `회사 연락처`, EN `OFFICE PHONE`으로 명시
- Research Profile 제목을 `Environmental Planning and Policy & Climate Change`로 변경
- Research Profile 한글/영문 소개 문구 동시 수정
- FIELD / METHOD / FOCUS 재구성
  - METHOD: Spatial Analysis (GIS · Remote Sensing) → Species Distribution Modeling → Programming (R · Python)
- Research Interests 소개 및 4개 카드 설명을 Publications/Projects 연구 내용에 맞춰 한글/영문 동시 보완
- 04 카드: `Spatial Analysis & Modeling`, 태그 `GIS / Satellite / Modeling`
- Research Interest 카드 번호와 pill 글자 크기 확대

## V3 responsive fix
- 좁은 화면에서 첫 화면의 Publications / Projects 현황이 PROFILE을 가리는 문제 수정
- 980px 이하에서 hero 고정 높이를 해제하고 콘텐츠 높이에 맞춰 자동 확장
- 700px 이하에서는 현황 카드를 한 열로 배치

## V4 refinements
- Hero의 SCROLL 표시 완전 제거
- 전체 한글 텍스트를 어절 단위 줄바꿈(`word-break: keep-all`)으로 조정
- Research Interests 제목 및 카드 제목 크기 축소
- Research Interests 카드 상하 패딩, 최소 높이, 내부 간격 축소
- Contact 전화 라벨을 KO/EN 모두 `OFFICE PHONE`으로 통일
- Footer 문구를 hero 상단 문구와 동일하게 변경
- `© 2026 Youngjae Yoo.` 글씨 굵기 강화

## V5 research restructuring
- RESEARCH PROFILE 라벨 및 상단 한글 소개문구 제거
- `Environmental Planning and Policy & Climate Change`를 상단 한 줄형 제목으로 재배치
- FIELD / METHOD / FOCUS를 제목 바로 아래 배치
- Research Interests 소개문구 변경 (KO/EN 동시 반영)
- 02 제목을 `Climate Disaster & Risk`로 변경
- 02 설명을 자연환경·인간·기반시설을 포괄하는 기후재난·재해 위험 설명으로 변경 (KO/EN)
- Footer의 `© 2026 Youngjae Yoo.`를 흰색으로 변경

## V6 title scale alignment
- 03 PUBLICATIONS의 `Publications`
- 04 PROJECTS의 `Research & Projects`
- 05 AWARDS의 `Recognition & Awards`
위 세 대표 제목의 글자 크기를 02 RESEARCH의
`Environmental Planning and Policy & Climate Change`와 동일한 반응형 크기로 통일

## V7 layout refinements
- FIELD / METHOD / FOCUS 라벨을 검은색·굵게 변경
- 해당 내용은 기존 라벨 색상(회색)으로 변경
- Research facts를 약간 오른쪽으로 들여쓰고 라벨 열 폭 축소
- Research Interests 소개문구가 넓은 화면에서 한 줄로 유지되도록 폭 조정
- Research Interests 4개 카드의 최소 높이와 상하 여백 추가 축소
- `Recognition & Awards`를 넓은 화면에서 한 줄로 표시

## V8 refinements
- FIELD / METHOD / FOCUS 블록을 데스크톱에서 더 오른쪽으로 이동
- PROFESSIONAL EXPERIENCE 영문 기관명에 약어 추가
  - Korea Research Institute on Climate Change (KRIC)
  - OJEong Resilience Institute (OJERI), Korea University
- Research Interests 설명문을 제목 하단 기준으로 정렬
- Research Interests 카드 제목의 강제 `<br>` 줄바꿈 제거
- 카드 제목은 공간이 충분하면 한 줄, 좁으면 자연스럽게 자동 줄바꿈

## V9 research divider refinements
- 제목과 FIELD 사이 가로선을 FIELD–METHOD / METHOD–FOCUS 사이 선과 같은 길이로 조정
- FOCUS 아래 가로선 제거
- FOCUS와 Research Interests 사이의 긴 가로선 제거
- Research Interests 설명문을 제목 오른쪽에서 제목 아래쪽으로 이동

## V10 correction
- FOCUS 바로 아래의 짧은 가로선을 복원
- Research Interests 위의 별도 긴 가로선은 계속 제거

## V11 language switch
- 상단 `KO / EN`을 `Kor / Eng`로 변경
- 슬래시(`/`) 제거
- 두 언어 선택을 작은 pill/button 형태로 변경
- 글자 크기와 버튼 클릭 영역 확대
- 선택된 언어는 테두리가 더 강조되도록 표시

## V12 language switch position
- `Kor / Eng` 버튼을 상단바 내부에서 약 5px 위로 이동
- 모바일에서는 약 3px 위로 이동
- 첫 화면 Publications 그래프 영역과의 시각적 겹침 완화

## V13 publications contrast
- PUBLICATIONS의 연도 색상을 기존보다 밝게 조정
- 공동1저자 / Co-first author 알약을 흰색 배경 + 검은 글씨로 변경

## V14 co-first author emphasis
- 공동1저자 / Co-first author 알약 내부 글씨를 더 굵게 표시

## V15 hero English wrapping
- 영문 hero 설명의 강제 `<br>` 줄바꿈 제거
- 문장이 화면 폭에 따라 자연스럽게 줄바꿈되도록 변경

## V16 hero English line break
- 영문 hero 설명은 문장 1과 문장 2 사이에서만 의도적으로 줄바꿈
- 설명 영역 최대 폭을 넓혀 데스크톱에서 문장 내부의 불필요한 자동 줄바꿈 완화
- 좁은 화면에서는 반응형으로 자연스럽게 줄바꿈 유지

## V17 responsive chart + co-first author readability
- 첫 화면 Publications 그래프가 카드 폭에 맞춰 자동 축소되도록 조정
- 좁은 화면에서 그래프 오른쪽 잘림을 유발할 수 있는 여백/최소폭 제한 완화
- 공동1저자 / Co-first author 알약 글자 크기를 10px로 소폭 확대

## V18 publication author roles
- 저자 역할 알약을 유영재 / Yoo, Y. 이름 바로 앞에 표시
- `1저자`, `공동1저자`, `교신저자` 인식 지원
- 영문에서는 `First author`, `Co-first author`, `Corresponding author`로 표시
- 한 논문에서 역할이 복수로 기록된 경우 해당 역할을 함께 표시

## V19 author-role badges
- 1저자 / 공동1저자 / 교신저자 알약을 저자명 전체가 시작되는 줄의 맨 앞에 표시
- 유영재 / Yoo, Y. 이름 자체의 강조는 기존 방식 유지
- 역할 알약 색상을 흰색에서 밝은 앰버 계열로 변경하여 가독성과 주목도 향상

## V20 desktop hero clipping fix
- 데스크톱(981px 이상)에서 hero의 고정 `56vh` 높이 제한 제거
- 콘텐츠 높이에 따라 hero가 자연스럽게 늘어나도록 변경
- 최소 높이는 `max(580px, 62vh)`로 유지하여 지나치게 납작해지지 않도록 조정
- 그래프/Projects overview 카드의 아래쪽이 hero 경계에 잘리지 않도록 수정
