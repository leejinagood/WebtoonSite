//댓글관련 api

const commentAPI = (server, getConn) => {

    //파라미터로 Webtoon_Name과 episode_Number를 받아와 댓글을 확인할 수 있는 메서드
    server.get('/api/comment', async(req, res)=>{
        const conn = await getConn();
        const { Name, Ep } = req.query; //영어이름과 에피소드 몇 화인지 받아옴
        const values = [ Name, Ep ]
        const epIDQuery = 'call usp_get_EpiosdeID (?, ?);';
        const viewCommentQuery = 'call usp_get_comment(?);';
        try {

            const [rows] = await conn.query(epIDQuery, values); // Name, Ep 파라미터로 받아온 후
            const ID = rows[0].map((row) => row.episodeID); // episodeID를 추출

            const[result] = await conn.query(viewCommentQuery, [ID]);
            const comment = result[0].map(row => ({
            Comment_Content: row.commentContent, //댓글 내용
            Comment_Date: row.commentDate, //댓글을 입력한 날짜
            User_Name: row.userName  //사용자 닉네임
            }));
            res.send(comment);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    })


    //댓글 입력 메서드 
    server.post('/api/comment_insert', async (req, res) => {
        const conn = await getConn();
        const { WebEnName, Ep, UserEmail, content } = req.body; // 영어 이름과 유저 이메일을 받아옴
        const values = [WebEnName, Ep];
        const user_email = [UserEmail];
        const Content = [content];
        const epIDQuery = 'CALL usp_get_EpiosdeID(?, ?);';
        const userIDQuery = 'CALL usp_get_userID(?);';
        const insertQuery = 'CALL usp_post_comment(?, ?, ?)';
    
        try {
            const [epID] = await conn.query(epIDQuery, values); // Name, Ep 파라미터로 받아온 후
            const EpId = epID[0].map((row) => row.episodeID); // episodeID를 추출
    
            const [usID] = await conn.query(userIDQuery, user_email); // UserEmail 파라미터로 받아온 후
            const UsId = usID[0].map((row) => row.userID); // userID를 추출

            const authResponse = await axios.post('http://your-server/api/Token', { token });
            if (authResponse.data === '토큰 인증 성공') {
            await conn.query(insertQuery, [EpId, UsId, Content]); //댓글 입력
            res.send('댓글이 성공적으로 작성되었습니다.'); 
        } else {
            res.status(401).send('토큰 인증 실패');
        }
        } catch (error) {
            console.error(error);
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    

}
module.exports = commentAPI;
