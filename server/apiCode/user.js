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
          { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
        );
        //토큰을 응답으로 디버깅
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

  require('dotenv').config(); // dotenv 로드
  const Id = process.env.CLIENT_ID; // 환경 변수로부터 클라이언트 아이디 가져오기
  const Secret = process.env.CLIENT_SECRET; // 환경 변수로부터 클라이언트 시크릿 키 가져오기

  //카카오 로그인 
  server.get('/api/Kakao', async (req, res) => {
    const conn = await getConn();
    const { code } = req.query; // 클라이언트에서 받은 카카오 인증 코드

    try {
      const header = {'Content-Type': 'application/x-www-form-urlencoded'}

      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',header,
        {
          grant_type: 'authorization_code',
          client_id: Id, // 환경 변수를 사용하여 클라이언트 아이디 참조
          client_secret: Secret, // 환경 변수를 사용하여 클라이언트 시크릿 키 참조
          redirect_uri: 'http://localhost:3000',
          code,
        }
      );
      const Token = response.data.access_token; // 카카오 서버로부터 받은 토큰

       // 카카오 서버에 사용자 정보 요청
       const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${Token}`, 
        },
      });

      console.log(Token);
    
      // console.log(userResponse.data); // 사용자 정보 확인

      // 사용자 정보 추출
      // const { id, kakao_account } = Response.data;
      // const { email, nickname } = kakao_account;
      

      res.send('카카오 로그인 성공');
    } catch (error) {
      console.error(error);
      res.status(500).json('카카오 로그인 실패');
    }
  });



  // //카카오 로그인
  // server.get('/api/Kakao', async (req, res) => {
  //   const conn = await getConn();
  //   const { code } = req.query; // 클라이언트에서 받은 카카오 인증 코드
  
  //   try {
  //     // 카카오 인증 정보 받아오기
  //     try {
  //       const response = await axios.post('https://kauth.kakao.com/oauth/authorize', {
  //         grant_type: 'authorization_code',
  //         client_id: '6298e4ccbcce464caa91f6a4a0e9c7a3',
  //         redirect_uri: 'http://localhost:3000',
  //         code: code
  //       });
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  
  //     const { access_token } = response.data;
  //     // access_token으로 카카오 사용자 정보 받아오기
  //     const Response = await axios.get('https://kapi.kakao.com/v2/user/me', {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`
  //       }
  //     });

  //     const { id, kakao_account } = Response.data;
  //     const { email, nickname } = kakao_account;
  
  //     // 이메일을 기준으로 사용자 정보 조회
  //     const selectQuery = 'SELECT * FROM UserTable WHERE userEmail = ?;';
  //     const [Result] = await conn.query(selectQuery, [email]);
  
  //     if (Result.length === 0) {
  //       // 사용자 정보가 없으면 새로운 회원으로 가입
  //       const insertQuery = 'INSERT INTO UserTable (userEmail, userPassword, userName) VALUES (?, ?, ?);';
  //       const Password = await bcrypt.hash(id, saltRounds); // 카카오 ID를 사용하여 비밀번호 암호화
  //       const values = [email, Password, nickname];
  //       await conn.query(insertQuery, values);
  //     }
  
  //     // 토큰 생성
  //     const token = jwt.sign(
  //       { UserId: id, UserEmail: email },
  //       'your-secret-key', // 비밀키
  //       { expiresIn: '30m' } // 토큰 만료 시간 30분 설정
  //     );
  
  //     // 쿠키로 토큰과 사용자 정보를 응답 보내기
  //     res.setHeader('Set-Cookie', [
  //       `userName=${nickname}`,
  //       `userEmail=${email}`,
  //       `token=${token}`
  //     ]);
  
  //     // 유저 닉네임과 유저 이메일, 토큰을 응답으로
  //     res.send({
  //       userName: nickname,
  //       userEmail: email,
  //       token: token
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json('로그인 실패');
  //   } finally {
  //     conn.release();
  //   }
  // });
  


  // 쿠키에서 토큰 추출하는 함수
  function DelisousCookie(cookies) {
    const cookieA = cookies.split(';');
    const tokenCookie = cookieA.find(cookie => cookie.trim().startsWith('token=')); //토큰부분만 빼내기
    if (tokenCookie) {
      const token = tokenCookie.split('=')[1];
      //토큰만 추출하여 return
      return token.trim();
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
  
      if (token) {
        try {
          // verify가 만료됐는지 확인
          const TokenA = jwt.verify(token, 'your-secret-key');
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