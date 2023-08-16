const axios = require('axios');
const CommentService = require('../service/commentService');

const CommentController = {

    // 댓글 보기
    async viewComment(req, res) {
        try {
            const { EnName, ep } = req.query; // 클라이언트에서 쿼리 파라미터 추출
            const comments = await CommentService.viewComment(EnName, ep); // viewComment 호출

            res.send(comments); // 조회한 정보를 클라이언트에 전달
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },


    // 댓글 삽입 
    async insertComment(req, res) {
        try {
            const userID = req.body.userID;
            const { Ep, WebEnName, content } = req.body;

            const tokenResponse = await axios.get('http://localhost:4000/api/Token', {
                headers: {
                    Cookie: req.headers.cookie,
                },
            });

        if (tokenResponse.data === '토큰 인증 성공') {

            if(!content){
                throw new Error('내용을 입력하세요');
            }else{
                const resultMessage = await CommentService.insertComment(Ep, WebEnName, userID, content);
                // 댓글이 성공적으로 작성되었습니다.
                res.send(resultMessage);
            }
        } else {
            res.json({ message: '로그인 하세요' });
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
    
};

module.exports = CommentController;
