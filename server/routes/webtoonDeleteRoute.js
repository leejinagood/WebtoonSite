const WebtoonDeleteController = require('../controllers/webtoonDeleteController');

module.exports = (server) => {
  server.del('/api/webtoonDelete', WebtoonDeleteController.deleteWebtoon);
  server.del('/api/episodeDelete', WebtoonDeleteController.deleteEpisode);
};
