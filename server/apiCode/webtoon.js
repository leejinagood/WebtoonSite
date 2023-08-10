//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈

    // 요일별 웹툰, 전체 웹툰 중 신규웹툰, 좋아요 상위 5개 웹툰
    server.get('/api/webtoons', async (req, res) => {
        const conn = await getConn();
        const { pi_vch_condition } = req.query;

        try {
            const Webtoonkey = `webtoon : ${pi_vch_condition}`; // redis 고유 키 값
            let value = await redisClient.get(Webtoonkey); // 해당 키값으로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); // 문자열로 파싱

            } else{ // 만약 redis에 데이터가 없다면 db에서 조회

                const [result] = await conn.query('CALL usp_get_Webtoons();'); //모든 웹툰 정보 가져옴
                const webtoon = result[0]; 

                for (const item of webtoon) {
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
                    
                    res.send(webtoon); // 응답으로 모든 웹툰 정보를 보냄
                    await redisClient.set(Webtoonkey, JSON.stringify(webtoon)); 
                    await redisClient.expire(Webtoonkey, 3600); //webtoon : All 키 1시간마다 삭제

                }else { // 요일별 웹툰
                    const result = webtoon.filter((item) => item.webtoonWeek === pi_vch_condition); //요일이 같은 것만 출력
                    res.send(result);
                    await redisClient.set(Webtoonkey, JSON.stringify(result));  // 저장
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        } finally {
            conn.release();
        }
    });


    //검색하면 그 단어를 포함한 웹툰 제목과 영어제목, 썸네일을 출력하는 메서드
    server.get('/api/search', async (req, res) => {
        const conn = await getConn();
        const { word } = req.query;
        const query = 'CALL usp_get_search(?);'; //검색한 웹툰의 정보를 출력
        try { 
            const key = `webtoon_search : ${word}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

          if (value) {
            // 만약 redis에 데이터가 있다면 그대로 반환 
            res.send(JSON.parse(value)); //문자열로 파싱
          } else {
            const [result] = await conn.query(query, [word]); //검색 결과를 row에 넣고 응답을 보냄
            const webtoon = result[0];

            res.send(webtoon);
            //await redisClient.set(key, JSON.stringify(webtoon)); 
          }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });


    //카테고리 검색
    server.get('/api/category', async (req, res) => {
        const conn = await getConn();
        const { word } = req.query;
        const query = 'CALL usp_get_search_cate(?);'; //검색한 웹툰의 정보를 출력
        try { 
            const key = `webtoon_search_category : ${word}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

          if (value) {
            // 만약 redis에 데이터가 있다면 그대로 반환 
            res.send(JSON.parse(value)); //문자열로 파싱
          } else {
            const [result] = await conn.query(query, [word]); //검색 결과를 row에 넣고 응답을 보냄
            const webtoon = result[0];

            res.send(webtoon);
            //await redisClient.set(key, JSON.stringify(webtoon)); 
          }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });

}
module.exports = webtoonAPI;