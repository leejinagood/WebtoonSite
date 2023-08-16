const redisClient = require('../redis'); // redis.js 모듈
const { getConn } = require('../database'); // database.js 모듈

const WebtoonService = {

    //웹툰 정보 출력
    async getWebtoons(pi_vch_condition) {
        const conn = await getConn();

        try {
            const Webtoonkey = `webtoon : ${pi_vch_condition}`;
            let value = await redisClient.get(Webtoonkey);

            if (value) {
                return JSON.parse(value);
            } else {
                const [result] = await conn.query('CALL usp_get_Webtoons();');
                const webtoon = result[0];

                for (let i = 0; i < webtoon.length; i++) {
                    //console.log(webtoon[i]);
                    const item = webtoon[i];
                    const likeKey = `likes:${item.webtoonID}`;
                    const likeValue = await redisClient.get(likeKey);

                    if (likeValue) {
                        item.likes = JSON.parse(likeValue); // 이미 저장된 좋아요 정보 사용
                    } else {
                        await redisClient.set(likeKey, item.totalLikes);
                        item.likes = item.totalLikes; // 새로운 좋아요 정보 저장
                    }
                }

                if (pi_vch_condition === 'All') {  
                    await redisClient.set(Webtoonkey, JSON.stringify(webtoon)); 
                    await redisClient.expire(Webtoonkey, 3600); //webtoon : All 키 1시간마다 삭제

                    return webtoon; // 응답으로 모든 웹툰 정보

                }else { // 요일별 웹툰
                    const result = webtoon.filter((item) => item.webtoonWeek === pi_vch_condition); //요일이 같은 것만 출력
                    await redisClient.set(Webtoonkey, JSON.stringify(result));  // 저장
                    return result; // 응답으로 모든 웹툰 정보
                }
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    // 웹툰 검색
    async searchWebtoon(word) {
        const conn = await getConn();
        const query = 'CALL usp_get_search(?);';

        try {
            const key = `webtoon_search : ${word}`;
            let value = await redisClient.get(key);

            if (value) {
                return JSON.parse(value);
            } else {
                const [result] = await conn.query(query, [word]);
                const webtoon = result[0];

                await redisClient.set(key, JSON.stringify(webtoon));
                return webtoon;
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

    // 카테고리 검색 
    async searchByCategory(word) {
        const conn = await getConn();
        const query = 'CALL usp_get_search_cate(?);'; //검색한 웹툰의 정보를 출력
        try { 
            const key = `webtoon_search_category : ${word}`; 
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                return JSON.parse(value);
            } else {
                const [result] = await conn.query(query, [word]); 
                const webtoon = result[0];

                await redisClient.set(key, JSON.stringify(webtoon)); 
                return webtoon;
            }
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },
}

module.exports = WebtoonService;
