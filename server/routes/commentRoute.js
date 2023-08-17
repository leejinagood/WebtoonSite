const CommentController = require('../controllers/commentController');

module.exports = (server) => {
    // 댓글 조회
    server.get('/api/comment', CommentController.viewComment); //요청이 들어왔을 때 메서드 호출
    // 댓글 입력
    server.post('/api/comment_insert', CommentController.insertComment);
};
