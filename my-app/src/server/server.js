// 모듈 설치

// sudo npm install restify --save
// npm install mysql2
// npm install nodejs
// npm install express
// npm install axios --force
// npm install restify-cors-middleware
// npm install multer --save

// const { error } = require('console');
// const express = require('express');
const restify = require('restify');
const path = require('path');

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
      webtoon_name: row.Webtoon_Name,
      author: row.Webtoon_Author,
      like: row.Likes_Count
    }));
    // const webtoons = rows[0].map(row => row.webtoon_name); 
    console.log({webtoons});
    res.send({ webtoons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    conn.release();
  }
});


//메인페이지에서 like가 가장 높은 웹툰 중 top5
server.get('/popular', async (req, res) => {
  const conn = await getConn();
  const query = 'SELECT Webtoon_Table.Webtoon_Name, Webtoon_Table.Webtoon_Author FROM Webtoon_Table JOIN Webtoon_Detail_Table ON Webtoon_Table.Webtoon_Id = Webtoon_Detail_Table.Webtoon_Id JOIN Like_Table ON Webtoon_Table.Webtoon_Id = Like_Table.Webtoon_Id WHERE Like_Table.Likes = true GROUP BY Like_Table.Webtoon_Id ORDER BY COUNT(Like_Table.Likes) DESC LIMIT 5;';
  try {
    const [rows] = await conn.query(query);
    const result = rows.map((row) => ({ webtoon_name: row.Webtoon_Name, author: row.Webtoon_Author}));
    res.send(result);
    // console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    conn.release();
  }
});


//검색하면 그 단어를 포함한 웹툰 제목과 작가, 카테고리를 출력하는 메서드
server.get('/api/search', async (req, res) => {
    const conn = await getConn();
    const { word } = req.query;
    const query = 'CALL Serch_Webtoon(?);';
    try {
      const [rows] = await conn.query(query, [word]);
      console.log(rows);
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      conn.release(); // 연결 해제
    }
  });
  
  

//새롭게 업로드된지 일주일 된 신규 웹툰의 제목을 출력
server.get('/new', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT Webtoon_Table.Webtoon_Name FROM Webtoon_Table JOIN Webtoon_Detail_Table ON Webtoon_Table.Webtoon_Id = Webtoon_Detail_Table.Webtoon_Id WHERE Webtoon_Date >= DATE_SUB(NOW(), INTERVAL 7 DAY);';
    let [rows] = await conn.query(query);
    const result = rows.map((row) => row.webtoon_name).join(', ');
    res.send(result);
});

//웹툰 list에 들어갈 정보
server.get('/api/webtoondetail', async (req, res) => {
  const conn = await getConn();
  const { name } = req.query;
  const query = 'call Webtoon_Detail (?);';
  try {
    const [rows] = await conn.query(query, [name]);
    const webtoons = rows[0].map(row => ({
      webtoon_name: row.Webtoon_Name,
      author: row.Webtoon_Author,
      like: row.Likes_Count,
      content: row.Webtoon_Content,
      count: row.Episode_Count,
      week: row.Webtoon_Week
    }));
    console.log({webtoons});
    res.send({ webtoons });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  } finally {
    conn.release(); // 연결 해제
  }
});

//화원가입 메서드
server.post('/api/SignUpPage', async(req, res) => {
  const conn = await getConn();
  const { email, pass, name, age } = req.body;
  const query = 'INSERT INTO Tuser (user_email, password, user_name, user_age) VALUES (?, ?, ?, ?);';
  const values = [email, pass, name, age];
  try {
    await conn.query(query, values);
    res.send("입력 성공");
  } catch (error) {
    console.error(error);
    res.status(500).json("입력 실패");
  } finally {
    conn.release();
  }
});

//로그인 메서드
server.get('/api/LoginPage', async (req, res) => {
  const conn = await getConn();
  const { ID, password } = req.query;
  const values = [ID, password];
  const query = 'SELECT user_name FROM Tuser WHERE user_email = ? AND password = ?;';
  try {
    const [rows] = await conn.query(query, values);
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  } finally {
    conn.release(); // 연결 해제
  }
});

// 이미지 API 엔드포인트
// server.get('/api/img', (req, res, next) => {
//   const { webtoon_name } = req.query;
//   if (webtoon_name === '소녀재판') {
//     const imagePath = '/Users/leejina/Desktop/leejina/WebtoonSite/my-app/src/WebtoonImg/web1/web1_thumbnail.jpg';
//   } else if (webtoon_name === '마루는 강쥐'){
//     const imagePath = '/Users/leejina/Desktop/leejina/WebtoonSite/my-app/src/WebtoonImg/web2/web2_thumbnail.jpg';
//   } else if (webtoon_name === '소녀재판'){
//     const imagePath = '/Users/leejina/Desktop/leejina/WebtoonSite/my-app/src/WebtoonImg/web3/web3_thumbnail.jpg';
//   }

//     // 이미지 파일 전송
//     res.sendFile(imagePath);
  
//   console.log(imagePath);
//   next();
// });