const WebtoonListController = require('../controllers/webtoonListController');

module.exports = (server) => {
    // 웹툰 디테일 (웹툰 페이지의 상단 부분)
    server.get('/api/webtoondetail', WebtoonListController.getWebtoonDetail);
    // 웹툰 리스트 (웹툰 페이지의 하단 리스트 부분)
    server.get('/api/webtoonlist', WebtoonListController.getWebtoonList);
    // 웹툰 페이지 (에피소드당 웹툰 이미지 및 댓글)
    server.get('/api/webtoonpage', WebtoonListController.getWebtoonPage);
};
