const UserController = require('../controllers/userController');

module.exports = (server) => {
    server.post('/api/SignUpPage', UserController.signUp);
    server.get('/api/LoginPage', UserController.login);
    server.get('/api/Kakao', UserController.kakaoLogin);
    server.get('/api/Token', UserController.verifyToken);
    server.post('/api/logout', UserController.logout);
};
