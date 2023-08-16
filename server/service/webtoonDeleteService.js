const redisClient = require('../redis');
const { getConn } = require('../database');

const WebtoonDeleteService = {

    // 웹툰 삭제
    async deleteWebtoon(EnName) {
        const conn = await getConn();

        try {
            const webtoonQuery = 'CALL usp_delete_webtoon(?);';

            const [result] = await conn.query(webtoonQuery, EnName); 
            //redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${result[0][0].deleted_webtoonWeek}`);
            await redisClient.del(`webtoon_detail : ${result[0][0].deleted_webtoonID}`);
            await redisClient.del(`webtoon_list : ${result[0][0].deleted_webtoonID}`);
            await redisClient.del(`likes:${result[0][0].deleted_webtoonID}`);

            return "웹툰 삭제 성공";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    // 에피소드 삭제
    async deleteEpisode(EnName, ep) {
        const conn = await getConn();

        try {
            const value = [EnName, ep];
            const episodeQuery = 'CALL usp_delete_episode(?, ?);';

            const [result] = await conn.query(episodeQuery, value); 

            //redis 값 삭제
            await redisClient.del(`webtoon_detail : ${result[0][0].p_webtoonID}`);
            await redisClient.del(`webtoon_list : ${result[0][0].p_webtoonID}`);

            return "에피소드 삭제 성공";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
    
};

module.exports = WebtoonDeleteService;
