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

// redis에 데이터 저장
const set = (key, value) => {
  redisClient.set(key, JSON.stringify(value));
};

// 저장 된 데이터를 redis에서 가져오는 미들웨어
const get = (req, res, cacheKey, callback) => {
  redisClient.get(cacheKey, (error, data) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, JSON.parse(data));
    }
  });
};

module.exports = { set, get };
