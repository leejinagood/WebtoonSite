//댓글관련 api

const commentAPI = (server, getConn) => {

    //댓글을 확인할 수 있는 메서드
    server.get('/api/comment', async(req, res)=>{
        const conn = await getConn();
        const { EnName, ep } = req.query; //영어이름과 에피소드 몇 화인지 받아옴
        const values = [ EnName, ep ]
        const epIDQuery = 'call usp_get_EpiosdeID (?, ?);'; //제목과 epNumber로 episodeID 추출
        const viewCommentQuery = 'call usp_get_comment(?);'; //댓글 조회
        try {
            const [rows] = await conn.query(epIDQuery, values); // Name, Ep 파라미터로 받아온 후
            const ID = rows[0].map((row) => row.episodeID); // episodeID를 추출

            const[result] = await conn.query(viewCommentQuery, [ID]); //episodeID로 댓글 조회
            const comment = result[0].map(row => ({
            Comment_ID : row.commentID, //댓글 고유의 ID
            Comment_Content: row.commentContent, //댓글 내용
            Comment_Date: row.commentDate, //댓글을 입력한 날짜
            User_Name: row.userName  //사용자 닉네임
            }));
            res.send(comment); //댓글 내용을 응답으로
        } catch (error) {
            // console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    })

    const axios = require('axios'); 


    //댓글 입력 메서드 
    server.post('/api/comment_insert', async (req, res) => {
        const conn = await getConn();
        const { WebEnName, Ep, UserEmail, content } = req.body; // 영어 이름과 유저 이메일을 받아옴
        const values = [WebEnName, Ep];
        const user_email = [UserEmail];
        const Content = [content];
        const epIDQuery = 'CALL usp_get_EpiosdeID(?, ?);'; //episodeID
        const userIDQuery = 'CALL usp_get_userID(?);'; //UserID
        const insertQuery = 'CALL usp_post_comment(?, ?, ?)'; //댓글 입력
    
        try {
            const [epID] = await conn.query(epIDQuery, values); // Name, Ep 파라미터로 받아온 후
            const EpId = epID[0].map((row) => row.episodeID); // episodeID를 추출
    
            const [usID] = await conn.query(userIDQuery, user_email); // UserEmail 파라미터로 받아온 후
            const UsId = usID[0].map((row) => row.userID); // userID를 추출

            const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
                headers: { //헤더에
                    // Cookie: `token=${token}; KakaoToken=${ktoken}; `
                    Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
                },
            });

            if (Response.data === '토큰 인증 성공' || Response.data === '카카오 토큰 인증 성공') { //인증 성공일 때 댓글 달 수 있음
                await conn.query(insertQuery, [EpId, UsId, Content]); //episodeID, userID, content 입력 후 댓글 삽입
                res.send('댓글이 성공적으로 작성되었습니다.');  //응답
            } else { //토큰 인증 실패했을 때 
                res.status(401).send('로그인 하세요');
            }
        } catch (error) {
            // console.error(error);
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    
}
module.exports = commentAPI;
