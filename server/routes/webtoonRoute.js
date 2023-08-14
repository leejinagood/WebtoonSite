const WebtoonController = require('../controllers/webtoonController');

module.exports = (server) => {
  server.get('/api/webtoons', WebtoonController.getWebtoons);
  server.get('/api/search', WebtoonController.searchWebtoon);
  server.get('/api/category', WebtoonController.searchByCategory);
};
