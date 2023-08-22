const LikeService = require('../service/likeService');
const axios = require('axios');


const LikeController = {

    // 좋아요 보기
    async viewLike(req, res) {
        try {
            const { id } = req.query; // 웹툰 아이디 
    
            const like = await LikeService.viewLike(id);
            res.send(like); // 좋아요 갯수
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: '서버 오류' });
        }
    },
    

    // 좋아요 수정
    async insertLike(req, res) {
        try {
            const userID = req.body.userID;
            const { EnName } = req.body; 

            const tokenResponse = await axios.get('http://3.39.187.19:4000/api/Token', {
                headers: {
                Cookie: req.headers.cookie,
                },
            });

            if (tokenResponse.data === '토큰 인증 성공') {
                if(!EnName || !userID){
                    res.send(400, { message: '좋아요 에러' });
                    throw new Error('좋아요 에러');
                }else{
                    const resultMessage = await LikeService.insertLike(userID, EnName);
                    res.send(resultMessage); // '좋아요 수정 성공'
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

module.exports = LikeController;
