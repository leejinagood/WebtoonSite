//좋아요 관련 api

const likeAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴

    const axios = require('axios'); 

    //좋아요 추가 및 취소
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const { EnName, UserEmail } = req.body; //영어이름과 유저 이메일을 받아옴
        const values = [UserEmail, EnName];
        const Query ='call usp_get_likes_by_email_and_webtoon(?, ?)' //좋아요 했는지 안 했는지, webtoonWeek, totalLikes

        const LikeQuery = 'CALL usp_put_likes(?, ?);'; //userID와 webtoonID를 받아 좋아요를 수정하는 sp (추가)
        const LikeCancelQuery = 'CALL usp_put_likesCancel(?, ?);'; // 좋아요 취소를 위한 쿼리 추가 (삭제)

        try {
            const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
                headers: { //헤더에
                    // Cookie: `token=${token}; KakaoToken=${ktoken}; `
                    Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
                },
            });

            if (Response.data === '토큰 인증 성공' || Response.data === '카카오 토큰 인증 성공') { //인증 성공일 때 
                const [date] = await conn.query(Query, values);
                const [resultArray] = date;
                const [resultObject] = resultArray;
                const { likes, webtoonWeek, webtoonID } = resultObject;

                const Week = resultObject.webtoonWeek; 
                const ID = resultObject.webtoonID; 

                if(likes === 0){ 
                    //추출한 webtoonID와 userID를 좋아요 수정 쿼리에 삽입
                    let [Result] = await conn.query(LikeQuery, values);
                    //db에서 수행되어 행이 수정된 갯수 
                    if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공
                        res.send("0"); 

                        const key = `likes:${ID}`; // redis 고유 키 값
                        let value = await redisClient.get(key); // 해당 키값으로 데이터 조회

                        if (value !== null) { // null 대신에 0이어도 동작하게 수정
                            redisClient.INCRBY(key, 1 ,(err, reply) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(reply);
                                }
                             });
                        } else {
                            console.log("d");
                        }
                    } else {
                        res.status(500).json('좋아요 오류'); 
                    }
                }else if(likes === 1){ 
                    let [Result] = await conn.query(LikeCancelQuery, values);
                    //db에서 수행되어 행이 수정된 갯수 
                    if (Result.affectedRows > 0) { //1개 이상이면 좋아요 삭제 성공
                        res.send("1"); 

                        const key = `likes:${ID}`; // redis 고유 키 값
                        let value = await redisClient.get(key); // 해당 키값으로 데이터 조회

                        if (value !== null) { // null 대신에 0이어도 동작하게 수정
                             redisClient.DECRBY(key, 1 ,(err, reply) => { // key에서 공백 제거
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log(reply);
                                }
                            });
                        }else{
                            console.log("d");
                        }

                    } else {
                        res.status(500).json('좋아요 오류'); 
                    }
                }
            } else {
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