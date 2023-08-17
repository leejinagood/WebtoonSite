const redisClient = require('../../redis');
const { getConn } = require('../../database');

const WebtoonShowService = {

    // 웹툰 디테일
    async getWebtoon() {
        const conn = await getConn(); 
        const webtoonQuery = 'call usp_get_Webtoons();';

        try {
            let [result] = await conn.query(webtoonQuery);
            const webtoonDetail = result[0]; 

            return webtoonDetail;
            
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
            let [result] = await conn.query(webtoonQuery, [ID]); 
            const webtoonList = result[0]; 

            return webtoonList; 
            
        } catch (error) {
            throw error; 
        } finally {
            conn.release(); 
        }
    },
    
};

module.exports = WebtoonShowService;
