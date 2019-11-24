# [Trip Board](https://tripboard.yerinsite.com)

## Introduction

**Trip Board**는 사용자가 자신의 다녀온 여행을 기록 및 관리, 공유할 수 있는 웹 어플리케이션입니다.

<img height="500" alt="example" src="./preview.gif">



## Content

- [Installation](#Installation)
- [Features](#Features)
- [Skills](#Skills)
- [Test](#Test)
- [Deployment & Continuous Integration](#Deployment-&-Continuous-Integration)
- [Version Control](#Version-Control)
- [Challenges](#Challenges)
- [Things To Do](#Things-To-Do)
- [Sincere Thanks](#Sincere-Thanks)



## Installation

### Client

```javascript
git clone https://github.com/yerinkim-fe/tripboard-frontend
cd tripboard-frontend
npm install
npm run dev
```

#### Environment Variables

- 프로젝트 루트에 `.env.local` 파일 생성
- NAME = VALUE 형식으로 아래 변수 추가

```
REACT_APP_GOOGLEMAP_APIKEY
REACT_APP_YOUR_SECRET_KEY
```

### Server

```javascript
git clone https://github.com/yerinkim-fe/tripboard-backend
cd tripboard-backend
npm install
npm run dev
```

#### Environment Variables

- 환경변수 관리 [dotenv](https://github.com/motdotla/dotenv)
- 프로젝트 루트에 `.env` 파일 생성
- NAME = VALUE 형식으로 아래 변수 추가

```
DATABASE_URL
YOUR_SECRET_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```



## Features

- JSON Web Token(JWT)을 이용한 사용자 인증 및 로그인 유지
- Google Maps API를 이용한 여행지 위치 검색
- Amazon Web Service(AWS) S3를 이용한 파일 업로드 기능
- execCommand API를 이용한 URL 공유(클립보드 복사)
- 등록한 여행지 리스트 및 지도 보기 제공
- Chartjs를 이용한 여행 데이터 분석 차트 제공



## Skills

### Client-Side

- ES2015+
- React Component 기반 UI 설계
- React Router 기반 SPA Routing 관리
- Redux를 활용한 state 관리
- Axios
- Sass(Variables, Nesting, Modules, Mixins)

### Server-Side

- 자바스크립트 서버 플랫폼 Nodejs
- ES2015+
- Express를 이용한 RESTful API 설계
- JWT Authentication
- MongoDB 기반 NoSQL Database 설계
- ODM 라이브러리 Mongoose
- AWS S3
- Bcrypt 이용하여 사용자 password 암호화



## Test

- Jest, Enzyme을 용하여 Component Unit Test 구현
- Jest를 이용하여 Reducer Unit Test 구현
- Cypress를 이용하여 End To End Test 구현



## Deployment & Continuous Integration

### Client

- Netlify CI를 통한 배포 자동화

### Server

- AWS Elastic beanstalk를 통한 서비스 배포
- CircleCI를 통한 배포 자동화



## Version Control

- Client, Server의 독립적인 관리를 위한 GIT Repo 구분
- Trello를 이용한 Task Management



## Challenges

- 사용자의 Local Storage에 저장한 JWT 토큰 유무에 따라 로그인을 체크하여 state의 초기값을 설정하고 싶었으나, 페이지가 새로 랜더링될 때마다 state가 false로 초기화되어 이 부분을 해결하는데 어려움이 있었습니다. 그래서 state의 초기값을 단순히 Boolean값으로 하지 않고, 토큰 유무를 다루는 함수를 초기값으로 사용함으로서 해결할 수 있었습니다. 이 과정을 통해 리덕스를 다루는 방법에 대해 조금 더 배우는 과정이었고, 리덕스를 공부하여 더 효율적인 방법으로 해결하고 싶습니다.
- AWS S3를 통해 이미지를 업로드하는데, 사진의 방향이 세로임에도 불구하고 업로드가 되면 가로방향으로 등록되는 문제가 있었습니다. 사진의 메타정보(exif)에 있는 orientation 정보를 확인하고, exif.js 라이브러리를 이용하여 회전 버그를 수정할 수 있다는 것을 알게 되었습니다.
- development 환경에서는 s3에 파일 업로드시 용량에 제한이 없으나, production 환경(AWS Elastic Beanstalk)에서만 큰 용량의 사진 파일(1M이상)이 올라가면 `ERR_CONNECTION_RESET` 에러가 발생했습니다. 이를 해결하기 위해 Postman을 통하여 `413 request entity too large` 라는 구체적인 에러 코드를 확인하였고, nginx 의 client_max_body_size 설정이 default 1M 로 되어 있어 발생하는 에러라는 것을 알게 되었습니다. 프로젝트 루트에 .ebextensions/nginx/nginx.conf 을 생성하는 방법을 시도했으나 변경되지 않아, ssh 를 사용하여 AWS EC2 인스턴스 서버에 접속하여 /etc/nginx/nginx.conf  파일을 직접 overwrite 하는 방법으로 해결하였습니다. 하지만 Client에서 파일 용량을 줄여서 업로드하는 방법을 썼다면 더 효율적이었을 것입니다.
- CircleCI를 통한 배포 자동화 설정에서 `bcrypt` 라이브러리가 원인인 에러가 발생하여 어려움이 있었으나,  `.npmrc`  파일 추가를 통해 문제를 해결했습니다.



## Things To Do

- 중복된 위치의 여행이 등록되면, 마커 클릭시 react-google-maps의 popup을 이용하여 리스트로 만들기
- exif.js 라이브러리를 이용하여 사진 이미지의 회전 버그 수정
- 누구와 함께 여행을 갔는지 기록할 수 있는 필드 추가
- 동영상 업로드 및 재생 기능
- 태그 입력을 통한 분류 기능
- 여행 비용 및 당시 환율 등록



## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
