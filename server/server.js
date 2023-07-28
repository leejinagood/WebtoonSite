// 모듈 설치
// sudo npm install restify --save
// npm install mysql2
// npm install nodejs
// npm install express
// npm install axios --force
// npm install restify-cors-middleware
// npm install multer --save
// npm install jsonwebtoken
// npm install jsonwebtoken bcrypt
// npm install restify-cookies
// npm install dotenv
// npm install axios

const restify = require('restify');
const fs = require('fs');

//서버 설정 및 미들웨어
const server = restify.createServer();
server.use(restify.plugins.bodyParser());// JSON 데이터 파싱을 위한 미들웨어
server.use(restify.plugins.queryParser());

// 기본 포트번호 설정
const port = 4000;

// CORS 정책 설정
const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
  origins: ['http://localhost:3000'][' https://imgur.com/ '], // 클라이언트 도메인 주소
  allowHeaders: ['Authorization'],
});
server.pre(cors.preflight);
server.use(cors.actual);

// 데이터베이스 관련 코드 실행
const { getConn } = require('./database');

async function someFunction() {
  const connection = await getConn();
  connection.release(); // 사용 후 연결 반환
}
someFunction();

//웹툰 api 
const webtoonAPI = require('./apiCode/webtoon');
webtoonAPI(server, getConn);

// 댓글 api
const commentAPI = require('./apiCode/comment');
commentAPI(server, getConn);

// 좋아요 api 
const likeAPI = require('./apiCode/like');
likeAPI(server, getConn);

// 사용자 api 
const userAPI = require('./apiCode/user');
userAPI(server, getConn);

// 웹툰 목록 api 
const webtoonListAPI = require('./apiCode/webtoonList');
webtoonListAPI(server, getConn);


//http://localhost:4000/ 접속
server.listen(port, () => {
  console.log("페이지 구동 시작"); // 로그 기록
});
