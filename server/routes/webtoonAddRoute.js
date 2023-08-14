const WebtoonAddController = require('../controllers/webtoonAddController');

module.exports = (server) => {
    // 웹툰 추가
    server.post('/api/webtoonAdd', WebtoonAddController.addWebtoon);
    // 에피소드 추가
    server.post('/api/episodeAdd', WebtoonAddController.addEpisode);
};
