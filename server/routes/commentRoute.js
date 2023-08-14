const CommentController = require('../controllers/commentController');

module.exports = (server) => {
    // 댓글 조회
    server.get('/api/comment', CommentController.viewComment);
    // 댓글 입력
    server.post('/api/comment_insert', CommentController.insertComment);
};
