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
                res.send( "" );
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Internal server error');
        }
    });
    

    //좋아요 추가 및 취소
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const userID = req.body.userID;
        const { EnName } = req.body; //영어이름과 유저 이메일을 받아옴
        const values = [userID, EnName];
        const Query ='call usp_get_likes_by_email_and_webtoon(?, ?)' //좋아요 했는지 안 했는지

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

                    //db에서 수행되어 행이 수정된 갯수 
                    if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공

                        // const key = `likes:${resultArray[0].webtoonID}`; // redis 고유 키 값
                        // let value = await redisClient.get(key); // 해당 키값으로 데이터 조회

                        // if (value !== null) { 
                            // redisClient.INCRBY(key, 1 ,(err, reply) => { //1 추가
                            //     if (err) {
                            //         console.error(err);
                            //     } else {
                            //         console.log(reply);
                            //     }
                            //  });

                            // redisClient.DECRBY(key, 1 ,(err, reply) => { //1 빼기
                            //     if (err) {
                            //         console.error(err);
                            //     } else {
                            //         console.log(reply);
                            //     }
                            // });

                            // let result = await redisClient.get(key); //value값 가져옴
                            // if (result === null) {
                            //     result = ''; 
                            // }
                            res.send("like 수정");
                    } else {
                        res.status(500).json('좋아요 오류'); 
                    }
                }else {
                res.status(401).send('로그인 하세요');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });

}
module.exports = likeAPI;