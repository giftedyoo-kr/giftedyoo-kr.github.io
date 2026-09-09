# Multi-sheet Google Sheets 연동 홈페이지

Google Sheets의 여러 탭을 gid 기준으로 각각 불러오는 버전입니다.

## 연결된 탭
- SCI: 1044637119 → Publications
- KCI: 977487788 → Publications
- 저서: 1750437029 → Publications
- R&D: 445426444 → Projects
- 용역: 2133901227 → Projects
- 수상: 1362262409 → Awards

## 홈페이지
- Publications: ALL / SCI / KCI / BOOK
- Projects: ALL / R&D / 용역
- Awards: 별도 섹션

## 중요
각 탭이 Google Sheets의 `웹에 게시` 대상에 포함되어 있어야 합니다.
탭별 열 제목이 서로 달라도 흔한 열 이름을 여러 개 자동 인식하도록 작성되어 있습니다.

특정 데이터가 표시되지 않으면 해당 탭의 첫 행(열 제목)을 확인한 뒤
`script.js`의 후보 열 이름 목록에 추가하면 됩니다.
