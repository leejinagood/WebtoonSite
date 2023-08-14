const WebtoonListModel = require('../models/webtoonListModel');

const WebtoonListController = {
    async getWebtoonDetail(req, res) {
        try {
            const { ID } = req.query;
            const webtoonDetail = await WebtoonListModel.getWebtoonDetail(ID);
            res.send(webtoonDetail);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
  },

    async getWebtoonList(req, res) {
        try {
            const { ID } = req.query;
            const webtoonList = await WebtoonListModel.getWebtoonList(ID);
            res.send(webtoonList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    async getWebtoonPage(req, res) {
        try {
            const { ID, ep } = req.query;
            const webtoonPage = await WebtoonListModel.getWebtoonPage(ID, ep);
            res.send(webtoonPage);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonListController;
