// sudo npm install restify --save
// npm install mysql2
// npm install nodejs
// npm install express

// const { error } = require('console');
// const express = require('express');
const restify = require('restify');

//서버 설정 및 미들웨어
const server = restify.createServer();
server.use(restify.plugins.bodyParser());// JSON 데이터 파싱을 위한 미들웨어 등록

// //기본 포트번호 설정
// const app = express();
const port = 3000;

//미들웨어
// app.use(express.json());
// app.use(express.urlencoded({extends: true}));


const getConn = async () => {
    return await pool.getConnection(async(conn) => conn) ;
}

//데이터베이스 연동
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : '2098',
    database : 'webtoon'
});

//http://localhost:3000/ 접속
server.listen(port, ()=>{
    console.log("페이지 구동 시작");
});

//url에서 요일을 받아와 웹툰 제목을 출력하는 메서드
server.get('/:day', async (req, res) => {
    const conn = await getConn();
    const day = req.params.day;
    const query = 'select Twebtoon.webtoon_name from Twebtoon join Twebtoondetail on Twebtoon.webtoon_id = Twebtoondetail.webtoon_id where Twebtoondetail.week = ?;';
    let [rows] = await conn.query(query, [day]);
  
    res.send(rows);
  });
  
  