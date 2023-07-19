//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {

//day를 파라미터로 받아와 웹툰 제목을 출력하는 메서드 
server.get('/api/daywebtoon', async (req, res) => {
  const conn = await getConn();
  const { day } = req.query;
  const query = 'CALL usp_get_dayWebtoon(?);';
  const WebtoonDetailquery = 'CALL usp_get_Webtoon_ID(?);';
  try {
    const [row] = await conn.query(query, [day]); 
    const result = row[0].map((row) => row.webtoonID); //day로 출력된 ID를 result값에

    const webtoonDetails = [];
    for (const webtoonID of result) {
      const [rows] = await conn.query(WebtoonDetailquery, [webtoonID]);
      const [row] = rows[0]; //받아온 ID를 다시 WebtoonDetailquery 넣고 추출된 웹툰 제목과 썸네일의 값
      webtoonDetails.push({
        webtoon_name: row.webtoonName, // 제목
        webtoon_en_name: row.webtoonEnName, // 영어제목
        thumbnail: row.webtoonThumbnail, // 썸네일
      });
    }
    //응답은 웹툰 제목과, 영어제목, 썸네일을 보냄
    res.send(webtoonDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release();
  }
});


//새롭게 업로드된지 일주일 된 신규 웹툰의 제목을 출력
server.get('/api/new', async (req, res) => {
  const conn = await getConn();
  const query = 'call usp_get_New();';
  const WebtoonDetailquery = 'CALL usp_get_Webtoon_ID(?);';
  try{
  let [rows] = await conn.query(query);
  const ID = rows[0].map((row) => row.webtoonID); //웹툰 제목만 출력
  
  const webtoonDetails = [];
  for (const webtoonID of ID) {
    const [rows] = await conn.query(WebtoonDetailquery, [webtoonID]);
    const [row] = rows[0]; //받아온 ID를 다시 WebtoonDetailquery 넣고 추출된 웹툰 제목과 썸네일의 값
    webtoonDetails.push({
      webtoon_name: row.webtoonName, // 제목
      webtoon_en_name: row.webtoonEnName, // 영어제목
      thumbnail: row.webtoonThumbnail, // 썸네일
    });
  }
  //응답은 웹툰 제목과, 영어제목, 썸네일을 보냄
  res.send(webtoonDetails);
  }catch(error) {
    console.error(error);
    res.status(500).json({ error: '서버 스크립트의 오류' });
  } finally {
    conn.release(); // 연결 해제
  }
});


//메인페이지에서 좋아요가 가장 높은 웹툰 중 top5 제목과 작가, 썸네일 출력
server.get('/api/popular', async (req, res) => {
    const conn = await getConn();
    const query = 'call usp_get_Like_Top();'; 
    try {
      const [rows] = await conn.query(query);
      const result = rows[0].map((row) => ({
        webtoon_name: row.webtoonName,
        author: row.webtoonAuthor,
        thumbnail: row.webtoonThumbnail
      }));
      res.send(result);
      // console.log(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release();
    }
  });


  //검색하면 그 단어를 포함한 웹툰 제목과 작가, 카테고리를 출력하는 메서드
server.get('/api/search', async (req, res) => {
    const conn = await getConn();
    const { word } = req.query;
    const query = 'CALL Search_Webtoon(?);'; //제목과, 작가와, 카테고리 출력
    try {
      const [rows] = await conn.query(query, [word]);
      // console.log(rows);
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
  });
  





}
module.exports = webtoonAPI;