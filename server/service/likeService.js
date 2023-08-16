const redisClient = require('../redis'); // redis.js 모듈을 가져옴
const { getConn } = require('../database');

const LikeService = {

    // 좋아요 보기
    async viewLike(id) {
        const conn = await getConn();
    
        try {
            const key = `likes:${id}`;
            const value = await redisClient.get(key);
            if (value !== null) {
                return value; 
            } else {
                return { message: "좋아요 오류"}; 
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    // 좋아요 수정 및 삽입
    async insertLike(userID, EnName) {
        const conn = await getConn();

        try {
            const values = [userID, EnName];
            const LikeQuery = 'Call usp_put_get_likes(?, ?);';

            const [result] = await conn.query(LikeQuery, values); 
            const [resultArray] = result;

            const likeKey = `likes:${resultArray[0].webtoonID}`; 
    
            // 이미 눌러 true이면 1 빼고 null이거나 false이면 1 증가
            const redisOperation = resultArray[0].likes ? 'DECRBY' : 'INCRBY';
            await redisClient[redisOperation](likeKey, 1);        

            return '좋아요 수정 성공';
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
    
};

module.exports = LikeService;
