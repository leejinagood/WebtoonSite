export default function isAdmin(req, res, next) {
    const userEmail = req.cookies.userEmail; // 쿠키에서 사용자 이메일 가져오기
    if (userEmail === 'qkaejwnj@naver.com') { // 관리자 이메일
      next(); // 다음 미들웨어로 이동
    } else {
      res.status(403).send('Forbidden'); // 접근 금지
    }
  }