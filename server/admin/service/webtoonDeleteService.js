const redisClient = require('../../redis');
const { getConn } = require('../../database');

const WebtoonDeleteService = {

    // 웹툰 삭제
    async deleteWebtoon(EnName) {
        const conn = await getConn();

        try {
            const webtoonQuery = 'CALL usp_delete_webtoon(?);';

            const [result] = await conn.query(webtoonQuery, EnName); 

            const keysDelete = [
                'webtoon : All',
                `webtoon : ${result[0][0].deleted_webtoonWeek}`,
                `webtoon_detail : ${result[0][0].deleted_webtoonID}`,
                `webtoon_list : ${result[0][0].deleted_webtoonID}`,
                `likes:${result[0][0].deleted_webtoonID}`
            ];
              
            await Promise.all(keysDelete.map(key => redisClient.del(key)));
              

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
