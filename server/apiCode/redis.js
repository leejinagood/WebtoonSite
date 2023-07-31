// redisApi.js

const redis = require('redis');

//redis 클라이언트 초기화
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: "6379",
  db: "0"
});

//redis 클라이언트 연결
redisClient.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('연결 됨');
  }
});

module.exports = redisClient;
