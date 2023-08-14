//웹툰 삭제 api (adminpage)

const webtoonDeleteApi = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈

    //웹툰 내용 전체 삭제
    server.del('/api/webtoonDelete', async (req, res) => {
        const conn = await getConn();
        const { EnName } = req.body;
        const webtoonQuery = 'CALL usp_delete_webtoon(?);';

        try {
            const [result] = await conn.query(webtoonQuery, EnName); 

            res.send("삭제 성공");

            //redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${result[0][0].deleted_webtoonWeek}`);
            await redisClient.del(`webtoon_detail : ${result[0][0].deleted_webtoonID}`);
            await redisClient.del(`webtoon_list : ${result[0][0].deleted_webtoonID}`);
            await redisClient.del(`likes:${result[0][0].deleted_webtoonID}`);
        
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '삭제 실패' });
        } finally {
            conn.release();
        }
    });


    //에피소드 하나 지우기
    server.del('/api/episodeDelete', async (req, res) => {
        const conn = await getConn();
        const { EnName, ep } = req.body;
        const value = [EnName, ep];
        try {
            const episodeQuery = 'CALL usp_delete_episode(?, ?);';

            const [result] = await conn.query(episodeQuery, value); 

            res.send(ep+"화 삭제 성공");

            //redis 값 삭제
            await redisClient.del(`webtoon_detail : ${result[0][0].p_webtoonID}`);
            await redisClient.del(`webtoon_list : ${result[0][0].p_webtoonID}`);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '삭제 실패' });
        } finally {
            conn.release();
        }
    });

}
module.exports = webtoonDeleteApi;
