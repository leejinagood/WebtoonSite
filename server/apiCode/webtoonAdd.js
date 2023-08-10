//웹툰 추가 api (adminpage)

const webtoonAddApi = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈

    //웹툰 추가 메서드 
    server.post('/api/webtoonAdd', async (req, res) => {
        const conn = await getConn();
        const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories} = req.body;
        const Webtoon = [content, author, WebtoonName, WebtoonEnName];
        const Detail = [WebtoonEnName, week, thumbnail, JSON.stringify(categories)];

        const webtoonQuery = 'CALL usp_post_webtoon(?, ?, ?, ?);';
        //카테고리는 ["일상", "드라마"] 이런 형태로 넣기
        const DetailQuery = 'call usp_post_WebtoonDetail(?, ?, ?, ?)';

        try {
            await conn.query(webtoonQuery, Webtoon); 
            await conn.query(DetailQuery, Detail); 

            //redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${week}`);

            res.send("입력성공");
        } catch (error) {
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });

    //에피소드 추가 메서드
    server.post('/api/episodeAdd', async (req, res) => {
        const conn = await getConn();
        const { WebtoonEnName, count, thumbnail, ep} = req.body;

        const img = `/WebtoonImg/${WebtoonEnName}/${ep}/${WebtoonEnName}_${ep}_`

        const Webtoon = [WebtoonEnName, count, img, thumbnail];
        
        const episodeQuery = 'CALL usp_post_episode(?, ?, ?, ?);';

        try {
            await conn.query(episodeQuery, Webtoon); 
            res.send("에피소드 추가 성공");
        } catch (error) {
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    

}
module.exports = webtoonAddApi;