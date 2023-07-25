//User_Table에서 사용할 수 있는 api

const userAPI = (server, getConn) => {

  const jwt = require('jsonwebtoken'); //jwt
  const bcrypt = require('bcrypt'); //암호화
  const axios = require('axios'); 

  // 회원가입 메서드
    server.post('/api/SignUpPage', async (req, res) => {
      const conn = await getConn();
      const { email, pass, name, age } = req.body;
      const saltRounds = 10; // 솔트 생성에 사용되는 라운드 수

      try {
        // 트랜잭션 시작
        await conn.beginTransaction(); 

        //bcrypt.hash()로 비밀번호 암호화 
        const hashedPassword = await bcrypt.hash(pass, saltRounds);

        const query = 'INSERT INTO UserTable (userEmail, userPassword, userName, userAge) VALUES (?, ?, ?, ?);';
        const value = [email, hashedPassword, name, age];
        //쿼리에 비밀번호 암호화된 내용으로 삽입
        await conn.query(query, value);

        //삽입된 회원의 정보를 이메일을 통해 조회하여 가져옴
        const selectUserId = 'SELECT userID FROM UserTable WHERE userEmail = ?;';
        const [selectResult] = await conn.query(selectUserId, [email]);
        //userID 를 추출
        const userId = selectResult[0]?.userID;

        if (userId) { //userId가 있으면 모든 Webtoon_Id에 대한 likes 를 초기화하는 프로시저 호출
          const callProc = 'CALL usp_basic_like(?);';
          await conn.query(callProc, [userId]);
        }

        await conn.commit(); // 트랜잭션 커밋
        res.send('입력 성공');
      } catch (error) {
        console.error(error);
        await conn.rollback(); // 트랜잭션 롤백
        res.status(500).json('입력 실패');
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

      const { userPassword } = selectUserResult[0];
      //입력한 비밀번호와 db에 저장된 비밀번호 일치하는지 
      const isMatch = await bcrypt.compare(password, userPassword);

      if (isMatch) {
        // 비밀번호 일치
        let token = "";
        //jwt 회원 정보를 받은 후 토큰을 생성
        token = jwt.sign(
          { UserId: selectUserResult[0].userID, UserEmail: selectUserResult[0].userEmail },
          'your-secret-key', // 비밀키
          { expiresIn: '1m' } // 토큰 만료 시간 30분 설정
        );
        
        // 쿠키로 헤더에 데이터를 담아 응답 보내기
        res.setHeader('Set-Cookie', [
          `userName=${selectUserResult[0].userName}`,
          `userEmail=${selectUserResult[0].userEmail}`,
          `token=${token}`
        ]);

        // 요기봐야함 솔빈 <- 궁금한 거 여쭤보셔요^_^
        // 유저 닉네임과 유저 이메일, 토큰을 응답으로
        res.send({
          userName: selectUserResult[0].userName,
          userEmail: selectUserResult[0].userEmail,
          token: token
        });
        //디버깅용 콘솔 출력
        //console.log(selectUserResult[0].userName,selectUserResult[0].userEmail, token);
      } else {
        // 비밀번호 불일치 응답을 "" 로
        res.send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('로그인 실패');
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
          redirect_uri: 'http://192.168.0.98:4000/api/Kakao',
          code,
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
      const nickname = userResponse.data.kakao_account.profile.nickname;
      const email = userResponse.data.kakao_account.email;

      const cookieData = {
        userName: nickname, // 이름
        userEmail: email, // 이메일
        token: Token // 토큰
      };
    
      //한글과 기호가 포함되어 있기 때문에 쿠키로 보내기전 인코딩 해야 돰
      const enNickname = encodeURIComponent(nickname);
      const enEmail = encodeURIComponent(email);
      const enToken = encodeURIComponent(Token);

      // 쿠키에 저장하도록 배열로 
      const cookieValue = [
        `KakaoToken=${enToken}`,
        `userName=${enNickname}`,
        `userEmail=${enEmail}`
      ];

      // 쿠키에 저장
      res.header('Set-Cookie', cookieValue);

      //email과 동일한 행이 존재하는지
      const selectQuery = "select userEmail from UserTable where userEmail = ?;";
      const [Result] = await conn.query(selectQuery, [email]);
      
      // 사용자 정보가 없으면 회원가입 및 좋아요 초기화
      if (Result.length === 0) {
        const insertQuery = 'INSERT INTO UserTable (userEmail, userPassword, userName) VALUES (?, "", ?);';
        const values = [email, nickname];
        await conn.query(insertQuery, values);
        
        // user 이메일을
        const userEmail = [email];
        // 아래 sp에 넣어서 나온 ID 값을 
        const selectIdQuery = "CALL usp_get_userID(?);";
        const [ID] = await conn.query(selectIdQuery, userEmail);
  
        // 배열의 첫 번째 요소만 추출
        const userID = ID[0][0].userID;
        // 회원가입시 모든 웹툰에 대한 좋아요를 초기화
        const likeQuery = 'CALL usp_basic_like(?)';
        await conn.query(likeQuery, [userID]);
      }

      //응답으로 닉네임과 이메일과 토큰 전송
      res.json(cookieData);

      // //리다이렉트 코드
      // res.writeHead(302, {
      //   'Location': 'http://localhost:3000',
      //   'Content-Type': 'text/plain'
      // });
      // res.end('Redirecting to http://localhost:3000');

    } catch (error) {
      // console.error(error);
      res.status(500).json('카카오 로그인 실패');
    }
  });
  

  // 쿠키에서 토큰 추출하는 함수
  function DelisousCookie(cookies) {
    if (typeof cookies === 'string') {
        const cookieA = cookies.split(';');
        const tokenCookie = cookieA.find(cookie => cookie.trim().startsWith('token=')); //토큰부분만 빼내기
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            //토큰만 추출하여 return
            return token.trim();
        }
    }
    return null;
  }

  // 쿠키에서 카카오 토큰 추출하는 함수 (동일한 방식으로 수정)
  function KakaoCookie(cookies) {
    if (typeof cookies === 'string') {
        const cookieA = cookies.split(';');
        const tokenCookie = cookieA.find(cookie => cookie.trim().startsWith('KakaoToken=')); //토큰부분만 빼내기
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            //토큰만 추출하여 return
            return token.trim();
        }
    }
    return null;
  }


  // 토큰이 유효한지 검증하는 api 추가 필요
  // 토큰 검증 api
  server.get('/api/Token', async (req, res) => {
    // 클라이언트에서 전달된 쿠키 가져오기
    const cookies = req.headers.cookie;
    if (cookies) {
      // 쿠키가 존재하는 경우 처리
      const token = DelisousCookie(cookies); // 쿠키에서 토큰 추출
      const Ktoken = KakaoCookie(cookies); // 쿠키에서 카카오 토큰 추출
      if (Ktoken) {//카카오 토큰이 있을 경우 
        const response = await axios.get('https://kapi.kakao.com/v1/user/access_token_info', {
          headers: {
            Authorization: `Bearer ${Ktoken}`,
          },
        });
        // console.log(response);
        //토큰 인증이 성공하면 응답
        res.send('토큰 인증 성공');
      } else if(token){  //
        try {
          // verify가 만료됐는지 확인
          jwt.verify(token, 'your-secret-key');
          // 토큰이 유효한 경우
          // const userID = TokenA.userID;
          res.send('토큰 인증 성공');
        } catch (error) {
          // 토큰이 유효하지 않은 경우
          res.status(401).send('토큰 인증 실패');
        }
      } else {
        // 토큰이 없는 경우 처리
        res.status(401).send('쿠키에 토큰이 없음');
      }
    } else {
      // 쿠키가 없는 경우 처리
      res.status(401).send('쿠키 없음');
    }
  });

}
module.exports = userAPI;