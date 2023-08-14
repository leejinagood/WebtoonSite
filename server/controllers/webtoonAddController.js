const WebtoonAddModel = require('../models/webtoonAddModel');

const WebtoonAddController = {
  async addWebtoon(req, res) {
    try {
      const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories } = req.body;
      const result = await WebtoonAddModel.addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  },

  async addEpisode(req, res) {
    try {
      const { WebtoonEnName, count, thumbnail, ep } = req.body;
      const result = await WebtoonAddModel.addEpisode(WebtoonEnName, count, thumbnail, ep);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: '서버 오류' });
    }
  }
};

module.exports = WebtoonAddController;
