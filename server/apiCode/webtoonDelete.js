//웹툰 삭제 api (adminpage)

const webtoonDeleteApi = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈

    server.del('/api/webtoonDelete', async (req, res) => {
        const conn = await getConn();
        const { ID } = req.body;

        const webtoonQuery = 'CALL usp_delete_webtoon(?);';

        try {
            const [week] = await conn.query(webtoonQuery, ID); 
            console.log(week[0][0].deleted_webtoonWeek);
            console.log(ID);
            res.send("삭제 성공");

            //redis 값 삭제
            await redisClient.del('webtoon : All');
            await redisClient.del(`webtoon : ${week[0][0].deleted_webtoonWeek}`);
            await redisClient.del(`webtoon_detail : ${ID}`);
            await redisClient.del(`webtoon_list : ${ID}`);
            await redisClient.del(`likes:${ID}`);

        } catch (error) {
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    

}
module.exports = webtoonDeleteApi;