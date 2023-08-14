const WebtoonListService = require('../service/webtoonListService');

const WebtoonListController = {
    // 웹툰 디테일
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

    // 웹툰 리스트
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

    //웹툰 페이지
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
