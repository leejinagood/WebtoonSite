const WebtoonAddService = require('../service/webtoonAddService');

const WebtoonAddController = {
    // 웹툰 추가
    async addWebtoon(req, res) {
        try {
            const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories } = req.body;
            const result = await WebtoonAddService.addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    // 에피소드 추가
    async addEpisode(req, res) {
        try {
            const { WebtoonEnName, count, thumbnail, ep } = req.body;
            const result = await WebtoonAddService.addEpisode(WebtoonEnName, count, thumbnail, ep);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonAddController;
