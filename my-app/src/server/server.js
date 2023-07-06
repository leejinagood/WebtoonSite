// 모듈 설치

// sudo npm install restify --save
// npm install mysql2
// npm install nodejs
// npm install express
// npm install axios --force

// const { error } = require('console');
// const express = require('express');
const restify = require('restify');

//서버 설정 및 미들웨어
const server = restify.createServer();
server.use(restify.plugins.bodyParser());// JSON 데이터 파싱을 위한 미들웨어 등록

//미들웨어
// app.use(express.json());
// app.use(express.urlencoded({extends: true}));

// //기본 포트번호 설정
// const app = express();
const port = 4000;


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
});

//http://localhost:4000/ 접속
server.listen(port, ()=>{
    console.log("페이지 구동 시작"); // 로그 기록
});

//요일별 서브페이지
//url에서 요일을 받아와 웹툰 제목을 출력하는 메서드
server.get('/daywebtoon/:day', async (req, res) => {
    const conn = await getConn();
    const day = req.params.day;
    const query = 'select Twebtoon.webtoon_name from Twebtoon  JOIN Twebtoondetail ON Twebtoon.webtoon_id = Twebtoondetail.webtoon_id where Twebtoondetail.week = ?;';
    let [rows] = await conn.query(query, [day]);
    const result = rows.map((row) => row.webtoon_name).join(', ');
    res.send(result);
});

//메인페이지에서 like가 가장 높은 웹툰 중 top5
server.get('/popular', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT Twebtoon.webtoon_name, Twebtoon.author_name, Twebtoondetail.thumbnail FROM Twebtoon jOIN Twebtoondetail ON Twebtoon.webtoon_id = Twebtoondetail.webtoon_id join Tlike on Twebtoon.webtoon_id = Tlike.webtoon_id ORDER BY Tlike.likes DESC limit 5;';
    let [rows] = await conn.query(query);
    const result = rows.map((row) => row.webtoon_name).join(', ');
    res.send(result);
});

//검색하면 그 단어를 포함한 웹툰 제목과 작가를 출력하는 메서드
server.post('/api/search', async (req, res) => {
    const conn = await getConn();
    const search = req.params.search;
    const {searchword} = req.body;
    const query = 'call serchwebtoonandauthor(?);';
    let [rows] = await conn.query(query, [searchword]);
    console.log(rows);
});

// server.get('/select/:search', async (req, res) => {
//     const search = req.params.search;
//     const conn = await pool.getConnection();
    
//     try {
//       const query = 'CALL searchWebtoonAndAuthor(?)';
//       const [rows] = await conn.query(query, [search]);
//       res.send(rows);
//     } catch (error) {
//       console.error(error);
//       res.send(500, '서버 오류');
//     } finally {
//       conn.release();
//     }
//   });

//새롭게 업로드된지 일주일 된 신규 웹툰의 제목을 출력
server.get('/new', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT Twebtoon.webtoon_name FROM Twebtoon JOIN Twebtoondetail ON Twebtoon.webtoon_id = Twebtoondetail.webtoon_id WHERE update_date >= DATE_SUB(NOW(), INTERVAL 7 DAY);';
    let [rows] = await conn.query(query);
    const result = rows.map((row) => row.webtoon_name).join(', ');
    res.send(result);
});
