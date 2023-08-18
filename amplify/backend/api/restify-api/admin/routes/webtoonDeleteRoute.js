const WebtoonDeleteController = require('../controllers/webtoonDeleteController');

module.exports = (server) => {
    //웹툰 전체 삭제
    server.del('/api/webtoonDelete', WebtoonDeleteController.deleteWebtoon);
    // 에피소드 하나 삭제
    server.del('/api/episodeDelete', WebtoonDeleteController.deleteEpisode);
};
