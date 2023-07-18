//좋아요 관련 api

// sp의 서브쿼리가 1개 이상의 행을 반환하기 때문에 일반 쿼리로 변경
// 위 두 코드를 합친 코드 : 좋아요를 먼저 select한 후 true이면 1을, 아니면 0 을 출력함. 결과가 0일때랑 User_Email, Webtoon_Name이 존재할 때만 추가로 좋아요를 누를 수 있음. 
server.put('/api/update_like', async (req, res) => {
const conn = await getConn();
const selectQuery = 'SELECT EXISTS (SELECT * FROM Like_Table WHERE User_Id = (SELECT User_Id FROM User_Table WHERE User_Email = ?) AND Webtoon_Id = (SELECT Webtoon_Id FROM Webtoon_Table WHERE Webtoon_Name = ?) AND Likes = 1) AS likeExists;';
const updateQuery = 'UPDATE Like_Table SET Likes = true WHERE User_Id = (SELECT User_Id FROM User_Table WHERE User_Email = ?) AND Webtoon_Id = (SELECT Webtoon_Id FROM Webtoon_Table WHERE Webtoon_Name = ?);';
const existsQuery = 'SELECT (SELECT EXISTS (SELECT User_Email FROM User_Table WHERE User_Email = ?)) AS userExists, (SELECT EXISTS (SELECT Webtoon_Name FROM Webtoon_Table WHERE Webtoon_Name = ?)) AS webtoonExists;';
const { User_Email, Webtoon_Name } = req.body;
const values = [User_Email, Webtoon_Name]; //User_Email과 Webtoon_Name 받아오기
try {
    //좋아요를 눌렀을 때는 1 출력 안 눌렀을 때는 0 출력
    const [result] = await conn.query(selectQuery, values);
    const likeExists = result[0].likeExists;

    // 사용자 이메일과 웹툰 제목이 존재하는지 아닌지 확인
    const [existResult] = await conn.query(existsQuery, values);
    const userExists = existResult[0].userExists; //사용자 이메일이 존재하면 1 아니면 0
    const webtoonExists = existResult[0].webtoonExists; //웹툰 제목이 존재하면 1 아니면 0
    // console.log(webtoonExists);
    // console.log(userExists);

    // 좋아요를 누르지 않았고 사용자 이메일과 웹툰 제목이 존재할 때만 update
    if (likeExists === 0 && userExists === 1 && webtoonExists === 1) {
    await conn.query(updateQuery, values);
    res.send('좋아요 추가 성공');
    } else {
    res.send('이미 좋아요를 눌렀습니다.');
    }
} catch (error) {
    console.error(error);
    res.status(500).json('입력 실패');
} finally {
    conn.release();
}
});