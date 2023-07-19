//웹툰 리스트에 사용될 api

const webtoonListAPI = (server, getConn) => {

//웹툰 list에 들어갈 정보
//Rank에서 웹툰 이미지나 제목을 클릭했을 때 보이는 웹툰 정보들
server.get('/api/webtoondetail', async (req, res) => {
const conn = await getConn();
const { name } = req.query;
const query = 'call Webtoon_Detail (?);';
const Idquery = 'call usp_get_webtoonID(?);';
try {
    //웹툰 제목에서 webtoonID를 뽑아 변수에 넣음
    const [resultId] = await conn.query(Idquery, [name]);
    const webtoonID = resultId[0][0].webtoonID;

    //webtoonID를 받고 webtoonDetail 출력
    const [rows] = await conn.query(query, [webtoonID]);
    console.log(rows); // 확인용 로그

    const webtoons = rows[0].map(row => ({
    webtoon_name: row.webtoonName, // 웹툰 제목
    webtoon_en_name : row.webtoonEnName, //웹툰 영어 제목
    author: row.webtoonAuthor, // 작가 이름
    like: row.LikesCount, // 좋아요 갯수
    content: row.webtoonContent, // 웹툰 상세 설명
    thumbnail: row.webtoonThumbnail, //웹툰 썸네일
    week: row.webtoonWeek // 요일
    }));
} catch (error) {
    console.error(error);
    res.status(500).send({ error: '서버 스크립트의 오류' });
} finally {
    conn.release(); // 연결 해제
}
});


//다음 화가 존재하는지 안 하는지 1, 0으로 전달
server.get('/api/next_episode', async(req, res) => {
const conn = await getConn();
const query = 'call episode_next(?);';
const {Webtoon_Name, Episode_Number} = req.query;
const values = [Webtoon_Name, Episode_Number] //웹툰 이름과 현재 에피소드 번호를 넘겨줌. 
try{
    const [result] = await conn.query(query, [values]);
    //result에서 EXISTS 값을 추출
    const exists = result[0][0]["EXISTS (\n\tselect Episode_Number \n\tfrom Episode_Table \n    join Webtoon_Table on Episode_Table.Webtoon_Id = Webtoon_Table.Webtoon_Id\n\twhere Episode_Table.Episode_Number = EpisodeNumber + 1 and  Webtoon_Table.Webtoon_Name = WebtoonName\n    )"];
    // console.log(exists);
    //다음 화가 존재하면 1 아니면 0
    res.send({ exists: exists ? 1 : 0 }); //response 하기 전에 상태코드를 지정하여 보내주기
}catch (error) {
    // console.error(error); 너무 많이 호출되기 때문에 임시 주석처리
    res.status(500).send({ error: '서버 스크립트의 오류' });
} finally {
    conn.release(); // 연결 해제
}
})


//이전 화가 존재하는지 안 하는지 1, 0 으로 알려줌
server.get('/api/prev_episode', async(req, res) => {
const conn = await getConn();
const query = 'call episode_prev(?);';
const {Webtoon_Name, Episode_Number} = req.query;
const values = [Webtoon_Name, Episode_Number] //웹툰 이름과 현재 에피소드 번호를 넘겨줌. 
try{
    const [result] = await conn.query(query, [values]);
    //result에서 EXISTS 값을 추출
    const exists = result[0][0]["EXISTS (\n\tselect Episode_Number \n\tfrom Episode_Table \n    join Webtoon_Table on Episode_Table.Webtoon_Id = Webtoon_Table.Webtoon_Id\n\twhere Episode_Table.Episode_Number = EpisodeNumber - 1 and  Webtoon_Table.Webtoon_Name = WebtoonName\n    )"];
    // console.log(exists);
    //이전 화가 존재하면 1 아니면 0
    res.send({ exists: exists ? 1 : 0 }); //response 하기 전에 상태코드를 지정하여 보내주기 
}catch (error) {
    // console.error(error); 너무 많이 호출되기 때문에 임시 주석처리
    res.status(500).send({ error: '서버 스크립트의 오류' });
} finally {
    conn.release(); // 연결 해제
}
})


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