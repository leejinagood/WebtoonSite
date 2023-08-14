const LikeController = require('../controllers/likeController');

module.exports = (server) => {
    // 좋아요 조회
    server.get('/api/show_like', LikeController.viewLike);
    // 좋아요 수정(추가, 삭제)
    server.put('/api/update_like', LikeController.insertLike);
};
