//좋아요 관련 api

const likeAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴

    const axios = require('axios'); 

    //좋아요 추가 및 취소
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const { EnName, UserEmail } = req.body; //영어이름과 유저 이메일을 받아옴
        const values = [EnName, UserEmail];
        const webtoonIDquery = 'CALL usp_get_webtoonID_EnName(?);'; //webtoonID 추출 sp
        const userIDquery = 'CALL usp_get_userID(?);'; //UserUD 추출 sp

        const Query ='select likes from LikeTable where webtoonID = ? and userID = ?;' //좋아요 했는지 안 했는지

        const LikeQuery = 'CALL usp_put_likes(?, ?);'; //userID와 webtoonID를 받아 좋아요를 수정하는 sp (추가)
        const LikeCancelQuery = 'CALL usp_put_likesCancel(?, ?);'; // 좋아요 취소를 위한 쿼리 추가 (삭제)

        try {
            const key = `like : ${values}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여
            } else {
                //웹툰의 영어이름을 받고 webtoonID 추출
                const [webtoonIDResult] = await conn.query(webtoonIDquery, [EnName]);
                const WID = webtoonIDResult[0].map((row) => row.webtoonID);

                //UserEmail을 받고 UserID 추출
                const [userIDResult] = await conn.query(userIDquery, [UserEmail]);
                const UID = userIDResult[0].map((row) => row.userID);

                const Response = await axios.get('http://localhost:4000/api/Token', { //토큰 인증 호출
                    headers: { //헤더에
                        // Cookie: `token=${token}; KakaoToken=${ktoken}; `
                        Cookie: req.headers.cookie, // 현재 쿠키를 그대로 전달
                    },
                });
                if (Response.data === '토큰 인증 성공' || Response.data === '카카오 토큰 인증 성공') { //인증 성공일 때 
                    const date = await conn.query(Query, [WID, UID]);
                    const [resultArray] = date; // 배열을 추출
                    const [resultObject] = resultArray; // 객체를 추출
                    const likes = resultObject.likes; // 좋아요 추출

                    if(likes === 0){ //좋아요를 안 눌렀을 경우
                        //추출한 webtoonID와 userID를 좋아요 수정 쿼리에 삽입
                        let [Result] = await conn.query(LikeQuery, [UID, WID]);
                        //db에서 수행되어 행이 수정된 갯수 
                        if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공
                            res.send("1"); 
                            } else {
                            res.status(500).json('좋아요 오류'); 
                        }
                    }else if(likes === 1){ //좋아요를 눌렀을 경우
                        [Result] = await conn.query(LikeCancelQuery, [UID, WID]);
                        //db에서 수행되어 행이 수정된 갯수 
                        if (Result.affectedRows > 0) { //1개 이상이면 좋아요 삭제 성공
                            res.send("0"); 
                            } else {
                            res.status(500).json('좋아요 오류'); 
                        }
                    }
                } else {
                    res.status(401).send('로그인 하세요');
            }
            await redisClient.set(key, JSON.stringify(webtoonContent)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
            res.send(webtoonContent);
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