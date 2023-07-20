//User_Table에서 사용할 수 있는 api

const userAPI = (server, getConn) => {

  const jwt = require('jsonwebtoken'); //jwt
  const bcrypt = require('bcrypt'); //암호화

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
          { expiresIn: '1h' } // 토큰 만료 시간 1시간 설정
        );
        //토큰을 응답으로 디버깅
        // 쿠키에 데이터를 담아 응답 보내기
        res.setHeader('Set-Cookie', [
          `userName=${selectUserResult[0].userName}`,
          `userEmail=${selectUserResult[0].userEmail}`,
          `token=${token}`
        ]);
        // 요기봐야함 솔빈
        // 유저 닉네임과 유저 이메일, 토큰을 응답으로
        res.send({
          userName: selectUserResult[0].userName,
          userEmail: selectUserResult[0].userEmail,
          token: token
        });
        
        console.log(selectUserResult[0].userName,selectUserResult[0].userEmail, token);
      } else {
        // 비밀번호 불일치
        res.send();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json('로그인 실패');
    } finally {
      conn.release();
    } 
  });


  // 쿠키에서 토큰 추출하는 함수
  function extractTokenFromCookies(cookies) {
    const cookieArr = cookies.split(';');
    const tokenCookie = cookieArr.find(cookie => cookie.trim().startsWith('token='));
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
      const token = extractTokenFromCookies(cookies); // 쿠키에서 토큰 추출

      try {
        const decodedToken = jwt.verify(token, 'your-secret-key');
        // 토큰이 유효한 경우
        const userID = decodedToken.userID;
        res.send('토큰 인증 성공');
      } catch (error) {
        // 토큰이 유효하지 않은 경우
        res.status(401).send('토큰 인증 실패');
      }
    } else {
      // 쿠키가 없는 경우 처리
      res.status(401).send('쿠키 없음');
    }
  });

}

module.exports = userAPI;