const axios = require('axios');
const CommentModel = require('../models/commentModel');

const CommentController = {
    async viewComment(req, res) {
        try {
            const { EnName, ep } = req.query;
            const comments = await CommentModel.viewComment(EnName, ep);

            res.send(comments);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

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
            const resultMessage = await CommentModel.insertComment(Ep, WebEnName, userID, content);

            res.send(resultMessage);
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
