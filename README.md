# Youngjae Personal Website

개인 연구자 홈페이지용 HTML/CSS/JS 템플릿입니다.

## 파일
- index.html
- style.css
- script.js
- images/

## 수정이 필요한 곳
1. `index.html`의 이름, 소속, 이메일 수정
2. Publications의 예시 논문을 실제 논문으로 교체
3. Career의 기관명·학력·경력 교체
4. ResearchGate / Google Scholar 링크 교체

## 메인 배경에 사진 넣기
`style.css`의 `.hero` 부분에 있는 주석 예시를 참고해 아래처럼 설정합니다.

background-image:
  linear-gradient(90deg, rgba(0,0,0,.55), rgba(0,0,0,.15)),
  url("images/hero.jpg");
background-size: cover;
background-position: center;

그리고 `images` 폴더에 `hero.jpg`를 넣으면 됩니다.

## GitHub Pages
1. GitHub에서 새 Repository 생성
2. 이 폴더 안의 파일 업로드
3. Settings → Pages
4. Deploy from a branch
5. main / root 선택
6. 저장 후 생성된 github.io 주소로 접속
