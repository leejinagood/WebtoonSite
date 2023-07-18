//댓글관련 api


//댓글 입력 메서드
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