//database 관련 코드

const getConn = async () => {
    return await pool.getConnection(async (conn) => conn);
};

//데이터베이스 연동
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host : 'webtoons.cc7zpyhfytwa.ap-northeast-2.rds.amazonaws.com',
    port : '3306',
    user : 'admin',
    password : 'abcd1234',
    database : 'webtoon'
});


module.exports = { getConn };

