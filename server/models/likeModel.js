// const redisClient = require('../redis');
// const { getConn } = require('../database');

// const LikeModel = {
//   async showLikes(id) {
//     try {
//       const key = `likes:${id}`;
//       const value = await redisClient.get(key);
//       if (value !== null) {
//         return JSON.parse(value); // 파싱하여 JSON 객체로 변환하여 반환
//       } else {
//         return { message: '좋아요 오류' };
//       }
//     } catch (error) {
//       throw error;
//     }
//   },

//   async updateLike(userID, EnName) {
//     const conn = await getConn();
//     try {
//       // 사용자의 좋아요 상태를 먼저 확인
//       const [date] = await conn.query('CALL usp_get_likes_by_email(?, ?)', [userID, EnName]);
//       const [resultArray] = date;

//       const [Result] = await conn.query('CALL usp_put_likes(?, ?)', [userID, EnName]);
      
//       if (Result.affectedRows > 0) {
//         const likeKey = `likes:${resultArray[0].webtoonID}`;
//         const newLikes = resultArray[0].likes;
        
//         // 이미 눌러 true이면 1 빼고 false이면 1 증가
//         const redisOperation = newLikes ? 'DECRBY' : 'INCRBY';
//         await redisClient[redisOperation](likeKey, 1);
        
//         return "좋아요 수정";
//       } else {
//         return '좋아요 오류';
//       }
//     } catch (error) {
//       throw error;
//     } finally {
//       conn.release();
//     }
//   }
// };

// module.exports = LikeModel;
