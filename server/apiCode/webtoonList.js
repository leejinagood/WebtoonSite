//웹툰 리스트에 사용될 api

const webtoonListAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴

    //웹툰 list 상단에 들어갈 정보
    //웹툰 이미지나 제목을 클릭했을 때 보이는 웹툰 정보들
    //webtoonEnName을 파라미터로 받음.
    server.get('/api/webtoondetail', async (req, res) => {
        const conn = await getConn();
        const { ID } = req.query; //영어이름
        const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // 파라미터 값에 해당하는 웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_detail : ${ID}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여

            } else {
                let [rows] = await conn.query(webtoonQuery, [ID]); // EnName 파라미터로 받아온 후
                const webtoon = rows[0];

                await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                res.send(webtoon);

            }
        } catch (error) {
            console.error(error);
            res.json({ message: "오류"});
        } finally {
            conn.release(); // 연결 해제
        }
    });


    //웹툰 에피소드 리스트에 사용될 부분 
    server.get('/api/webtoonlist', async (req, res) => {
        const conn = await getConn();
        const { ID } = req.query; // 영어이름 받아옴
        const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?);'; //웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_list : ${ID}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여

            } else {
                let [rows] = await conn.query(webtoonQuery, [ID]); // EnName 파라미터로 받아온 후
                const webtoon = rows[0]; //결과를 저장 후 응답으로 보냄

                await redisClient.set(key, JSON.stringify(webtoon)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                res.send(webtoon);
            }
        } catch (error) {
            console.error(error);
            res.json({ message: "오류"});
        } finally {
            conn.release(); // 연결 해제
        }
    });


    //웹툰 영어이름, episodeNumber을 받으면 웹툰의 이미지와, 다음 화가 있는지
    server.get('/api/webtoonpage', async (req, res) => {
        const conn = await getConn();
        const { ID, ep } = req.query; //영어이름, 몇 화?
        const values = [ID, ep]
        const ImgAndNext = 'CALL usp_get_webtoonPages(?, ?);'; // episodeID를 받아와 웹툰 정보를 출력하는 SP

        try {
                let [rows] = await conn.query(ImgAndNext, values); // EnName과 ep 파라미터를 배열로 전달
                const webtoon = rows[0];

                res.send(webtoon);
            }
         catch (error) {
            console.error(error);
            res.json({ message: "오류"});
        } finally {
            conn.release(); // 연결 해제
        }
    });

}
module.exports = webtoonListAPI;