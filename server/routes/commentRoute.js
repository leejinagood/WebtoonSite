const CommentController = require('../controllers/commentController');

module.exports = (server) => {
    server.get('/api/comment', CommentController.viewComment);
    server.post('/api/comment_insert', CommentController.insertComment);
};
