const redisClient = require('../redis'); 
const { getConn } = require('../database'); 

const WebtoonListService = {

    // 웹툰 디테일
    async getWebtoonDetail(ID) {
        const conn = await getConn(); 
        const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);';

        try {
            const key = `webtoon_detail : ${ID}`; 
            let value = await redisClient.get(key); 

            if (value) { // 키에 해당하는 데이터가 있을 때
                return JSON.parse(value);
            } else {
                let [result] = await conn.query(webtoonQuery, [ID]);
                const webtoonDetail = result[0]; 

                await redisClient.set(key, JSON.stringify(webtoonDetail)); 
                return webtoonDetail;
            }
        } catch (error) {
            throw error; 
        } finally {
            conn.release(); 
        }
    },


    //웹툰 리스트
    async getWebtoonList(ID) {
        const conn = await getConn();
        const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?);'; 

        try {
            const key = `webtoon_list : ${ID}`; 
            let value = await redisClient.get(key); 

            if (value) {
                return JSON.parse(value); 
            } else {
                let [result] = await conn.query(webtoonQuery, [ID]); 
                const webtoonList = result[0]; 

                await redisClient.set(key, JSON.stringify(webtoonList)); 
                return webtoonList; 
            }
        } catch (error) {
            throw error; 
        } finally {
            conn.release(); 
        }
    },


    //웹툰 페이지
    async getWebtoonPage(ID, ep) {
        const conn = await getConn(); 
        const values = [ID, ep];
        const ImgAndNext = 'CALL usp_get_webtoonPages(?, ?);'; 

        try {
            let [result] = await conn.query(ImgAndNext, values); 
            const webtoonPage = result[0]; 

            return webtoonPage;
        } catch (error) {
            throw error; 
        } finally {
            conn.release(); 
        }
    }
    
};

module.exports = WebtoonListService;
