const WebtoonService = require('../service/webtoonService');

const WebtoonController = {
    async getWebtoons(req, res) {
        try {
            const { pi_vch_condition } = req.query;
            const webtoons = await WebtoonService.getWebtoons(pi_vch_condition);
            res.send(webtoons);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    async searchWebtoon(req, res) {
        try {
            const { word } = req.query;
            const webtoon = await WebtoonService.searchWebtoon(word);
            res.send(webtoon);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    async searchByCategory(req, res) {
        try {
            const { word } = req.query;
            const webtoon = await WebtoonService.searchByCategory(word);
            res.send(webtoon);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonController;
