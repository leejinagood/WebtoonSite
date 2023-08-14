const WebtoonDeleteService = require('../service/webtoonDeleteService');

const WebtoonDeleteController = {
    async deleteWebtoon(req, res) {
        try {
            const { EnName } = req.body;
            await WebtoonDeleteService.deleteWebtoon(EnName);
            res.send("삭제 성공");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    async deleteEpisode(req, res) {
        try {
            const { EnName, ep } = req.body;
            await WebtoonDeleteService.deleteEpisode( EnName, ep);
            res.send(ep+"화 삭제 성공");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonDeleteController;
