
const userAPI = (server, getConn) => {

    const jwt = require('jsonwebtoken'); //jwt
    const bcrypt = require('bcrypt'); //암호화
    const axios = require('axios'); 

    // 회원가입 메서드
    server.post('/api/SignUpPage', async (req, res) => {
        const conn = await getConn();
        const { email, pass, name, age } = req.body;
        const saltRounds = 10; // 솔트 생성에 사용되는 라운드 수

        // const valiEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // const valiPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        try {
            // // 유효성 검사
            // if (!valiEmail.test(email)) {
            //   res.status(400).json('이메일을 입력하세요');
            //   return;
            // }
            // if (!valiPass.test(pass)) {
            //     res.status(400).json('6자리 이상 입력하세요.');
            //     return;
            // }
            // if (!name) {
            //     res.status(400).json('이름을 입력해주세요');
            //     return;
            // }

            // 트랜잭션 시작
            await conn.beginTransaction(); 

            //bcrypt.hash()로 비밀번호 암호화 
            const hashedPassword = await bcrypt.hash(pass, saltRounds);

            const query = 'INSERT INTO UserTable (userEmail, userPassword, userName, userAge) VALUES (?, ?, ?, ?);';
            const result = [email, hashedPassword, name, age];
            //쿼리에 비밀번호 암호화된 내용으로 삽입
            await conn.query(query, result);

            await conn.commit(); // 트랜잭션 커밋
            res.send('입력 성공');
        } catch (error) {
            console.error(error);
            await conn.rollback(); // 트랜잭션 롤백
            res.status(500).json({ message: '회원가입 오류' });
        } finally {
            conn.release();
        }
    });


    // 로그인 메서드
    server.get('/api/LoginPage', async (req, res) => {
        const conn = await getConn();
        const { ID, password } = req.query;
        try {
            // 아이디가 있는지 확인
            const selectQuery = 'SELECT * FROM UserTable WHERE userEmail = ?;';

            //아이디에 맞는 row를 selectUserResult 배열 변수에 저장
            const [selectUserResult] = await conn.query(selectQuery, [ID]);
            
            // 회원 정보가 없는 경우 
            if (selectUserResult.length === 0) {
                res.send('아이디가 없습니다');
                return;
            }

            const UserID = await conn.query(selectQuery, [ID]);

            const { userPassword } = selectUserResult[0];
            //입력한 비밀번호와 db에 저장된 비밀번호 일치하는지 
            const isMatch = await bcrypt.compare(password, userPassword);

            if (isMatch) {
                // 비밀번호 일치
                
                const enNickname = encodeURIComponent(selectUserResult[0].userName);
                const enEmail = encodeURIComponent(selectUserResult[0].userEmail);

                let token = "";
                //jwt 회원 정보를 받은 후 토큰을 생성
                token = jwt.sign(
                    {
                        UserName: enNickname,
                        UserEmail: enEmail,
                        UserID: UserID[0][0].userID 
                    },
                    'your-secret-key', // 비밀키
                    { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
                );

                res.setHeader('Set-Cookie', [
                    `token=${token}; Path=/`
                  ], {
                    sameSite: 'lax',
                    domain: 'localhost',
                    httpOnly: false
                  });

                res.send({
                    token: token
                });

            } else {
                // 비밀번호 불일치 응답을 "" 로
                res.json({ message: "비밀번호 불일치"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '로그인 실패' });
        } finally {
            conn.release();
        } 
    });


    require('dotenv').config(); // .env 접근
    const querystring = require('querystring');
    const Id = process.env.CLIENT_ID; // 환경 변수에서 클라이언트 아이디
    const Secret = process.env.CLIENT_SECRET; // 환경 변수에서 클라이언트 시크릿 키 


    //카카오 로그인 
    server.get('/api/Kakao', async (req, res) => {

        const { code } = req.query; // 클라이언트에서 받은 카카오 인증 코드

        const conn = await getConn();
        try {
            const header = { 'Content-Type': 'application/x-www-form-urlencoded' }; //헤더정보, 인코딩 하라는 뜻임

            const response = await axios.post( //카카오 서버에 post로 요청을 보냄. 토큰을 발급받기 위함임.
                'https://kauth.kakao.com/oauth/token', //카카오 인증 서버 주소
                {
                    grant_type: 'authorization_code', //인가코드 받기 위한
                    client_id: Id, // 클라이언트 아이디 
                    client_secret: Secret, // 클라이언트 시크릿 키 
                    redirect_uri: 'http://localhost:4000/api/Kakao',
                    code, //인가코드도 함께 보내야 됨
                },
                { headers: header } //헤더정보 추가
            );

            const Token = response.data.access_token; // 카카오 서버로부터 받은 토큰

            // 카카오 서버에 사용자 정보 요청
            const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', { //인증된 사용자 정보를 얻기 위해 get으로 사용자 정보를 요청보냄
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });

            // userResponse에서 정보 추출
            let sub = userResponse.data.id;
            const nickname = userResponse.data.kakao_account.profile.nickname;
            const email = userResponse.data.kakao_account.email;

            //한글과 기호가 포함되어 있기 때문에 쿠키로 보내기전 인코딩 해야됨
            const enNickname = encodeURIComponent(nickname);
            const enEmail = encodeURIComponent(email);

            let token = "";
            //jwt 토큰을 생성
            token = jwt.sign(
                {
                    UserEmail: enEmail,
                    UserID: sub,
                    UserName: enNickname
                },
                'your-secret-key', // 비밀 키
                { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
            );

            // 쿠키에 저장하여 보내기
            res.setHeader('Set-Cookie', [
                `token=${token}; Path=/`,
              ], {
                sameSite: 'lax',
                domain: 'localhost',
                httpOnly: false
            });

            //회원가입 로직
            const selectQuery = "select userEmail from UserTable where userEmail = ?;";
            const [Result] = await conn.query(selectQuery, [email]);

            // 사용자 정보가 없으면 회원가입
            if (Result.length === 0) {
                const insertQuery = 'INSERT INTO UserTable (userEmail, userPassword, userName, userID) VALUES (?, "", ?, ?);';
                const insertValue = [email, nickname, sub];
                await conn.query(insertQuery, insertValue);
            }
        
            //리다리엑트는 기본적으로 쿠키를 함께 보냄 같은 도메인이면 저장됨. 이를 쿠키의 동작 방식으로 도메인 기반 쿠키 라고 함
            res.writeHead(302, { //상태는 302
                'Location': 'http://localhost:3000', //주소
                'Content-Type': 'text/plain'
            });
            res.end('Redirecting to http://localhost:3000');

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '카카오 로그인 실패' });
        }   
    });


    // 쿠키에서 토큰 추출하는 함수
    function DelisousCookie(cookies) { //cookies라는 매개변수를
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


    // 토큰 검증 api
    server.get('/api/Token', async (req, res) => {
        // 클라이언트에서 전달된 쿠키 가져오기
        const cookies = req.headers.cookie;
        if (cookies) {
            // 쿠키가 존재하는 경우 처리
            const token = DelisousCookie(cookies); // 쿠키에서 토큰 추출

            if (token) { // 일반 토큰이 있을 때 
                try {
                    // verify가 만료됐는지 확인하는 함수
                    jwt.verify(token, 'your-secret-key');

                    // 토큰이 유효한 경우
                    res.send('토큰 인증 성공');

                } catch (error) {
                    res.json({ message: "토큰 인증 실패"});
                }
            } 
            else {
                res.json({ message: "쿠키에 토큰이 없음"});
            }
        } else {
            console.error(error);
            res.json({ message: "쿠키 없음"});
        }
    });


    // 로그아웃 메서드
    server.post('/api/logout', async (req, res) => {
        try {
            // 쿠키 삭제
            res.setHeader('Set-Cookie', [
                `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
            ]);
            res.send('로그아웃 성공');
        } catch (error) {
            console.error('카카오 로그아웃 실패:', error.message);
            res.status(500).json({ message: '서버 오류' });
        }
    });

}
module.exports = userAPI;