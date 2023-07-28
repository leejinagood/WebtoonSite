//웹툰 리스트에 사용될 api

const webtoonListAPI = (server, getConn) => {

    const redisClient = require('./redis'); // redis.js 모듈을 가져옴

    //웹툰 list 상단에 들어갈 정보
    //웹툰 이미지나 제목을 클릭했을 때 보이는 웹툰 정보들
    //webtoonEnName을 파라미터로 받음.
    server.get('/api/webtoondetail', async (req, res) => {
        const conn = await getConn();
        const { EnName } = req.query; //영어이름
        const query = 'call usp_get_webtoonID_EnName (?);'; //웹툰의 영어이름을 받고 webtoonID 추출
        const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // ID를 받아와 웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_detail : ${EnName}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여
            } else {
            let [rows] = await conn.query(query, [EnName]); // EnName 파라미터로 받아온 후
            const ID = rows[0].map((row) => row.webtoonID); // ID를 추출

            const webtoonDetails = []; // 배열로 초기화

            for (const webtoonID of ID) { 
                const [rows] = await conn.query(webtoonQuery, [webtoonID]); //webtoonID를 sp에 넣음
                const [row] = rows[0]; // 배열의 첫번째 부분 
                webtoonDetails.push({
                webtoon_name: row.webtoonName, // 웹툰 제목과
                webtoon_en_name: row.webtoonEnName, // 웹툰 영어 제목과
                thumbnail: row.webtoonThumbnail, // 웹툰 썸네일을 추출
                author: row.webtoonAuthor, // 웹툰 작가 추출
                week: row.webtoonWeek, // 무슨 요일에 연재하는지
                content: row.webtoonContent, //웹툰 상세 내용
                like: row.LikesCount, // 좋아요 갯수
                count: row.countEpisode // 총 에피소드 화
                });
            }
            await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
            res.send(webtoonDetails);
        }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });


    //웹툰 에피소드 리스트에 사용될 부분 (오름차순 내림차순 포함)
    server.get('/api/webtoonlist', async (req, res) => {
        const conn = await getConn();
        const { EnName, sort } = req.query; // 영어이름과 sort 파라미터를 받아옴
        const query = 'CALL usp_get_webtoonID_EnName(?);'; //웹툰의 영어이름을 받고 webtoonID 추출
        const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?, ?);'; // ID를 받아와 웹툰 정보를 출력하는 SP
        
        try {
            const key = `webtoon_list : ${EnName}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회
        
            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여
            } else {
                let [rows] = await conn.query(query, [EnName]); // EnName 파라미터로 받아온 후
                const ID = rows[0].map((row) => row.webtoonID); // ID를 추출

                const webtoonDetails = []; // 배열로 초기화
                for (const webtoonID of ID) {  //webtoonID를 sp에 넣음
                    const [rows] = await conn.query(webtoonQuery, [webtoonID, sort]);
                    for (const row of rows[0]) { // 각 행에 대해 반복하여 웹툰 정보를 추가
                        webtoonDetails.push({
                        webtoon_name: row.webtoonName, // 웹툰 제목과
                        webtoon_en_name: row.webtoonEnName, // 웹툰 영어 제목과
                        episode_number: row.episodeNumber, //에피소드 이름과
                        episode_thumbnail: row.episodeThumbnail, //에피소드 각 화마다의 썸네일
                        update: row.uploadDate, // 업로드 날짜
                        count: row.countEpisode // 총 에피소드 화
                        });
                    }
                }
                await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
                res.send(webtoonDetails);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });
      
    
    //웹툰 영어이름, episodeNumber을 받으면 웹툰의 이미지와, 다음 화가 있는지
    server.get('/api/webtoonpage', async (req, res) => {
        const conn = await getConn();
        const { EnName, ep } = req.query; //영어이름, 몇 화?
        const values = [EnName, ep]
        const query = 'call usp_get_EpiosdeID (?, ?);'; //웹툰의 영어이름과 몇 화인지 받고 고유한 episodeID를 추출하는 sp
        const ImgAndNext = 'CALL usp_get_webtoonPages(?);'; // episodeID를 받아와 웹툰 정보를 출력하는 SP

        try {
            const key = `webtoon_page : ${values}`; //redis의 고유 키값
            let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

            if (value) {
                // 만약 redis에 데이터가 있다면 그대로 반환 
                res.send(JSON.parse(value)); //문자열을 객체로 변환하여
            } else {

            let [rows] = await conn.query(query, values); // EnName 파라미터로 받아온 후
            const ID = rows[0].map((row) => row.episodeID); // episodeID를 추출
        
            const webtoonContent = []; // 배열로 초기화
            for (const episodeID of ID) {  //episodeID를 sp에 넣음
                const [rows] = await conn.query(ImgAndNext, [episodeID]);
                const [row] = rows[0]; // 배열의 첫번째 부분 
                webtoonContent.push({
                webtoonImg: row.episodeImg, //웹툰 이미지 경로
                count: row.episodeImgCount,
                nextEpisode: row.next  //다음화 있는지 없는지
                });
            }
            await redisClient.set(key, JSON.stringify(webtoonContent)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
            res.send(webtoonContent);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
    });

}
module.exports = webtoonListAPI;