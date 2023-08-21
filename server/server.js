const restify = require('restify');

// 모듈 설치 및 설정
const server = restify.createServer();
server.use(restify.plugins.bodyParser()); // JSON 데이터 파싱을 위한 미들웨어
server.use(restify.plugins.queryParser());

// 기본 포트번호 설정
const port = process.env.PORT || 2000;

// CORS 정책 설정
const corsMiddleware = require('restify-cors-middleware');
const cors = corsMiddleware({
    origins: ['http://localhost:3000', 'https://imgur.com', 'https://kauth.kakao.com', 'https://at0vjnzzcb.execute-api.ap-northeast-2.amazonaws.com/dev', 'http://107.23.243.5:4000'], // 클라이언트 도메인 주소
    allowHeaders: ['Authorization'],
});
server.pre(cors.preflight);
server.use(cors.actual);
//

// 서버 설정 및 라우트 호출
require('./routes/webtoonRoute')(server);
require('./routes/webtoonListRoute')(server);
require('./admin/routes/webtoonAddRoute')(server);
require('./admin/routes/webtoonDeleteRoute')(server);
require('./admin/routes/webtoonShowRoute')(server);
require('./admin/routes/adminAuthRoute')(server);
require('./routes/commentRoute')(server);
require('./routes/likeRoute')(server);
require('./routes/userRoute')(server);

// 서버 시작
server.listen(port, () => {
  console.log("---------------------------구동 시작---------------------------"); // 로그 기록
});
