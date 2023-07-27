//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {
  
  const { set, get } = require("./redis");

  // 요일별 웹툰, 전체 웹툰 중 신규웹툰, 좋아요 상위 5개 웹툰
  server.get('/api/webtoons', async (req, res) => {
    const conn = await getConn();
    const { pi_vch_condition } = req.query;

    // 1개의 sp를 4개로 나눔
    // const query = 'CALL usp_get_Webtoon(?);';

    // 파라미터 조건에 맞는 ID를 받아온 후 ID에 맞는 웹툰 정보를 추출하는 sp에 대입
    const webtoonQuery = 'CALL usp_get_webtoonDetail_ID(?);'; // ID를 받아와 웹툰 정보를 출력하는 SP

    try {
      let rows;
      if (pi_vch_condition === 'All') {
        [rows] = await conn.query('CALL usp_get_AllWebtoons();'); // All일 때 웹툰 전체
      } else if (pi_vch_condition === 'rank') {
        [rows] = await conn.query('CALL usp_get_Top5LikedWebtoons();'); // rank일 때 웹툰 좋아요 상위 top5
      } else if (pi_vch_condition === 'new') {
        [rows] = await conn.query('CALL usp_get_NewWebtoons();'); // new일 때 생성된지 1주일 된 웹툰들
      } else {
        [rows] = await conn.query('CALL usp_get_WebtoonsByDay(?);', [pi_vch_condition]); // 요일받는 파라미터
      }

      const ID = rows[0].map((row) => row.webtoonID); // ID를 추출

      const webtoonDetails = []; // 배열로 초기화
      for (const webtoonID of ID) { // 요일별 웹툰과 신규 웹툰 전부 ID를 받음.
        const [rows] = await conn.query(webtoonQuery, [webtoonID]);
        const [row] = rows[0]; // 배열의 첫번째 부분
        webtoonDetails.push({
          webtoon_name: row.webtoonName, // 웹툰 제목과
          webtoon_en_name: row.webtoonEnName, // 웹툰 영어 제목과
          thumbnail: row.webtoonThumbnail, // 웹툰 썸네일을 추출
          author: row.webtoonAuthor, // 웹툰 작가 추출
          week: row.webtoonWeek, // 무슨 요일에 연재하는지
          like: row.LikesCount // 좋아요 갯수
        });
      }
      
      res.send(webtoonDetails);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release();
    }
  });



  //검색하면 그 단어를 포함한 웹툰 제목과 영어제목, 썸네일을 출력하는 메서드
  server.get('/api/search', async (req, res) => {
    const conn = await getConn();
    const { word } = req.query;
    const query = 'CALL usp_get_search(?);'; //검색한 웹툰의 Id를 출력
    const webtoonQuery = 'CALL usp_get_Webtoon_ID(?);'; //웹툰 정보 출력
    try { 
      const [rows] = await conn.query(query, [word]);
      const ID = rows[0].map((row) => row.webtoonID); // ID를 추출

      const webtoonDetails = []; // 배열로 초기화
      for (const webtoonID of ID) { 
        const [rows] = await conn.query(webtoonQuery, [webtoonID]);
        const [row] = rows[0]; // 배열의 첫번째 부분 
        webtoonDetails.push({
          webtoon_name: row.webtoonName, // 웹툰 제목과
          webtoon_en_name: row.webtoonEnName, // 웹툰 영어 제목과
          thumbnail: row.webtoonThumbnail, // 웹툰 썸네일을 추출
          webtoon_author: row.webtoonAuthor, // 웹툰 작가 추출
          categoris : row.CategoryKinds //카테고리들
        });
      }
      res.send(webtoonDetails); //응답으로 보내기
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
  });

}
module.exports = webtoonAPI;