const redisClient = require('../redis');
const { getConn } = require('../database');

const WebtoonDeleteService = {
    async deleteWebtoon(EnName) {
        const conn = await getConn();

        try {
            const webtoonQuery = 'CALL usp_delete_webtoon(?);';

            if(!EnName){
            throw new Error('내용을 입력하세요');
        }

        const [result] = await conn.query(webtoonQuery, EnName); 
        //redis 값 삭제
        await redisClient.del('webtoon : All');
        await redisClient.del(`webtoon : ${result[0][0].deleted_webtoonWeek}`);
        await redisClient.del(`webtoon_detail : ${result[0][0].deleted_webtoonID}`);
        await redisClient.del(`webtoon_list : ${result[0][0].deleted_webtoonID}`);
        await redisClient.del(`likes:${result[0][0].deleted_webtoonID}`);

        return "웹툰 삭제";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    async deleteEpisode(EnName, ep) {
        const conn = await getConn();

        try {
            const value = [EnName, ep];
            const episodeQuery = 'CALL usp_delete_episode(?, ?);';

            if(!EnName || !ep){
            throw new Error('내용을 입력하세요');
        }

        const [result] = await conn.query(episodeQuery, value); 

        //redis 값 삭제
        await redisClient.del(`webtoon_detail : ${result[0][0].p_webtoonID}`);
        await redisClient.del(`webtoon_list : ${result[0][0].p_webtoonID}`);

        return "에피소드 삭제";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = WebtoonDeleteService;
