const LikeService = require('../service/likeService');
const axios = require('axios');


const LikeController = {
    async viewLike(req, res) {
        try {
            const { id } = req.query;
    
            const like = await LikeService.viewLike(id);
    
            res.send(like);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: '서버 오류' });
        }
      },
    

  async insertLike(req, res) {
    try {
        const userID = req.body.userID;
        const { EnName } = req.body; 

        const tokenResponse = await axios.get('http://localhost:4000/api/Token', {
            headers: {
            Cookie: req.headers.cookie,
            },
        });

        if (tokenResponse.data === '토큰 인증 성공') {
            await LikeService.insertLike(userID, EnName);

            res.send("좋아요 수정");
        } else {
            res.json({ message: '로그인 하세요' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
}};

module.exports = LikeController;
