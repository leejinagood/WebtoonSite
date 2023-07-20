//웹툰 리스트에 사용될 api

const webtoonListAPI = (server, getConn) => {

    //웹툰 list 상단에 들어갈 정보
    //웹툰 이미지나 제목을 클릭했을 때 보이는 웹툰 정보들
    //webtoonEnName을 파라미터로 받음.
    server.get('/api/webtoondetail', async (req, res) => {
    const conn = await getConn();
    const { EnName } = req.query; //영어이름
    const query = 'call usp_get_webtoonID_EnName (?);';
    const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // ID를 받아와 웹툰 정보를 출력하는 SP

    try {
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
            like: row.LikesCount // 좋아요 갯수
            });
        }
        //console.log(ID);
        //console.log(webtoonDetails);
        res.send(webtoonDetails); // 응답으로 보냄
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }
    });


    server.get('/api/webtoonlist', async (req, res) => {
        const conn = await getConn();
        const { EnName, sort } = req.query; // 영어이름과 sort 파라미터를 받아옴
        const query = 'CALL usp_get_webtoonID_EnName(?);';
        const webtoonQuery = 'CALL usp_get_WebtoonEpisode(?, ?);'; // ID를 받아와 웹툰 정보를 출력하는 SP
      
        try {
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
                epiosde_thumbnail: row.episodeThumbnail, //에피소드 각 화마다의 썸네일
                update: row.uploadDate, // 업로드 날짜
                count: row.countEpisode // 총 에피소드 화
              });
            }
          }
          res.send(webtoonDetails); // 응답으로 보냄
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
        const { webtoonName, ep } = req.query; //영어이름, 몇 화?
        const values = [webtoonName, ep]
        const query = 'call usp_get_EpiosdeID (?, ?);';
        const ImgAndNext = 'CALL usp_get_webtoonPages(?);'; // ID를 받아와 웹툰 정보를 출력하는 SP

        try {
            let [rows] = await conn.query(query, values); // EnName 파라미터로 받아온 후
            const ID = rows[0].map((row) => row.episodeID); // episodeID를 추출
            
            const webtoonContent = []; // 배열로 초기화
            for (const episodeID of ID) {  //episodeID를 sp에 넣음
                const [rows] = await conn.query(ImgAndNext, [episodeID]);
                const [row] = rows[0]; // 배열의 첫번째 부분 
                webtoonContent.push({
                webtoonImg: row.episodeImg, //웹툰 이미지 경로
                nextEpisode: row.next  //다음화 있는지 없는지
                });
            }
            res.send(webtoonContent);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: '서버 스크립트의 오류' });
        } finally {
            conn.release(); // 연결 해제
        }
        });









    //webtoon_name을 입력받고 Episode_Id를 보내주는 메서드 
    server.get('/api/Episode_Id', async(req, res) => {
    const conn = await getConn();
    const query = "select Episode_Id from Episode_Table join Webtoon_Table on Webtoon_Table.Webtoon_Id = Episode_Table.Webtoon_Id where Webtoon_Table.Webtoon_Name = ?;"
    const {Webtoon_Name} = req.query;
    try{
        const [result] = await conn.query(query, [Webtoon_Name]);
        // console.log(result);
        res.send(result);
    }catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }});


    //웹툰을 첫 화부터 episode_Number를 출력하는 메서드
    server.get('/api/Webtoon_Asc', async(req, res) => {
    const conn = await getConn();
    const query = "call Webtoon_Asc (?);";
    const {WebtoonName} = req.query;
    try{
        const [rows] = await conn.query(query, [WebtoonName]);
        const Asc_Number = rows[0].map(row => ({
        // Webtoon_Name: row.Webtoon_Name, //웹툰 제목
        Episode_Number: row.Episode_Number //에피소드 넘버 1,2,3순
        }));
        // console.log({Asc_Number});
        res.send({Asc_Number});
    }catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }});


    //웹툰을 최신화부터 episode_Number를 출력하는 메서드
    server.get('/api/Webtoon_Desc', async(req, res) => {
    const conn = await getConn();
    const query = "call Webtoon_Desc (?);";
    const {WebtoonName} = req.query;
    try{
        const [rows] = await conn.query(query, [WebtoonName]);
        const Desc_Number = rows[0].map(row => ({
        // Webtoon_Name: row.Webtoon_Name, //웹툰 제목
        Episode_Number: row.Episode_Number //에피소드 넘버 4,3,2,1순
        }));
        // console.log({Desc_Number});
        res.send({Desc_Number});
    }catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }});


    // 제목과 에피소드를 파라미터로 받고 웹툰의 이미지 경로와 카운트 컬럼을 추출하는 메서드
    server.get('/api/Webtoon_Img', async (req, res) => {
    const conn = await getConn();
    const query = "call WebtoonImg (?, ?);";
    const { webtoonName, episodeNumber } = req.query;
    const values = [webtoonName, episodeNumber];
    try {
        const [rows] = await conn.query(query, values);
        const EpisodeImg = rows[0].map(row => ({
        Episode_Image: row.Episode_Image,
        Episode_Img_Count: row.Episode_Img_Count
        }));
        // console.log({ EpisodeImg });
        res.send({ EpisodeImg });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }
    });


    //에피소드 썸네일 보여주는 메서드
    server.get('/api/Episode_Thumbnail', async (req, res) => {
    const conn = await getConn();
    const query = "call Episode_Thumbnail (?, ?);";
    const { webtoonName, episodeNumber } = req.query;
    const values = [webtoonName, episodeNumber];
    try {
        const [rows] = await conn.query(query, values);
        res.send({ rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }
    });


    //에피소드 썸네일 보여주는 메서드
    server.get('/api/Webtoon_Thumbnail', async (req, res) => {
    const conn = await getConn();
    const query = "call Webtoon_Thumbnail(?);";
    const { webtoonName } = req.query;
    const values = [webtoonName];
    try {
        const [rows] = await conn.query(query, values);
        res.send({ rows });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: '서버 스크립트의 오류' });
    } finally {
        conn.release(); // 연결 해제
    }
    });

}
module.exports = webtoonListAPI;