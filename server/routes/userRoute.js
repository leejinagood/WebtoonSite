const UserController = require('../controllers/userController');

module.exports = (server) => {
    // 회원가입
    server.post('/api/SignUpPage', UserController.signUp);
    // 로그인
    server.get('/api/LoginPage', UserController.login);
    //카카오 소셜 로그인
    server.get('/api/Kakao', UserController.kakaoLogin);
    // 토큰 인증
    server.get('/api/Token', UserController.verifyToken);
    // 로그아웃
    server.post('/api/logout', UserController.logout);
};
