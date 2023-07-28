// redisApi.js

const redis = require('redis');

//Redis 클라이언트 초기화
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: "6379",
  db: "0"
});

// Redis 클라이언트 연결
redisClient.connect((err) => {
  if (err) {
    console.error('Redis 연결 오류:', err);
  } else {
    console.log('Redis에 연결되었습니다.');
  }
});

module.exports = redisClient;
