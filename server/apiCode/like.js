//좋아요 관련 api

const likeAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴
    const axios = require('axios'); 

    // 좋아요 보여주기
    server.get('/api/show_like', async (req, res) => {
        const { id } = req.query;
    
        try { //id를 받아온 후 redis의 값으로 좋아요 보여주기
            const key = `likes:${id}`;
            const value = await redisClient.get(key);
            if (value !== null) {
                res.send(value);
            } else {
                res.json({ message: "좋아요 오류"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    });
    

    //좋아요 추가 및 취소
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const userID = req.body.userID;
        const { EnName } = req.body; //영어이름과 유저 이메일을 받아옴
        const values = [userID, EnName];
        const Query ='call usp_get_likes_by_email(?, ?)' //좋아요 했는지 안 했는지

        const LikeQuery = 'CALL usp_put_likes(?, ?);'; // 좋아요를 수정하는 sp (추가)

        try {
            const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
                headers: { //헤더에
                    Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
                },
            });

            if (Response.data === '토큰 인증 성공') { //인증 성공일 때 

                const [date] = await conn.query(Query, values); //좋아요 햇는지 안 했는지
                const [resultArray] = date;

                let [Result] = await conn.query(LikeQuery, values); //좋아요 추가

                //db에서 행이 수정된 갯수 
                if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공

                    const key = `likes:${resultArray[0].webtoonID}`; // Redis 고유 키 값
                    await redisClient.get(key); // 해당 키값으로 데이터 조회
    
                    const newLikes = resultArray[0].likes; 
                    if (newLikes) { // 좋아요 상태가 true인 경우 
                        await redisClient.DECRBY(key, 1);
                    } else { // 좋아요 상태가 false인 경우 
                        await redisClient.INCRBY(key, 1); 
                    }
                    res.send("좋아요 수정");
                } else {
                    res.json('좋아요 오류'); 
                }
            }else {
                res.json({ message: "로그인 하세요"});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        } finally {
            conn.release();
        }
    });

}
module.exports = likeAPI;