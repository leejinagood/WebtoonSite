//좋아요 관련 api

const likeAPI = (server, getConn) => {

    const axios = require('axios'); 

    // 쿠키에서 토큰 추출하는 함수
    function DelisousCookie(cookies) {
        const cookieA = cookies.split(';');
        const tokenCookie = cookieA.find(cookie => cookie.trim().startsWith('token=')); //토큰부분만 빼내기
        if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        //토큰만 추출하여 return
        return token.trim();
        }
        return null;
    }

    // 쿠키에서 카카오 토큰 추출하는 함수 (동일한 방식으로 수정)
    function KakaoCookie(cookies) {
        if (typeof cookies === 'string') {
            const cookieA = cookies.split(';');
            const tokenCookie = cookieA.find(cookie => cookie.trim().startsWith('KakaoToken=')); //토큰부분만 빼내기
            if (tokenCookie) {
                const token = tokenCookie.split('=')[1];
                //토큰만 추출하여 return
                return token.trim();
            }
        }
        return null;
    }

    //좋아요 달기
    server.put('/api/update_like', async (req, res) => {
        const conn = await getConn();

        const { EnName, UserEmail } = req.body; //영어이름과 유저 이메일을 받아옴
        const webtoonIDquery = 'CALL usp_get_webtoonID_EnName(?);'; //webtoonID 추출 sp
        const userIDquery = 'CALL usp_get_userID(?);'; //UserUD 추출 sp
        const putLikeQuery = 'CALL usp_put_likes(?, ?);'; //userID와 webtoonID를 받아 좋아요를 수정하는 sp (추가)

        try {
            //웹툰의 영어이름을 받고 webtoonID 추출
            const [webtoonIDResult] = await conn.query(webtoonIDquery, [EnName]);
            const WID = webtoonIDResult[0].map((row) => row.webtoonID);

            //UserEmail을 받고 UserID 추출
            const [userIDResult] = await conn.query(userIDquery, [UserEmail]);
            const UID = userIDResult[0].map((row) => row.userID);

            const cookies = req.headers.cookie; //쿠키 가져와
            const token = DelisousCookie(cookies); // 쿠키에서 토큰 추출
            const ktoken = KakaoCookie(cookies); // 쿠키에서 카카오 토큰 추출

            const Response = await axios.get('http://localhost:4000/api/Token', {
                headers: {
                    Cookie: `token=${token}; KakaoToken=${ktoken}; `,// 토큰을 쿠키 형식으로 전달
                },
            });
            if (Response.data === '토큰 인증 성공') {
                //추출한 webtoonID와 userID를 좋아요 수정 쿼리에 삽입
                const [Result] = await conn.query(putLikeQuery, [UID, WID]);
                //db에서 수행되어 행이 수정된 갯수 
                if (Result.affectedRows > 0) { //1개 이상이면 좋아요 수정 성공
                res.send("좋아요 추가"); 
                } else {
                res.status(500).json('좋아요를 이미 누르셨습니다'); 
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