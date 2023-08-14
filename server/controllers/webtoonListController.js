const WebtoonListService = require('../service/webtoonListService');

const WebtoonListController = {
    async getWebtoonDetail(req, res) {
        try {
            const { ID } = req.query;
            const webtoonDetail = await WebtoonListService.getWebtoonDetail(ID);
            res.send(webtoonDetail);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
  },

    async getWebtoonList(req, res) {
        try {
            const { ID } = req.query;
            const webtoonList = await WebtoonListService.getWebtoonList(ID);
            res.send(webtoonList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    async getWebtoonPage(req, res) {
        try {
            const { ID, ep } = req.query;
            const webtoonPage = await WebtoonListService.getWebtoonPage(ID, ep);
            res.send(webtoonPage);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonListController;
