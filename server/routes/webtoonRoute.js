const WebtoonController = require('../controllers/webtoonController');

module.exports = (server) => {
    // 웹툰 정보
    server.get('/api/webtoons', WebtoonController.getWebtoons);
    // 웹툰 검색
    server.get('/api/search', WebtoonController.searchWebtoon);
    // 카테코리 선택
    server.get('/api/category', WebtoonController.searchByCategory);
};
