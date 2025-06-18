# 여기갈래

**여기갈래**는 데이트 장소 추천, 리뷰, 찜(즐겨찾기) 기능을 제공하는 웹 애플리케이션입니다.  
React(Vite) 기반의 프론트엔드와 Node.js(Express), MariaDB 기반의 백엔드로 구성되어 있습니다.

---

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [폴더 구조](#폴더-구조)
- [기술 스택](#기술-스택)
- [설치 및 실행 방법](#설치-및-실행-방법)
- [API 개요](#api-개요)
- [스크린샷](#스크린샷)

---

## 프로젝트 소개

데이트 장소를 찾고, 사용자 리뷰를 남기고, 마음에 드는 장소를 찜할 수 있는 서비스입니다.  
회원가입, 로그인, 마이페이지, 장소 검색/필터, 리뷰 작성/삭제, 찜 목록 관리 등 다양한 기능을 제공합니다.

---

## 주요 기능

- **회원 관리**: 회원가입, 로그인/로그아웃, 마이페이지(정보 수정, 회원탈퇴)
- **장소 추천**: 지역, 데이트 유형, 장소 카테고리별 필터링 및 검색
- **리뷰**: 장소별 리뷰 작성, 조회, 삭제
- **찜(즐겨찾기)**: 원하는 장소를 찜하고, 찜 목록에서 관리

---

## 폴더 구조

```
Date_App/
  ├── Back/      # 백엔드(Express, MariaDB)
  │   ├── app.js, server.js
  │   ├── models/    # DB 연동 모델
  │   ├── routes/    # API 라우터
  │   ├── config/    # DB 설정
  │   └── utils/     # 유효성 검사 등
  └── Front/     # 프론트엔드(React, Vite)
      ├── src/
      │   ├── components/  # UI 컴포넌트
      │   ├── pages/       # 주요 페이지
      │   └── assets/      # 폰트, 아이콘 등
      └── public/          # 이미지 등 정적 파일
```

---

## 기술 스택

- **Frontend**
  - React 19, Vite, React Router
  - CSS, Framer Motion
- **Backend**
  - Node.js, Express 5
  - MariaDB
  - bcrypt(비밀번호 암호화), express-session(세션 관리), cors
- **기타**
  - ESLint, Nodemon(개발용)

---

## 설치 및 실행 방법

### 1. 백엔드

```bash
cd Back
npm install
npm run dev   # nodemon으로 실행 (또는 npm start)
```

- MariaDB를 설치하고, DB 설정을 `Back/config/database.js`에 맞게 수정하세요.

### 2. 프론트엔드

```bash
cd Front
npm install
npm run dev
```

- 기본 개발 서버 주소: http://localhost:5173

---

## API 개요

### 회원 관련

- `POST /regist` : 회원가입 및 아이디 중복확인
- `POST /login` : 로그인
- `POST /logout` : 로그아웃
- `POST /user-info` : 회원정보 조회
- `POST /update-user` : 회원정보 수정
- `POST /delete-user` : 회원탈퇴
- `GET /session-check` : 세션 로그인 상태 확인

### 장소 관련

- `POST /` : 조건별 장소 리스트 조회
- `GET /all` : 전체 장소 조회
- `GET /search?keyword=키워드` : 장소 검색
- `GET /place-details/:id` : 장소 상세정보

### 리뷰 관련

- `POST /about` : 리뷰 작성
- `GET /reviews/:placeId` : 장소별 리뷰 조회
- `DELETE /reviews/:placeId/:userId/:reviewId` : 리뷰 삭제

### 찜(즐겨찾기) 관련

- `POST /dibs` : 찜 추가
- `POST /dibs-delete` : 찜 삭제
- `GET /dibs/:id` : 찜 여부 확인
- `GET /dibs-list` : 내 찜 목록 조회

---

## 스크린샷

> 실제 서비스 화면, ERD, 주요 기능별 이미지 등은 `README/images/` 폴더 참고

---

## 기타

- 프론트엔드와 백엔드는 CORS 및 세션을 통해 연동됩니다.
- 비밀번호는 bcrypt로 암호화되어 저장됩니다.
- DB 테이블 및 ERD는 `/README/images/DB ERD.png` 참고 
