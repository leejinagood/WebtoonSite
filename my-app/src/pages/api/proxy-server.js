const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3002; // 프록시 서버의 포트 번호

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // 프론트엔드의 실제 출처로 바꿔주세요
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  }));
// CORS 정책 설정을 위한 미들웨어 추가
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 모든 도메인에서 요청 허용 (* 대신 특정 도메인을 지정할 수 있습니다)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// 웹툰 번역 API를 프록시하는 엔드포인트 설정
app.post('/api/translate', async (req, res) => {
  try {
    const { text } = req.body;

    // 웹툰 번역 API 엔드포인트 (실제 API 서버 주소)
    const apiUrl = '/v1/papago/n2mt';

    // API 요청을 위한 헤더 설정 (네이버 Papago API 인증 토큰을 여기에 추가하세요)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': 'kqrCOjlgYEGIkGxEJVN_',
      'X-Naver-Client-Secret': 'piUww9UVTL',
    };

    // API 서버로 데이터 전송
    const apiResponse = await axios.post(apiUrl, `source=ko&target=en&text=${encodeURIComponent(text)}`, { headers });

    // API 응답 데이터를 클라이언트로 전송
    res.json(apiResponse.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
