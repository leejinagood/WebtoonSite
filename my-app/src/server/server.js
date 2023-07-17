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


// const { error } = require('console');
// const express = require('express');

const restify = require('restify');
const fs = require('fs');

//서버 설정 및 미들웨어
const server = restify.createServer();
server.use(restify.plugins.bodyParser());// JSON 데이터 파싱을 위한 미들웨어 등록
server.use(restify.plugins.queryParser());

//미들웨어
// app.use(express.json());
// app.use(express.urlencoded({extends: true}));

// //기본 포트번호 설정
// const app = express();
const port = 4000;


const corsMiddleware = require('restify-cors-middleware');


// CORS 정책 설정
const cors = corsMiddleware({
  origins: ['http://localhost:3000'], // 클라이언트 도메인 주소
  allowHeaders: ['Authorization'],
});


server.pre(cors.preflight);
server.use(cors.actual);


const getConn = async () => {
    return await pool.getConnection(async(conn) => conn) ;
}


//데이터베이스 연동
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host : 'webtoon.cq14nnpiflfq.us-east-1.rds.amazonaws.com',
    port : '3306',
    user : 'admin',
    password : 'abcd1234',
    database : 'webtoon'

    // host : '127.0.0.1',
    // port : '3306',
    // user : 'root',
    // password : '2098',
    // database : 'webtoon'
});

//http://localhost:4000/ 접속
server.listen(port, ()=>{
    console.log("페이지 구동 시작"); // 로그 기록
});
  

//요일별 서브페이지
//url에서 요일을 받아와 웹툰 제목을 출력하는 메서드
server.get('/api/daywebtoon', async (req, res) => {
  const conn = await getConn();
  const { day } = req.query;
  const query = 'CALL Day_Webtoon(?);';
  try {
    const [rows] = await conn.query(query, [day]);
    //웹툰 정보 추출 
    const webtoons = rows[0].map(row => ({
      webtoon_name: row.Webtoon_Name, //제목
      author: row.Webtoon_Author, //작가
      like: row.Likes_Count //좋아요 갯수
    }));
    // console.log({webtoons});
    res.send({ webtoons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release();
  }
});


// //메인페이지에서 좋아요가 가장 높은 웹툰 중 top5 제목과 작가 출력
// server.get('/popular', async (req, res) => {
//   const conn = await getConn();
//   const query = 'SELECT Webtoon_Table.Webtoon_Name, Webtoon_Table.Webtoon_Author FROM Webtoon_Table JOIN Webtoon_Detail_Table ON Webtoon_Table.Webtoon_Id = Webtoon_Detail_Table.Webtoon_Id JOIN Like_Table ON Webtoon_Table.Webtoon_Id = Like_Table.Webtoon_Id WHERE Like_Table.Likes = true GROUP BY Like_Table.Webtoon_Id ORDER BY COUNT(Like_Table.Likes) DESC LIMIT 5;';
//   try {
//     const [rows] = await conn.query(query);
//     const result = rows.map((row) => 
//     ({ webtoon_name: row.Webtoon_Name,  //웹툰 제목
//       author: row.Webtoon_Author})); //작가 이름
//     res.send(result);
//     // console.log(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: '서버 스크립트의 오류' });
//   } finally {
//     conn.release();
//   }
// });

//메인페이지에서 좋아요가 가장 높은 웹툰 중 top5 제목과 작가 출력
//위 코드를 프로시저로 수정
server.get('/popular', async (req, res) => {
  const conn = await getConn();
  const query = 'CALL Like_Top();'; // 프로시저 호출
  try {
    const [rows] = await conn.query(query);
    const result = rows[0].map((row) => ({
      webtoon_name: row.Webtoon_Name,
      author: row.Webtoon_Author
    }));
    res.send(result);
    // console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release();
  }
});


//검색하면 그 단어를 포함한 웹툰 제목과 작가, 카테고리를 출력하는 메서드
server.get('/api/search', async (req, res) => {
    const conn = await getConn();
    const { word } = req.query;
    const query = 'CALL Search_Webtoon(?);'; //제목과, 작가와, 카테고리 출력
    try {
      const [rows] = await conn.query(query, [word]);
      // console.log(rows);
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
  });
  

//새롭게 업로드된지 일주일 된 신규 웹툰의 제목을 출력
server.get('/api/new', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT Webtoon_Table.Webtoon_Name FROM Webtoon_Table JOIN Webtoon_Detail_Table ON Webtoon_Table.Webtoon_Id = Webtoon_Detail_Table.Webtoon_Id WHERE Webtoon_Date >= DATE_SUB(NOW(), INTERVAL 7 DAY);';
    try{
    let [rows] = await conn.query(query);
    const result = rows.map((row) => row.Webtoon_Name); //웹툰 제목만 출력
    // console.log({result});
    res.send({result});
    }catch(error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
});


//웹툰 list에 들어갈 정보
//Rank에서 웹툰 이미지나 제목을 클릭했을 때 보이는 웹툰 정보들
server.get('/api/webtoondetail', async (req, res) => {
  const conn = await getConn();
  const { name } = req.query;
  const query = 'call Webtoon_Detail (?);';
  try {
    const [rows] = await conn.query(query, [name]);
    const webtoons = rows[0].map(row => ({
      webtoon_name: row.Webtoon_Name, //웹툰 제목
      author: row.Webtoon_Author, //작가 이름
      like: row.Likes_Count, //좋아요 갯수
      content: row.Webtoon_Content, //웹툰 상세 설명
      count: row.Episode_Count, //에피소드 갯수 
      week: row.Webtoon_Week //무슨 요일에 업로드 하는지
    }));
    // console.log({webtoons});
    res.send({ webtoons });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
});

const jwt = require('jsonwebtoken'); //jwt
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Cookies = require('restify-cookies');


// 회원가입 메서드
server.post('/api/SignUpPage', async (req, res) => {
  const conn = await getConn();
  const { email, pass, name, age } = req.body;
  const saltRounds = 10; // 솔트 생성에 사용되는 라운드 수

  try {
    // 트랜잭션 시작
    await conn.beginTransaction(); 

    //bcrypt.hash()로 비밀번호 암호화 
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    const query = 'INSERT INTO User_Table (User_Email, User_Password, User_Name, User_Age) VALUES (?, ?, ?, ?);';
    const value = [email, hashedPassword, name, age];
    //쿼리에 비밀번호 암호화된 내용으로 삽입
    await conn.query(query, value);

    //삽입된 회원의 정보를 이메일을 통해 조회하여 가져옴
    const selectUserId = 'SELECT User_Id FROM User_Table WHERE User_Email = ?;';
    const [selectResult] = await conn.query(selectUserId, [email]);
    //User_Id 를 추출
    const userId = selectResult[0]?.User_Id;

    if (userId) { //userId가 있으면 모든 Webtoon_Id에 대한 likes 를 초기화하는 프로시저 호출
      const callProc = 'CALL user_basic_like(?);';
      await conn.query(callProc, [userId]);
    }

    await conn.commit(); // 트랜잭션 커밋
    res.send('입력 성공');
  } catch (error) {
    console.error(error);
    await conn.rollback(); // 트랜잭션 롤백
    res.status(500).json('입력 실패');
  } finally {
    conn.release();
  }
});


// 로그인 메서드
server.get('/api/LoginPage', async (req, res) => {
  const conn = await getConn();
  const { ID, password } = req.query;

  try {
    // 아이디가 있는지 확인
    const selectQuery = 'SELECT * FROM User_Table WHERE User_Email = ?;';
    //아이디에 맞는 row를 selectUserResult 배열 변수에 저장
    const [selectUserResult] = await conn.query(selectQuery, [ID]);
    // 회원 정보가 없는 경우 
    if (selectUserResult.length === 0) {
      res.send('아이디가 없습니다');
      return;
    }

    const { User_Password } = selectUserResult[0];
    //입력한 비밀번호와 db에 저장된 비밀번호 일치하는지 
    const isMatch = await bcrypt.compare(password, User_Password);

    if (isMatch) {
      // 비밀번호 일치
      let token = "";
      //jwt 회원 정보를 받은 후 토큰을 생성
      token = jwt.sign(
        { userId: selectUserResult[0].User_Id, userEmail: selectUserResult[0].User_Email },
        'your-secret-key', // 비밀키
        { expiresIn: '1h' } // 토큰 만료 시간 1시간 설정
      );
      //토큰을 응답으로 디버깅
      // 쿠키에 데이터를 담아 응답 보내기
      res.setHeader('Set-Cookie', [
        `User_Name=${selectUserResult[0].User_Name}`,
        `User_Email=${selectUserResult[0].User_Email}`,
        `token=${token}`
      ]);
      // 유저 닉네임과 유저 이메일, 토큰을 응답으로
      res.send({
        User_Name: selectUserResult[0].User_Name,
        User_Email: selectUserResult[0].User_Email,
        token: token
      });
      
      console.log(selectUserResult[0].User_Name,selectUserResult[0].User_Email, token);
    } else {
      // 비밀번호 불일치
      res.send();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('로그인 실패');
  } finally {
    conn.release();
  } 
});


// 쿠키에서 토큰 추출하는 함수
function extractTokenFromCookies(cookies) {
  const cookieArr = cookies.split(';');
  const tokenCookie = cookieArr.find(cookie => cookie.trim().startsWith('token='));
  if (tokenCookie) {
    const token = tokenCookie.split('=')[1];
    return token.trim();
  }
  return null;
}


// 토큰 검증 api
server.get('/api/Token', async (req, res) => {
  // 클라이언트에서 전달된 쿠키 가져오기
  const cookies = req.headers.cookie;
  if (cookies) {
    // 쿠키가 존재하는 경우 처리
    const token = extractTokenFromCookies(cookies); // 쿠키에서 토큰 추출

    try {
      const decodedToken = jwt.verify(token, 'your-secret-key');
      // 토큰이 유효한 경우
      const userId = decodedToken.userId;
      res.send('토큰 인증 성공');
    } catch (error) {
      // 토큰이 유효하지 않은 경우
      res.status(401).send('토큰 인증 실패');
    }
  } else {
    // 쿠키가 없는 경우 처리
    res.status(401).send('쿠키 없음');
  }
});



// 기존 로그인 코드
// server.get('/api/LoginPage', async (req, res) => {
//   const conn = await getConn();
//   const { ID, password } = req.query;
  
//   const values = [ID, password];
//   const query = 'SELECT User_Name FROM User_Table WHERE User_Email = ? AND User_Password = ?;';
//   try {
//     const [rows] = await conn.query(query, values);
//     console.log(rows);
//     if (rows.length > 0) { //응답을 한 번만 보내도록
//       // 로그인 성공
//       const user = rows[0];
//       // 토큰 생성
//       const token = jwt.sign(
//         { userId: user.User_ID, userEmail: user.User_Email },
//         'your-secret-key',
//         { expiresIn: '1h' } // 토큰 만료 시간 1시간 설정
//       );
//       // 토큰을 응답으로 전송
//       res.send({ success: true, token });
//       console.log(token); //토큰 출력으로 디버깅 
//     } else {
//       // 로그인 실패
//       res.status(401).send({ error: '요청이 거부' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: '서버 스크립트 오류' });
//   } finally {
//     conn.release(); // 연결 해제
//   }
// });


// 댓글 입력 메서드
server.post('/api/comment_insert', async (req, res)=> {
  const conn = await getConn();
  const { CommentContent, UserEmail, WebtoonName, EpisodeNumber } = req.body;
  const query = 'call Comment_insert(?, ?, ?, ?)';
  const values = [CommentContent, UserEmail, WebtoonName, EpisodeNumber];
  try {
    const authResponse = await axios.post('http://your-server/api/Token', { token });
    if (authResponse.data === '토큰 인증 성공') {
    await conn.query(query, values);
    res.send("댓글 입력 성공");
  } else {
    res.status(401).send('토큰 인증 실패');
  }
  }catch (error) {
    console.error(error);
    res.status(500).json("입력 실패");
  } finally {
    conn.release();
  }
})


//파라미터로 Webtoon_Name과 episode_Number를 받아와 댓글을 확인할 수 있는 메서드
server.get('/api/comment', async(req, res)=>{
  const conn = await getConn();
  const { WebtoonName, EpisodeNumber } = req.query;
  const values = [WebtoonName, EpisodeNumber];
  const query = 'call Comment_View(?);';
  try {
    const [rows] = await conn.query(query, [values]);
    const comment = rows[0].map(row => ({
      Comment_Content: row.Comment_Content, //댓글 내용
      Comment_Date: row.Comment_Date, //댓글을 입력한 날짜
      User_Name: row.User_Name  //사용자 닉네임
    }));
    // console.log({comment});
    res.send({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
})


//다음 화가 존재하는지 안 하는지 1, 0으로 전달
server.get('/api/next_episode', async(req, res) => {
  const conn = await getConn();
  const query = 'call episode_next(?);';
  const {Webtoon_Name, Episode_Number} = req.query;
  const values = [Webtoon_Name, Episode_Number] //웹툰 이름과 현재 에피소드 번호를 넘겨줌. 
  try{
    const [result] = await conn.query(query, [values]);
    //result에서 EXISTS 값을 추출
    const exists = result[0][0]["EXISTS (\n\tselect Episode_Number \n\tfrom Episode_Table \n    join Webtoon_Table on Episode_Table.Webtoon_Id = Webtoon_Table.Webtoon_Id\n\twhere Episode_Table.Episode_Number = EpisodeNumber + 1 and  Webtoon_Table.Webtoon_Name = WebtoonName\n    )"];
    // console.log(exists);
    //다음 화가 존재하면 1 아니면 0
    res.send({ exists: exists ? 1 : 0 }); //response 하기 전에 상태코드를 지정하여 보내주기
  }catch (error) {
    // console.error(error); 너무 많이 호출되기 때문에 임시 주석처리
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
})


//이전 화가 존재하는지 안 하는지 1, 0 으로 알려줌
server.get('/api/prev_episode', async(req, res) => {
  const conn = await getConn();
  const query = 'call episode_prev(?);';
  const {Webtoon_Name, Episode_Number} = req.query;
  const values = [Webtoon_Name, Episode_Number] //웹툰 이름과 현재 에피소드 번호를 넘겨줌. 
  try{
    const [result] = await conn.query(query, [values]);
     //result에서 EXISTS 값을 추출
    const exists = result[0][0]["EXISTS (\n\tselect Episode_Number \n\tfrom Episode_Table \n    join Webtoon_Table on Episode_Table.Webtoon_Id = Webtoon_Table.Webtoon_Id\n\twhere Episode_Table.Episode_Number = EpisodeNumber - 1 and  Webtoon_Table.Webtoon_Name = WebtoonName\n    )"];
    // console.log(exists);
    //이전 화가 존재하면 1 아니면 0
    res.send({ exists: exists ? 1 : 0 }); //response 하기 전에 상태코드를 지정하여 보내주기 
  }catch (error) {
    // console.error(error); 너무 많이 호출되기 때문에 임시 주석처리
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
})


//좋아요를 눌렀으면 1 출력, 안 눌렀으면 0 출력
server.get('/api/like_exists', async(req, res) => {
  const conn = await getConn();
  const query = 'call exists_like(?);';
  const {Webtoon_Id, User_Id} = req.query;
  const values = [Webtoon_Id, User_Id] //웹툰 아이디와 현재 에피소드 번호를 넘겨줌. 
  try{
    const [result] = await conn.query(query, [values]);
    //result에서 EXISTS 값을 추출
    const exists = result[0][0]["exists(\n\tselect Likes\n    from Like_Table\n    where Webtoon_Id=WebtoonId and User_Id = UserId and Likes = 1)"];
    // console.log(exists);
    //좋아요를 눌렀으면 1 안 눌렀으면 0
    res.send({ exists: exists ? 1 : 0 }); //response 하기 전에 상태코드를 지정하여 보내주기
  }catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
})


//위 코드에서 0일 때만 좋아요를 누를 수 있음
//User_Id와 Webtoon_Id을 파라미터로 받아서 좋아요 누르면 +1 되도록 
server.put('/api/update_like', async (req, res)=> {
  const conn = await getConn();
  const query = 'call update_like(?)';
  const {User_Id, Webtoon_Id} = req.body;
  const value = [User_Id, Webtoon_Id];
  try {
      const authResponse = await axios.post('http://your-server/api/Token', { token });
      if (authResponse.data === '토큰 인증 성공') {
      await conn.query(query, [value]); 
      // const result_query = "select count(Likes)  from Like_Table where Likes = true and Webtoon_Id = ? group by Webtoon_Id;";
      // const result = await conn.query(result_query, [value.Webtoon_Id]); 
      // res.send(result);
      // console.log(result);
      // console.log("좋아요 추가 성공");
      res.send("좋아요 추가 성공");
      }else {
        res.status(401).send('토큰 인증 실패'); }
    } catch (error) {
      console.error(error);
      res.status(500).json("입력 실패");
    } finally {
      conn.release(); 
    }
});

//webtoon_name을 입력받고 Episode_Id를 보내주는 메서드 
server.get('/api/Episode_Id', async(req, res) => {
  const conn = await getConn();
  const query = "select Episode_Id from Episode_Table join Webtoon_Table on Webtoon_Table.Webtoon_Id = Episode_Table.Webtoon_Id where Webtoon_Table.Webtoon_Name = ?;"
  const {Webtoon_Name} = req.query;
  try{
    const [result] = await conn.query(query, [Webtoon_Name]);
    // console.log(result);
    res.send(result);
  }catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
}});


//웹툰을 첫 화부터 episode_Number를 출력하는 메서드
server.get('/api/Webtoon_Asc', async(req, res) => {
  const conn = await getConn();
  const query = "call Webtoon_Asc (?);";
  const {WebtoonName} = req.query;
  try{
    const [rows] = await conn.query(query, [WebtoonName]);
    const Asc_Number = rows[0].map(row => ({
      // Webtoon_Name: row.Webtoon_Name, //웹툰 제목
      Episode_Number: row.Episode_Number //에피소드 넘버 1,2,3순
    }));
    // console.log({Asc_Number});
    res.send({Asc_Number});
  }catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
}});

//웹툰을 최신화부터 episode_Number를 출력하는 메서드
server.get('/api/Webtoon_Desc', async(req, res) => {
  const conn = await getConn();
  const query = "call Webtoon_Desc (?);";
  const {WebtoonName} = req.query;
  try{
    const [rows] = await conn.query(query, [WebtoonName]);
    const Desc_Number = rows[0].map(row => ({
      // Webtoon_Name: row.Webtoon_Name, //웹툰 제목
      Episode_Number: row.Episode_Number //에피소드 넘버 4,3,2,1순
    }));
    // console.log({Desc_Number});
    res.send({Desc_Number});
  }catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
}});

// 제목과 에피소드를 파라미터로 받고 웹툰의 이미지 경로와 카운트 컬럼을 추출하는 메서드
server.get('/api/Webtoon_Img', async (req, res) => {
  const conn = await getConn();
  const query = "call WebtoonImg (?, ?);";
  const { webtoonName, episodeNumber } = req.query;
  const values = [webtoonName, episodeNumber];
  try {
    const [rows] = await conn.query(query, values);
    const EpisodeImg = rows[0].map(row => ({
      Episode_Image: row.Episode_Image,
      Episode_Img_Count: row.Episode_Img_Count
    }));
    // console.log({ EpisodeImg });
    res.send({ EpisodeImg });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
});


//에피소드 썸네일 보여주는 메서드
server.get('/api/Episode_Thumbnail', async (req, res) => {
  const conn = await getConn();
  const query = "call Episode_Thumbnail (?, ?);";
  const { webtoonName, episodeNumber } = req.query;
  const values = [webtoonName, episodeNumber];
  try {
    const [rows] = await conn.query(query, values);
    res.send({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
});

//에피소드 썸네일 보여주는 메서드
server.get('/api/Webtoon_Thumbnail', async (req, res) => {
  const conn = await getConn();
  const query = "call Webtoon_Thumbnail(?);";
  const { webtoonName } = req.query;
  const values = [webtoonName];
  try {
    const [rows] = await conn.query(query, values);
    res.send({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
});