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
    origins: ['http://localhost:3000', 'https://imgur.com', 'https://kauth.kakao.com', 'https://at0vjnzzcb.execute-api.ap-northeast-2.amazonaws.com/dev'], // 클라이언트 도메인 주소
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






// const axios = require('axios'); 
// const redisClient = require('./redis'); // redis.js 모듈을 가져옴
// const jwt = require('jsonwebtoken'); //jwt
// const bcrypt = require('bcrypt'); //암호화


// //댓글을 확인할 수 있는 메서드
// server.get('/api/comment', async(req, res)=>{
//   const conn = await getConn();
//   const { EnName, ep } = req.query; //영어이름과 에피소드 몇 화인지 받아옴
//   const values = [ EnName, ep ]
//   const viewCommentQuery = 'call usp_get_comment(?, ?);'; //댓글 조회

//   try {
//       const [result] = await conn.query(viewCommentQuery, values); 
//       const comment = result[0];
//       res.send(comment); //댓글 내용을 응답으로

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); 
//   }
// })

// //댓글 입력 메서드 
// server.post('/api/comment_insert', async (req, res) => {
//   const conn = await getConn();
//   const userID = req.body.userID;
//   const {Ep, WebEnName, content } = req.body; 
//   const values = [Ep, WebEnName, userID, content ];
//   const insertQuery = 'CALL usp_post_comment(?, ?, ?, ?)'; //댓글 입력

//   if(!Ep || !WebEnName || !content){
//       res.status(400).json({ message: '내용을 입력하세요' });
//       return;
//   }else{
//       try {
//           const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
//               headers: { //헤더에
//                   Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
//               },
//           });

//           if (Response.data === '토큰 인증 성공') { //인증 성공일 때 댓글 달 수 있음
//               await conn.query(insertQuery, values); //댓글 삽입

//               res.send('댓글이 성공적으로 작성되었습니다.');  //응답

//           } else {
//               res.json({ message: "로그인 하세요"});
//           }
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: '서버오류' });
//       } finally {
//           conn.release();
//       }
//   }
// });

// server.get('/api/show_like', async (req, res) => {
//   const { id } = req.query;

//   try { //id를 받아온 후 redis의 값으로 좋아요 보여주기
//       const key = `likes:${id}`;
//       const value = await redisClient.get(key);
//       if (value !== null) {
//           res.send(value);
//       } else {
//           res.json({ message: "좋아요 오류"});
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   }
// });


// //좋아요 추가 및 취소
// server.put('/api/update_like', async (req, res) => {
//   const conn = await getConn();

//   const userID = req.body.userID;
//   const { EnName } = req.body; //영어이름과 유저 이메일을 받아옴
//   const values = [userID, EnName];
//   const Query ='call usp_get_likes_by_email(?, ?)' //좋아요 했는지 안 했는지

//   const LikeQuery = 'CALL usp_put_likes(?, ?);'; // 좋아요를 수정하는 sp (추가)

//   try {
//       const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
//           headers: { //헤더에
//               Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
//           },
//       });

//       if (Response.data === '토큰 인증 성공') { // 인증 성공일 때 
//           const [date] = await conn.query(Query, values); // 좋아요 했는지 안 했는지

//           //[ { likes: 1, webtoonWeek: 'satur', webtoonID: 2 } ]
//           const [resultArray] = date;
          
//           const [Result] = await conn.query(LikeQuery, values); // 좋아요 추가
      
//           if (Result.affectedRows > 0) { // 1개 이상이면 좋아요 수정 성공
//               const likeKey = `likes:${resultArray[0].webtoonID}`; // Redis 고유 키 값
//               const newLikes = resultArray[0].likes;
      
//               //이미 눌러 true이면 1 빼고 false이면 1 증가
//               const redisOperation = newLikes ? 'DECRBY' : 'INCRBY';
//               await redisClient[redisOperation](likeKey, 1);
      
//               res.send("좋아요 수정");
//           } else {
//               res.json('좋아요 오류');
//           }
//       }else {
//           res.json({ message: "로그인 하세요"});
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release();
//   }
// });


// // 회원가입 메서드
// server.post('/api/SignUpPage', async (req, res) => {
//   const conn = await getConn();
//   const { email, pass, name, age } = req.body;
//   const saltRounds = 10; // 솔트 생성에 사용되는 라운드 수

//   // const valiEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//   // const valiPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
//   //     // 유효성 검사
//   //     if (!valiEmail.test(email)) {
//   //         res.status(400).json('이메일을 입력하세요');
//   //         return;
//   //       }
//   //       if (!valiPass.test(pass)) {
//   //         res.status(400).json('6자리 이상 입력하세요.');
//   //         return;
//   //       }
//   //       if (!name) {
//   //         res.status(400).json('이름을 입력해주세요');
//   //         return;
//   //       }
//   //       else {
//           try {
//               // 트랜잭션 시작
//               await conn.beginTransaction(); 

//               //bcrypt.hash()로 비밀번호 암호화 
//               const hashedPassword = await bcrypt.hash(pass, saltRounds);

//               const query = 'INSERT INTO UserTable (userEmail, userPassword, userName, userAge) VALUES (?, ?, ?, ?);';
//               const result = [email, hashedPassword, name, age];
//               //쿼리에 비밀번호 암호화된 내용으로 삽입
//               await conn.query(query, result);

//               await conn.commit(); // 트랜잭션 커밋
//               res.send('입력 성공');
//           } catch (error) {
//               console.error(error);
//               await conn.rollback(); // 트랜잭션 롤백
//               res.status(500).json({ message: '회원가입 오류' });
//           } finally {
//               conn.release();
//           }
//   //}
// });


// // 로그인 메서드
// server.get('/api/LoginPage', async (req, res) => {
//   const conn = await getConn();
//   const { ID, password } = req.query;
//   try {
//       // 아이디가 있는지 확인
//       const selectQuery = 'SELECT * FROM UserTable WHERE userEmail = ?;';

//       //아이디에 맞는 row를 selectUserResult 배열 변수에 저장
//       const [selectUserResult] = await conn.query(selectQuery, [ID]);
      
//       // 회원 정보가 없는 경우 
//       if (selectUserResult.length === 0) {
//           res.send('아이디가 없습니다');
//           return;
//       }

//       const UserID = await conn.query(selectQuery, [ID]);

//       const { userPassword } = selectUserResult[0];
//       //입력한 비밀번호와 db에 저장된 비밀번호 일치하는지 
//       const isMatch = await bcrypt.compare(password, userPassword);

//       if (isMatch) {
//           // 비밀번호 일치
          
//           const enNickname = encodeURIComponent(selectUserResult[0].userName);
//           const enEmail = encodeURIComponent(selectUserResult[0].userEmail);

//           let token = "";
//           //jwt 회원 정보를 받은 후 토큰을 생성
//           token = jwt.sign(
//               {
//                   UserName: enNickname,
//                   UserEmail: enEmail,
//                   UserID: UserID[0][0].userID 
//               },
//               'your-secret-key', // 비밀키
//               { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
//           );

//           res.setHeader('Set-Cookie', [
//               `token=${token}; Path=/`
//             ], {
//               sameSite: 'lax',
//               domain: 'localhost',
//               httpOnly: false
//             });

//           res.send({
//               token: token
//           });

//       } else {
//           // 비밀번호 불일치 응답을 "" 로
//           res.json({ message: "비밀번호 불일치"});
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '로그인 실패' });
//   } finally {
//       conn.release();
//   } 
// });


// require('dotenv').config(); // .env 접근
// const querystring = require('querystring');
// const Id = process.env.CLIENT_ID; // 환경 변수에서 클라이언트 아이디
// const Secret = process.env.CLIENT_SECRET; // 환경 변수에서 클라이언트 시크릿 키 


// //카카오 로그인 
// server.get('/api/Kakao', async (req, res) => {

//   const { code } = req.query; // 클라이언트에서 받은 카카오 인증 코드

//   const conn = await getConn();
//   try {
//       const header = { 'Content-Type': 'application/x-www-form-urlencoded' }; //헤더정보, 인코딩 하라는 뜻임

//       const response = await axios.post( //카카오 서버에 post로 요청을 보냄. 토큰을 발급받기 위함임.
//           'https://kauth.kakao.com/oauth/token', //카카오 인증 서버 주소
//           {
//               grant_type: 'authorization_code', //인가코드 받기 위한
//               client_id: Id, // 클라이언트 아이디 
//               client_secret: Secret, // 클라이언트 시크릿 키 
//               redirect_uri: 'http://localhost:4000/api/Kakao',
//               code, //인가코드도 함께 보내야 됨
//           },
//           { headers: header } //헤더정보 추가
//       );

//       const Token = response.data.access_token; // 카카오 서버로부터 받은 토큰

//       // 카카오 서버에 사용자 정보 요청
//       const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', { //인증된 사용자 정보를 얻기 위해 get으로 사용자 정보를 요청보냄
//           headers: {
//               Authorization: `Bearer ${Token}`,
//           },
//       });

//       // userResponse에서 정보 추출
//       let sub = userResponse.data.id;
//       const nickname = userResponse.data.kakao_account.profile.nickname;
//       const email = userResponse.data.kakao_account.email;

//       //한글과 기호가 포함되어 있기 때문에 쿠키로 보내기전 인코딩 해야됨
//       const enNickname = encodeURIComponent(nickname);
//       const enEmail = encodeURIComponent(email);

//       const selectQuery = "select userEmail, userID from UserTable where userEmail = ?;";
//       const [Result] = await conn.query(selectQuery, [email]);

//       let ID = null;

//       // 사용자 정보가 없으면 회원가입
//       if (Result.length === 0) {
//           const insertQuery = 'INSERT INTO UserTable (userEmail, userPassword, userName, socialNumber) VALUES (?, "", ?, ?);';
//           const insertValue = [email, nickname, sub];
//           await conn.query(insertQuery, insertValue);
//       }
      
//       else if(Result.length > 0) {
//           ID = Result[0].userID;
//       }

//       if (ID) {
//           let token = "";
//           //jwt 토큰을 생성
//           token = jwt.sign(
//               {
//                   UserEmail: enEmail,
//                   UserID: ID,
//                   UserName: enNickname,
//                   Sub: sub
//               },
//               'your-secret-key', // 비밀 키
//               { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
//           );

//           // 쿠키에 저장하여 보내기
//           res.setHeader('Set-Cookie', [
//               `token=${token}; Path=/`,
//           ], {
//               sameSite: 'lax',
//               domain: 'localhost',
//               httpOnly: false
//           });
      
//           //리다리엑트는 기본적으로 쿠키를 함께 보냄 같은 도메인이면 저장됨. 이를 쿠키의 동작 방식으로 도메인 기반 쿠키 라고 함
//           res.writeHead(302, { //상태는 302
//               'Location': 'http://localhost:3000', //주소
//               'Content-Type': 'text/plain'
//           });
//           res.end('Redirecting to http://localhost:3000');
          
//       }else{
//           res.writeHead(302, { //상태는 302
//               'Location': 'http://localhost:3000/loginpage', //주소
//               'Content-Type': 'text/plain'
//           });
//           res.end('Redirecting to http://localhost:3000/loginpage');
//       }

//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '카카오 로그인 실패' });
//   }   
// });


// // 쿠키에서 토큰 추출하는 함수
// function DelisousCookie(cookies) { //cookies라는 매개변수를
//   if (typeof cookies === 'string') { //문자열인지 확인
//       const resultCookie = cookies.split(';'); //; 으로 나눔
//       const tokenCookie = resultCookie.find(cookie => cookie.trim().startsWith('token=')); //토큰부분만 빼내기
//       if (tokenCookie) {
//           const token = tokenCookie.split('=')[1];
//           //토큰만 추출
//           return token.trim();
//       }
//   }
//   return null;
// }


// // 토큰 검증 api
// server.get('/api/Token', async (req, res) => {
//   // 클라이언트에서 전달된 쿠키 가져오기
//   const cookies = req.headers.cookie;
//   if (cookies) {
//       // 쿠키가 존재하는 경우 처리
//       const token = DelisousCookie(cookies); // 쿠키에서 토큰 추출

//       if (token) { // 일반 토큰이 있을 때 
//           try {
//               // verify가 만료됐는지 확인하는 함수
//               jwt.verify(token, 'your-secret-key');

//               // 토큰이 유효한 경우
//               res.send('토큰 인증 성공');

//           } catch (error) {
//               res.json({ message: "토큰 인증 실패"});
//           }
//       } 
//       else {
//           res.json({ message: "쿠키에 토큰이 없음"});
//       }
//   } else {
//       console.error(error);
//       res.json({ message: "쿠키 없음"});
//   }
// });


// // 로그아웃 메서드
// server.post('/api/logout', async (req, res) => {
//   try {
//       // 쿠키 삭제
//       res.setHeader('Set-Cookie', [
//           `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
//       ]);
//       res.send('로그아웃 성공');
//   } catch (error) {
//       console.error('카카오 로그아웃 실패:', error.message);
//       res.status(500).json({ message: '서버 오류' });
//   }
// });

// // 요일별 웹툰, 전체 웹툰 중 신규웹툰, 좋아요 상위 5개 웹툰
// server.get('/api/webtoons', async (req, res) => {
//   const conn = await getConn();
//   const { pi_vch_condition } = req.query;

//   try {
//       const Webtoonkey = `webtoon : ${pi_vch_condition}`; // redis 고유 키 값
//       let value = await redisClient.get(Webtoonkey); // 해당 키값으로 데이터 조회

//       if (value) {
//           // 만약 redis에 데이터가 있다면 그대로 반환 
//           res.send(JSON.parse(value)); 

//       } else{ // 만약 redis에 데이터가 없다면 db에서 조회

//           const [result] = await conn.query('CALL usp_get_Webtoons();'); //모든 웹툰 정보 가져옴
//           const webtoon = result[0]; 
//           for (let i = 0; i < webtoon.length; i++) {
//               //console.log(webtoon[i]);
//               const item = webtoon[i];
//               const likeKey = `likes:${item.webtoonID}`;
//               const likeValue = await redisClient.get(likeKey);

//               if (likeValue) {
//                   item.likes = JSON.parse(likeValue); // 이미 저장된 좋아요 정보 사용
//               } else {
//                   await redisClient.set(likeKey, item.totalLikes);
//                   item.likes = item.totalLikes; // 새로운 좋아요 정보 저장
//               }
//           }

//           if (pi_vch_condition === 'All') {  
              
//               res.send(webtoon); // 응답으로 모든 웹툰 정보를 보냄
//               await redisClient.set(Webtoonkey, JSON.stringify(webtoon)); 
//               await redisClient.expire(Webtoonkey, 3600); //webtoon : All 키 1시간마다 삭제

//           }else { // 요일별 웹툰
//               const result = webtoon.filter((item) => item.webtoonWeek === pi_vch_condition); //요일이 같은 것만 출력
//               res.send(result);
//               await redisClient.set(Webtoonkey, JSON.stringify(result));  // 저장
//           }
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release();
//   }
// });


// //검색하면 그 단어를 포함한 웹툰 제목과 영어제목, 썸네일을 출력하는 메서드
// server.get('/api/search', async (req, res) => {
//   const conn = await getConn();
//   const { word } = req.query;
//   const query = 'CALL usp_get_search(?);'; //검색한 웹툰의 정보를 출력
//   try { 
//       const key = `webtoon_search : ${word}`; //redis의 고유 키값
//       let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

//     if (value) {
//       // 만약 redis에 데이터가 있다면 그대로 반환 
//       res.send(JSON.parse(value)); //문자열로 파싱
//     } else {
//       const [result] = await conn.query(query, [word]); //검색 결과를 row에 넣고 응답을 보냄
//       const webtoon = result[0];

//       res.send(webtoon);
//       await redisClient.set(key, JSON.stringify(webtoon)); 
//     }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); // 연결 해제
//   }
// });


// //카테고리 검색
// server.get('/api/category', async (req, res) => {
//   const conn = await getConn();
//   const { word } = req.query;
//   const query = 'CALL usp_get_search_cate(?);'; //검색한 웹툰의 정보를 출력
//   try { 
//       const key = `webtoon_search_category : ${word}`; //redis의 고유 키값
//       let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

//     if (value) {
//       // 만약 redis에 데이터가 있다면 그대로 반환 
//       res.send(JSON.parse(value)); //문자열로 파싱
//     } else {
//       const [result] = await conn.query(query, [word]); //검색 결과를 row에 넣고 응답을 보냄
//       const webtoon = result[0];

//       res.send(webtoon);
//       await redisClient.set(key, JSON.stringify(webtoon)); 
//     }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); // 연결 해제
//   }
// });

// //웹툰 추가 메서드 
// server.post('/api/webtoonAdd', async (req, res) => {
//   const conn = await getConn();
//   const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories} = req.body;
//   const Webtoon = [content, author, WebtoonName, WebtoonEnName];
//   const Detail = [WebtoonEnName, week, thumbnail, JSON.stringify(categories)];

//   const webtoonQuery = 'CALL usp_post_webtoon(?, ?, ?, ?);';
//   //카테고리는 ["일상", "드라마"]
//   const DetailQuery = 'call usp_post_WebtoonDetail(?, ?, ?, ?)';

//   if (!content || !author || !WebtoonName || !WebtoonEnName || !week || !thumbnail) {
//       res.status(400).json({ message: '내용을 입력하세요' });
//       return;
//   }else{
//       try {
//           await conn.query(webtoonQuery, Webtoon); 
//           await conn.query(DetailQuery, Detail); 

//           //redis 값 삭제
//           await redisClient.del('webtoon : All');
//           await redisClient.del(`webtoon : ${week}`);

//           res.send("입력성공");
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: '추가 실패' });
//       } finally {
//           conn.release();
//   }}
// });


// //에피소드 추가 메서드
// server.post('/api/episodeAdd', async (req, res) => {
//   const conn = await getConn();
//   const { WebtoonEnName, count, thumbnail, ep} = req.body;

//   const img = `/WebtoonImg/${WebtoonEnName}/${ep}/${WebtoonEnName}_${ep}_`

//   const Webtoon = [WebtoonEnName, count, img, thumbnail, ep];
  
//   const episodeQuery = 'CALL usp_post_episode(?, ?, ?, ?, ?);';

//   if (!count || !WebtoonEnName || !img || !thumbnail) {
//       res.status(400).json({ message: '내용을 입력하세요' });
//       return;
//   }else{
//       try {
//           const [WebtoonId] = await conn.query(episodeQuery, Webtoon); 

//           await redisClient.del(`webtoon_detail : ${WebtoonId[0][0].webtoonID}`);
//           await redisClient.del(`webtoon_list : ${WebtoonId[0][0].webtoonID}`);

//           res.send("에피소드 추가");
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: '추가 실패' });
//       } finally {
//           conn.release();
//       }
//   }
// });


// //웹툰 내용 전체 삭제
// server.del('/api/webtoonDelete', async (req, res) => {
//   const conn = await getConn();
//   const { EnName } = req.body;
//   const webtoonQuery = 'CALL usp_delete_webtoon(?);';

//   if(!EnName){
//       res.status(400).json({ message: '내용을 입력하세요' });
//       return;
//   }else{
//       try {
//           const [result] = await conn.query(webtoonQuery, EnName); 

//           res.send("삭제 성공");

//           //redis 값 삭제
//           await redisClient.del('webtoon : All');
//           await redisClient.del(`webtoon : ${result[0][0].deleted_webtoonWeek}`);
//           await redisClient.del(`webtoon_detail : ${result[0][0].deleted_webtoonID}`);
//           await redisClient.del(`webtoon_list : ${result[0][0].deleted_webtoonID}`);
//           await redisClient.del(`likes:${result[0][0].deleted_webtoonID}`);
      
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: '삭제 실패' });
//       } finally {
//           conn.release();
//       }
//   }
// });


// //에피소드 하나 지우기
// server.del('/api/episodeDelete', async (req, res) => {
//   const conn = await getConn();
//   const { EnName, ep } = req.body;
//   const value = [EnName, ep];
  
//   if(!EnName || !ep){
//       res.status(400).json({ message: '내용을 입력하세요' });
//       return;
//   }else{
//       try {
//           const episodeQuery = 'CALL usp_delete_episode(?, ?);';

//           const [result] = await conn.query(episodeQuery, value); 

//           res.send(ep+"화 삭제 성공");

//           //redis 값 삭제
//           await redisClient.del(`webtoon_detail : ${result[0][0].p_webtoonID}`);
//           await redisClient.del(`webtoon_list : ${result[0][0].p_webtoonID}`);

//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: '삭제 실패' });
//       } finally {
//           conn.release();
//       }
//   }
// });


// //웹툰 list 상단에 들어갈 정보
// server.get('/api/webtoondetail', async (req, res) => {
//   const conn = await getConn();
//   const { ID } = req.query; //영어이름
//   const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // 파라미터 값에 해당하는 웹툰 정보를 출력하는 SP

//   try {
//       const key = `webtoon_detail : ${ID}`; //redis의 고유 키값
//       let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

//       if (value) {
//           // 만약 redis에 데이터가 있다면 그대로 반환 
//           res.send(JSON.parse(value)); //문자열을 객체로 변환하여

//       } else {
//           let [result] = await conn.query(webtoonQuery, [ID]); // EnName 파라미터로 받아온 후
//           const webtoon = result[0];

//           await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
//           res.send(webtoon);
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); // 연결 해제
//   }
// });


// //웹툰 에피소드 리스트에 사용될 부분 
// server.get('/api/webtoonlist', async (req, res) => {
//   const conn = await getConn();
//   const { ID } = req.query; // 영어이름 받아옴
//   const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?);'; //웹툰 정보를 출력하는 SP

//   try {
//       const key = `webtoon_list : ${ID}`; //redis의 고유 키값
//       let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

//       if (value) {
//           // 만약 redis에 데이터가 있다면 그대로 반환 
//           res.send(JSON.parse(value)); //문자열을 객체로 변환하여

//       } else {
//           let [result] = await conn.query(webtoonQuery, [ID]); // EnName 파라미터로 받아온 후
//           const webtoon = result[0]; //결과를 저장 후 응답으로 보냄

//           await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
//           res.send(webtoon);
//       }
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); // 연결 해제
//   }
// });


// //웹툰 영어이름, episodeNumber을 받으면 웹툰의 이미지와, 다음 화가 있는지
// server.get('/api/webtoonpage', async (req, res) => {
//   const conn = await getConn();
//   const { ID, ep } = req.query; //영어이름, 몇 화?
//   const values = [ID, ep]
//   const ImgAndNext = 'CALL usp_get_webtoonPages(?, ?);'; // episodeID를 받아와 웹툰 정보를 출력하는 SP

//   try {
//           let [result] = await conn.query(ImgAndNext, values); // EnName과 ep 파라미터를 배열로 전달
//           const webtoon = result[0];

//           res.send(webtoon);
//       }
//    catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//   } finally {
//       conn.release(); // 연결 해제
//   }
// });