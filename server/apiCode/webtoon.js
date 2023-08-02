//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {

  const redisClient = require('./redis'); // redis.js 모듈을 가져옴

  // 요일별 웹툰, 전체 웹툰 중 신규웹툰, 좋아요 상위 5개 웹툰
  server.get('/api/webtoons', async (req, res) => {
    const conn = await getConn();
    const { pi_vch_condition } = req.query;

    try {
      const key = `webtoon : ${pi_vch_condition}`; // redis 고유 키 값
      let value = await redisClient.get(key); // 해당 키값으로 데이터 조회

      if (value) {
        // 만약 redis에 데이터가 있다면 그대로 반환 
        res.send(JSON.parse(value)); // 문자열로 파싱

      } else{ // 만약 redis에 데이터가 없다면 db에서 조회

        const [rows] = await conn.query('CALL usp_get_AllWebtoons();');

        const row = rows[0];

      if (pi_vch_condition === 'All') { // pi_vch_condition이 'All'일 때, 웹툰 전체를 조회합니다.
        res.send(row); // row 배열에 저장된 모든 웹툰 정보를 클라이언트로 응답합니다.
      } else {
        // pi_vch_condition이 'All'이 아닌 경우, 해당 조건에 맞는 웹툰을 조회합니다.
      
        const [likes] = await conn.query('call usp_get_totalLike()'); // 좋아요 정보를 가져옵니다.
        const like = likes[0]; // 가져온 좋아요 정보를 like 변수에 저장합니다.
      
        if (pi_vch_condition === 'rank') { // pi_vch_condition이 'rank'일 때, 웹툰 좋아요 상위 top5를 조회합니다.
          const top5Webtoons = row
            .filter((webtoon) => like.some((l) => l.webtoonID === webtoon.webtoonID)) // 좋아요 정보에 해당하는 웹툰만 필터링합니다.
            .sort((a, b) => {
              const likeA = like.find((l) => l.webtoonID === a.webtoonID).totalLikes; // 각 웹툰의 좋아요 수를 가져옵니다.
              const likeB = like.find((l) => l.webtoonID === b.webtoonID).totalLikes;
              return likeB - likeA; // 좋아요 수를 기준으로 내림차순으로 정렬합니다.
            })
            .slice(0, 5); // 상위 5개 웹툰만 선택합니다.
      
          res.send(top5Webtoons); // 상위 5개 웹툰 정보를 클라이언트로 응답합니다.
        } else {
          // pi_vch_condition이 'rank'도 아니고 'All'도 아닌 경우, 주어진 조건(pi_vch_condition)에 해당하는 웹툰을 조회합니다.
      
          const result = [];
          for (let i = 0; i < row.length; i++) { // 모든 웹툰 정보를 순회합니다.
            if (row[i].webtoonWeek === pi_vch_condition) { // 웹툰의 요일 정보가 주어진 조건과 일치하는지 확인합니다.
              const webtoonID = row[i].webtoonID;
              const likesInfo = like.find((l) => l.webtoonID === webtoonID); // 웹툰의 좋아요 정보를 가져옵니다.
              if (likesInfo) {
                // 만약 웹툰의 좋아요 정보가 존재하는 경우, 웹툰 정보에 'totalLikes' 필드를 추가합니다.
                const webtoonWithLikes = {
                  ...row[i],
                  totalLikes: likesInfo.totalLikes,
                };
                result.push(webtoonWithLikes); // 수정된 웹툰 정보를 result 배열에 추가합니다.
              } else {
                // 웹툰의 좋아요 정보가 없는 경우, 웹툰 정보를 그대로 result 배열에 추가합니다.
                result.push(row[i]);
              }
            }
          }
          res.send(result); // 조회된 웹툰 정보를 클라이언트로 응답합니다.
        }
      }        
        //await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
        //res.send(webtoonDetails);
      }
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
      const key = `webtoon_search : ${word}`; //redis의 고유 키값
      let value = await redisClient.get(key); // redis에서 해당 key로 데이터 조회

      if (value) {
        // 만약 redis에 데이터가 있다면 그대로 반환 
        res.send(JSON.parse(value)); //문자열로 파싱
      } else {
        const [rows] = await conn.query(query, [word]);
        const ID = rows[0].map((row) => row.webtoonID); // ID를 추출

        // 만약 redis에 데이터가 없다면 db(mysql)에서 조회
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
        await redisClient.set(key, JSON.stringify(webtoonDetails)); // 조회한 데이터를 JSON 형태로 변환하여 redis에 저장
        res.send(webtoonDetails);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
  });

}
module.exports = webtoonAPI;