const axios = require('axios');
const CommentService = require('../service/commentService');

const CommentController = {

    // 댓글 보기
    async viewComment(req, res) {
        try {
            const { EnName, ep } = req.query; // 클라이언트에서 쿼리 파라미터 추출
            const comments = await CommentService.viewComment(EnName, ep); // viewComment 호출

            res.send(comments); // 댓글 내용들
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

            const tokenResponse = await axios.get('http://3.37.36.238:4000/api/Token', {
                headers: {
                    Cookie: req.headers.cookie,
                },
            });

            // 유효성 검사
            if(!content){
                res.send(400, { message: '내용을 입력하세요' });
                throw new Error('내용을 입력하세요');
            }else{
                const resultMessage = await CommentService.insertComment(Ep, WebEnName, userID, content);
                res.send(resultMessage); //'댓글이 성공적으로 작성되었습니다.'
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
    
};

module.exports = CommentController;
