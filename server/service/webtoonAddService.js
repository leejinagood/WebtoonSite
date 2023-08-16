const redisClient = require('../redis');
const { getConn } = require('../database');

const WebtoonAddService = {

    // 웹툰 추가
    async addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories) {
        const conn = await getConn();

        try {
            const webtoonAddAuery = 'Call usp_post_webtoon_with_detail(?,?,?,?,?,?,?)'

            const webtoonValues = [content, author, WebtoonName, WebtoonEnName, week, thumbnail, JSON.stringify(categories)];

            await conn.query(webtoonAddAuery, webtoonValues);

            // Redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${week}`);

            return "웹툰 추가 성공";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
        
    },


    //에피소드 추가
    async addEpisode(WebtoonEnName, count, thumbnail, ep) {
        const conn = await getConn();

        try {
            const img = `/WebtoonImg/${WebtoonEnName}/${ep}/${WebtoonEnName}_${ep}_`;

            const Webtoon = [WebtoonEnName, count, img, thumbnail, ep];
            const episodeQuery = 'CALL usp_post_episode(?, ?, ?, ?, ?);';

            const [WebtoonId] = await conn.query(episodeQuery, Webtoon);

            // Redis 값 삭제
            await redisClient.del(`webtoon_detail : ${WebtoonId[0][0].webtoonID}`);
            await redisClient.del(`webtoon_list : ${WebtoonId[0][0].webtoonID}`);

            return "에피소드 추가 성공";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }

};

module.exports = WebtoonAddService;
