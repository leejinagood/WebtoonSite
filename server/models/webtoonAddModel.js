const redisClient = require('../redis');
const { getConn } = require('../database');

const WebtoonAddModel = {
    async addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories) {
        const conn = await getConn();

        try {
            const webtoonQuery = 'CALL usp_post_webtoon(?, ?, ?, ?);';
            const DetailQuery = 'CALL usp_post_WebtoonDetail(?, ?, ?, ?)';

            if (!content || !author || !WebtoonName || !WebtoonEnName || !week || !thumbnail) {
                throw new Error('내용을 입력하세요');
            }

            const webtoonValues = [content, author, WebtoonName, WebtoonEnName];
            const detailValues = [WebtoonEnName, week, thumbnail, JSON.stringify(categories)];

            await conn.query(webtoonQuery, webtoonValues);
            await conn.query(DetailQuery, detailValues);

            // Redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${week}`);

            return "입력 성공";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    async addEpisode(WebtoonEnName, count, thumbnail, ep) {
        const conn = await getConn();

        try {
            const img = `/WebtoonImg/${WebtoonEnName}/${ep}/${WebtoonEnName}_${ep}_`;
            const Webtoon = [WebtoonEnName, count, img, thumbnail, ep];
            const episodeQuery = 'CALL usp_post_episode(?, ?, ?, ?, ?);';

            if (!count || !WebtoonEnName || !img || !thumbnail) {
                throw new Error('내용을 입력하세요');
            }

            const [WebtoonId] = await conn.query(episodeQuery, Webtoon);

            // Redis 값 삭제
            await redisClient.del(`webtoon_detail : ${WebtoonId[0][0].webtoonID}`);
            await redisClient.del(`webtoon_list : ${WebtoonId[0][0].webtoonID}`);

            return "에피소드 추가";
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
};

module.exports = WebtoonAddModel;
