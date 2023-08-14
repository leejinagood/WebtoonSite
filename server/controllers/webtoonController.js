const WebtoonModel = require('../models/webtoonModel');

const WebtoonController = {
  async getWebtoons(req, res) {
    try {
      const { pi_vch_condition } = req.query;
      const webtoons = await WebtoonModel.getWebtoons(pi_vch_condition);
      res.send(webtoons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  },

  async searchWebtoon(req, res) {
    try {
      const { word } = req.query;
      const webtoon = await WebtoonModel.searchWebtoon(word);
      res.send(webtoon);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  },

  async searchByCategory(req, res) {
    try {
      const { word } = req.query;
      const webtoon = await WebtoonModel.searchByCategory(word);
      res.send(webtoon);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  }
};

module.exports = WebtoonController;
