const { getConn } = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// 쿠키값 빼내는 함수
function CookieAuth(cookies) { //cookies라는 매개변수를
    if (typeof cookies === 'string') { //문자열인지 확인
        const resultCookie = cookies.split(';'); //; 으로 나눔
        const tokenCookie = resultCookie.find(cookie => cookie.trim().startsWith('token=')); //토큰부분만 빼내기
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            //토큰만 추출
            return token.trim();    
        }
    }
    return null;
}

const UserService = {

    // 회원가입
    async signUp(email, pass, name, age) {
        const conn = await getConn();
        try {
            const saltRounds = 10;
            // 암호화된 비밀번호로
            const hashedPassword = await bcrypt.hash(pass, saltRounds);

            const query = 'INSERT INTO UserTable (userEmail, userPassword, userName, userAge) VALUES (?, ?, ?, ?);';
            await conn.query(query, [email, hashedPassword, name, age]);

            return '회원가입 성공';
        } catch (error) {
            throw error;
        } finally { 
            conn.release();
        }
    },


    // 로그인
    async login(ID, password) {
        const conn = await getConn();
        try {
            const selectQuery = 'SELECT * FROM UserTable WHERE userEmail = ?;';
            const [selectUserResult] = await conn.query(selectQuery, [ID]);
        
            if (selectUserResult.length === 0) {
                return '아이디가 없습니다';
            }
    
            const UserID = await conn.query(selectQuery, [ID]);
        
            const isMatch = await bcrypt.compare(password, selectUserResult[0].userPassword);
        
            if (isMatch) {
                const enNickname = encodeURIComponent(selectUserResult[0].userName);
                const enEmail = encodeURIComponent(selectUserResult[0].userEmail);
        
                const token = jwt.sign(
                {
                    UserName: enNickname,
                    UserEmail: enEmail,
                    UserID: UserID[0][0].userID 
                },
                'your-secret-key',
                { expiresIn: '1h' }
                );
        
                return token; // 토큰 반환
        
            } else {
                return '비밀번호 불일치';
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    // 카카오 로그인
    async kakaoLogin(code, res) {
        const conn = await getConn();
        try {
        const header = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            {
            grant_type: 'authorization_code',
            client_id: 'c3f27e51572a41e42f4204019b897192', // .env에서 값 읽어오기
            client_secret: 'caNhtDvsdnv2Bu4HJEo74EKXVR6e1zA6', // .env에서 값 읽어오기
            redirect_uri: 'http://localhost:4000/api/Kakao',
            code,
            },
            { headers: header }
        );
    
        // 엑세스 토큰
        const Token = response.data.access_token;
    
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
            Authorization: `Bearer ${Token}`,
            },
        });
    
        let sub = userResponse.data.id; // 회원 고유 키
        const nickname = userResponse.data.kakao_account.profile.nickname; // 회원 닉네임
        const email = userResponse.data.kakao_account.email; //회원 이메일
    
        // 인코딩
        const enNickname = encodeURIComponent(nickname);
        const enEmail = encodeURIComponent(email);
    
        const selectQuery = "select userEmail, userID from UserTable where userEmail = ?;";
        const [Result] = await conn.query(selectQuery, [email]);
    
        let ID = null;
    
        if (Result.length === 0) { //회원가입
            const insertQuery = 'INSERT INTO UserTable (userEmail, userPassword, userName, socialNumber) VALUES (?, "", ?, ?);';
            const insertValue = [email, nickname, sub];
            await conn.query(insertQuery, insertValue);
            const [id] = await conn.query(selectQuery, [email]);
            ID = id[0].userID
        } else if (Result.length > 0) { //회원이 이미 있을 때
            ID = Result[0].userID;
        }

        let = token = jwt.sign(
            {
                UserEmail: enEmail,
                UserID: ID,
                UserName: enNickname,
                Sub: sub
            },
            'your-secret-key',
            { expiresIn: '1h' }
        );
        
        return token; // 토큰 반환
        
        } catch (error) {
        throw error;
        } finally {
        conn.release();
        }
    },
    

    // 토큰 검증
    async verifyToken(cookies) {
        try {
            const token = CookieAuth(cookies);
            if (token) {
                jwt.verify(token, 'your-secret-key');
                return '토큰 인증 성공';
            } else {
                return '쿠키에 토큰이 없음';
            }
        } catch (error) {
            throw error;
        }
    },

    
    // 로그아웃
    async logout() {
        try {
            return '로그아웃 성공';
        } catch (error) {
            throw error;
        }
    }

};

module.exports = UserService;
