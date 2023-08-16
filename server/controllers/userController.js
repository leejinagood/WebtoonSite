const UserService = require('../service/userService');

const UserController = {

    // 회원가입
    async signUp(req, res) {
        try {
            const { email, pass, name, age } = req.body;
            if(!email || !pass || !name){
                throw new Error('내용을 입력하세요');
            }else{
                const resultMessage = await UserService.signUp(email, pass, name, age);
                res.send(resultMessage);
            } 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '회원가입 오류' });
        }
    },


    // 로그인
    async login(req, res) {
        try {
            const { ID, password } = req.query;

            if(!ID || !password){
                throw new Error('내용을 입력하세요');
            }else{
                const token = await UserService.login(ID, password, res);

                res.setHeader('Set-Cookie', [
                    `token=${token}; Path=/; SameSite=Lax;`, // 쿠키 설정
                ]);

                res.send({ token });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '로그인 실패' });
        }
    },


    // 카카오 로그인
    async kakaoLogin(req, res) {
        try {
            const { code } = req.query;
            if(!code || !password){
                throw new Error('카카오 로그인 에러');
            }else{
                const token = await UserService.kakaoLogin(code, res);

                res.setHeader('Set-Cookie', [
                    `token=${token}; Path=/; SameSite=Lax;`, // 쿠키 설정
                ]);

                res.writeHead(302, {
                    'Location': 'http://localhost:3000',
                    'Content-Type': 'text/plain'
                });
                res.end('Redirecting to http://localhost:3000');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '카카오 로그인 실패' });
        }
    },


    // 토큰 검증
    async verifyToken(req, res) {
        try {
            const cookies = req.headers.cookie;
            const resultMessage = await UserService.verifyToken(cookies);
            res.send(resultMessage);
        } catch (error) {
            console.error(error);
            res.json({ message: '토큰 인증 실패' });
        }
    },

    
    // 로그아웃
    async logout(req, res) {
        try {
            const resultMessage = await UserService.logout();
            res.setHeader('Set-Cookie', [`token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`]);
            res.send(resultMessage);
        } catch (error) {
            console.error('카카오 로그아웃 실패:', error.message);
            res.status(500).json({ message: '서버 오류' });
        }
    }

};

module.exports = UserController;
