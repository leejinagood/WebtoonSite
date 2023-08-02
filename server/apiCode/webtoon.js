//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴

    // 요일별 웹툰, 전체 웹툰 중 신규웹툰, 좋아요 상위 5개 웹툰
    server.get('/api/webtoons', async (req, res) => {
        const conn = await getConn();
        const { pi_vch_condition } = req.query;

        try {
            const key = `webtoon : ${pi_vch_condition}`; // redis 고유 키 값
            let value = await redisClient.get(key); // 해당 키값으로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); // 문자열로 파싱

            } else{ // 만약 redis에 데이터가 없다면 db에서 조회

                const [rows] = await conn.query('CALL usp_get_Webtoons();');
                const row = rows[0];

                if (pi_vch_condition === 'All') { 
                    res.send(row); 
                } else if (pi_vch_condition === 'rank') { 
                    row.sort((a, b) => b.totalLikes - a.totalLikes);
                    const result = row.slice(0, 5);
                    res.send(result);
                } else {
                    const result = row.filter((item) => item.webtoonWeek === pi_vch_condition);
                    res.send(result);
                }

                //await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                //res.send(webtoonDetails);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release();
        }
    });


    //검색하면 그 단어를 포함한 웹툰 제목과 영어제목, 썸네일을 출력하는 메서드
    server.get('/api/search', async (req, res) => {
        const conn = await getConn();
        const { word } = req.query;
        const query = 'CALL usp_get_search(?);'; //검색한 웹툰의 Id를 출력
        try { 
            const key = `webtoon_search : ${word}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
            // 만약 redis에 데이터가 있다면 그대로 반환 
            res.send(JSON.parse(value)); //문자열로 파싱
        } else {
            const [rows] = await conn.query(query, [word]);
            const row = rows[0];
            res.send(row);

            //await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
            res.send(row);
        }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });

}
module.exports = webtoonAPI;