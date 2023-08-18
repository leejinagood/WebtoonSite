const amplify = require('@aws-amplify/core');
const awsExports = require('./src/aws-exports');

// Amplify 설정
amplify.configure(awsExports);

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
    origins: ['http://localhost:3000', 'https://imgur.com', 'https://kauth.kakao.com', 'https://at0vjnzzcb.execute-api.ap-northeast-2.amazonaws.com/dev'],
    allowHeaders: ['Authorization'],
});
server.pre(cors.preflight);
server.use(cors.actual);

// Amplify API 설정
const amplifyAPI = amplify.API;

// 서버 설정 및 라우트 호출
require('./routes/webtoonRoute')(server, amplifyAPI);
require('./routes/webtoonListRoute')(server, amplifyAPI);
require('./admin/routes/webtoonAddRoute')(server, amplifyAPI);
require('./admin/routes/webtoonDeleteRoute')(server, amplifyAPI);
require('./admin/routes/webtoonShowRoute')(server, amplifyAPI);
require('./admin/routes/adminAuthRoute')(server, amplifyAPI);
require('./routes/commentRoute')(server, amplifyAPI);
require('./routes/likeRoute')(server, amplifyAPI);
require('./routes/userRoute')(server, amplifyAPI);

// 서버 시작
server.listen(port, () => {
  console.log("---------------------------구동 시작---------------------------");
});
