const LikeController = require('../controllers/likeController');

module.exports = (server) => {
    server.get('/api/show_like', LikeController.viewLike);
    server.put('/api/update_like', LikeController.insertLike);
};
