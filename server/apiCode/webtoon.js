//웹툰의 정보를 볼 수 있는 api

//요일별 웹툰, 전체 웹툰 중 신규웹툰


const webtoonAPI = (server, getConn) => {

  
  server.get('/api/webtoons', async (req, res) => {
    const conn = await getConn();
    const { day , rank5} = req.query;
    const query = day
      ? 'CALL usp_get_dayWebtoon(?);' // day 매개변수가 있는 경우
      : rank5
      ? 'CALL usp_get_Like_Top(?);' // rank5 매개변수가 있는 경우
      : 'CALL usp_get_New();'; // 매개변수가 없는 경우 
    // day라는 매개변수가 있을 때는 usp_get_dayWebtoon 프로시저 호출 (요일별 웹툰ID 출력)
    // rank5라는 매개변수가 있을 때는 usp_get_Like_Top 프로시저 호출 (좋아요 top5 웹툰 ID 출력)
    // 매개변수가 없을 때는 그냥 전체 웹툰에서의 일주일 된 신규웹툰 ID를 출력
    const WebtoonDetailquery = 'CALL usp_get_webtoonDetail_ID(?);'; // ID를 받아와 웹툰 정보를 출력하는 SP
    
    try {
      let [rows] = await conn.query(query, [day]); // day를 파라미터로 받아온 후
      const ID = rows[0].map((row) => row.webtoonID); // ID를 추출
  
      const webtoonDetails = []; // 배열로 초기화
      for (const webtoonID of ID) { // 요일별 웹툰과 신규 웹툰 전부 ID를 받아서 
        const [rows] = await conn.query(WebtoonDetailquery, [webtoonID]);
        const [row] = rows[0];
        webtoonDetails.push({
          webtoon_name: row.webtoonName, // 웹툰 제목과
          webtoon_en_name: row.webtoonEnName, // 웹툰 영어 제목과
          thumbnail: row.webtoonThumbnail, // 웹툰 썸네일을 추출
          author: row.webtoonAuthor, // 웹툰 작가 추출
          week: row.webtoonWeek, // 무슨 요일에 연재하는지
          like: row.LikesCount // 좋아요 갯수
        });
      }
      res.send(webtoonDetails); // 응답으로 보냄
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release();
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