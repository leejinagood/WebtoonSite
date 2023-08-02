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
                const { likes, webtoonWeek, totalLikes } = resultObject;

                const Week = resultObject.webtoonWeek; 
                const total = resultObject.totalLikes; 

                if(likes === 0){ //좋아요를 안 눌렀을 경우
                    //추출한 webtoonID와 userID를 좋아요 수정 쿼리에 삽입
                    let [Result] = await conn.query(LikeQuery, values);
                    //db에서 수행되어 행이 수정된 갯수 
                    if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공
                        res.send("0"); 

                        // 좋아요 수정이 완료되면 redis에서 해당 키를 삭제
                        redisClient.del(`webtoon_detail : ${EnName}`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });
                        redisClient.del(`webtoon : ${Week.webtoonWeek}`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });
                        redisClient.del(`webtoon : rank`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });

                        // // // 좋아요를 한 번 누를 때마다 redis의 likes 값을 +1 증가시킴
                        // // redisClient.INCRBY(`webtoon_detail : ${EnName}`, "likes", 1 ,(err, reply) => {
                        // //    if (err) {
                        // //        console.error(err);
                        // //    } else {
                        // //        console.log(reply);
                        // //    }
                        // // });

                        // // // redis 키에 따른 값 수정
                        // // redisClient.hset(`webtoon_detail:${EnName}`, "likes", Count, (err, reply) => {
                        // //    if (err) {
                        // //        console.error(err);
                        // //    } else {
                        // //        console.log(reply);
                        // //    }
                        // // });

                    } else {
                        res.status(500).json('좋아요 오류'); 
                    }
                }else if(likes === 1){ //좋아요를 눌렀을 경우
                    let [Result] = await conn.query(LikeCancelQuery, values);
                    //db에서 수행되어 행이 수정된 갯수 
                    if (Result.affectedRows > 0) { //1개 이상이면 좋아요 삭제 성공
                        res.send("1"); 

                        // 좋아요 수정이 완료되면 redis에서 해당 키를 삭제
                        redisClient.del(`webtoon_detail : ${EnName}`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });
                        redisClient.del(`webtoon : ${Week.webtoonWeek}`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });
                        redisClient.del(`webtoon : rank`, (err, reply) => {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log(reply);
                            }
                        });

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