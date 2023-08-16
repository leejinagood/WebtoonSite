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
                return value; // 반환 값으로 변경
            } else {
                return { message: "좋아요 오류"}; // 반환 값으로 변경
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
            const Query ='call usp_get_likes_by_email(?, ?)' //좋아요 했는지 안 했는지
            const LikeQuery = 'CALL usp_put_likes(?, ?);'; // 좋아요를 수정하는 sp (추가)

            const [date] = await conn.query(Query, values); // 좋아요 했는지 안 했는지

            //[ { likes: 1, webtoonWeek: 'satur', webtoonID: 2 } ]
            const [resultArray] = date;
            
            const [Result] = await conn.query(LikeQuery, values); // 좋아요 추가
        
            if (Result.affectedRows > 0) { // 1개 이상이면 좋아요 수정 성공
                const likeKey = `likes:${resultArray[0].webtoonID}`; // Redis 고유 키 값
                const newLikes = resultArray[0].likes;
        
                //이미 눌러 true이면 1 빼고 false이면 1 증가
                const redisOperation = newLikes ? 'DECRBY' : 'INCRBY';
                await redisClient[redisOperation](likeKey, 1);
        
            }
            return '좋아요 수정';
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = LikeService;
