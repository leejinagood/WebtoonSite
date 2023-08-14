const redisClient = require('../redis'); // redis.js 모듈을 가져옴
const { getConn } = require('../database'); // database.js 모듈을 가져옴

const WebtoonListModel = {
    async getWebtoonDetail(ID) {
        const conn = await getConn(); // 데이터베이스 연결을 얻어옴
        const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // 파라미터 값에 해당하는 웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_detail : ${ID}`; // redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
            // 만약 redis에 데이터가 있다면 그대로 반환
            return JSON.parse(value); // 문자열을 객체로 변환하여 반환
            } else {
                let [result] = await conn.query(webtoonQuery, [ID]); // 파라미터 ID를 전달하여 웹툰 정보를 얻어옴
                const webtoon = result[0]; // 웹툰 정보를 저장

                await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                return webtoon; // 웹툰 정보 반환
            }
        } catch (error) {
            throw error; // 에러가 발생하면 에러를 던져서 상위에서 처리하도록 함
        } finally {
            conn.release(); // 데이터베이스 연결 해제
        }
    },

    async getWebtoonList(ID) {
        const conn = await getConn(); // 데이터베이스 연결을 얻어옴
        const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?);'; // 웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_list : ${ID}`; // redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환
                return JSON.parse(value); // 문자열을 객체로 변환하여 반환
            } else {
                let [result] = await conn.query(webtoonQuery, [ID]); // 파라미터 ID를 전달하여 웹툰 정보를 얻어옴
                const webtoon = result[0]; // 웹툰 정보를 저장

                await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                return webtoon; // 웹툰 정보 반환
            }
        } catch (error) {
            throw error; // 에러가 발생하면 에러를 던져서 상위에서 처리하도록 함
        } finally {
            conn.release(); // 데이터베이스 연결 해제
        }
    },

    async getWebtoonPage(ID, ep) {
        const conn = await getConn(); // 데이터베이스 연결을 얻어옴
        const values = [ID, ep];
        const ImgAndNext = 'CALL usp_get_webtoonPages(?, ?);'; // episodeID를 받아와 웹툰 정보를 출력하는 SP

        try {
            let [result] = await conn.query(ImgAndNext, values); // 파라미터 ID와 ep를 전달하여 웹툰 페이지 정보를 얻어옴
            const webtoonPage = result[0]; // 웹툰 페이지 정보를 저장

            return webtoonPage; // 웹툰 페이지 정보 반환
        } catch (error) {
            throw error; // 에러가 발생하면 에러를 던져서 상위에서 처리하도록 함
        } finally {
            conn.release(); // 데이터베이스 연결 해제
        }
    }
};

module.exports = WebtoonListModel;
