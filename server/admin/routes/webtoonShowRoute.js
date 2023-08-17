const WebtoonShowController = require('../controllers/webtoonShowController');

module.exports = (server) => {
    // 웹툰 전체 정보
    server.get('/api/adminWebtoon', WebtoonShowController.getWebtoon);
    // 웹툰 에피소드 
    server.get('/api/adminWebtoonlist', WebtoonShowController.getWebtoonList);
};
