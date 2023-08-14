const WebtoonAddController = require('../controllers/webtoonAddController');

module.exports = (server) => {
    server.post('/api/webtoonAdd', WebtoonAddController.addWebtoon);
    server.post('/api/episodeAdd', WebtoonAddController.addEpisode);
};
