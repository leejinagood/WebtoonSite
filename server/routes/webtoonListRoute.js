const WebtoonListController = require('../controllers/webtoonListController');

module.exports = (server) => {
  server.get('/api/webtoondetail', WebtoonListController.getWebtoonDetail);
  server.get('/api/webtoonlist', WebtoonListController.getWebtoonList);
  server.get('/api/webtoonpage', WebtoonListController.getWebtoonPage);
};
