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

      if (pi_vch_condition === 'All') { 
        res.send(row); // 모든 웹툰 정보
      } else {
        const [likes] = await conn.query('call usp_get_totalLike()'); // 좋아요 가져오기
        const like = likes[0]; 
      
        if (pi_vch_condition === 'rank') { 
          const top5Webtoons = row
            .filter((webtoon) => like.some((l) => l.webtoonID === webtoon.webtoonID)) // 좋아요 결과에 해당하는 ID를 가진 웹툰
            .sort((a, b) => {
              const likeA = like.find((l) => l.webtoonID === a.webtoonID).totalLikes; // 각 웹툰의 좋아요 수를 가져옵니다.
              const likeB = like.find((l) => l.webtoonID === b.webtoonID).totalLikes;
              return likeB - likeA; // 좋아요 수를 기준으로 내림차순으로 정렬합니다.
            })
            .slice(0, 5); // 상위 5개 웹툰만
      
          res.send(top5Webtoons); // 응답으로
        } else {
          const result = [];

          for (let i = 0; i < row.length; i++) { 
            if (row[i].webtoonWeek === pi_vch_condition) { // 요일에 해당하는 
              const webtoonID = row[i].webtoonID;
              const likesInfo = like.find((l) => l.webtoonID === webtoonID); // 좋아요 갖고오기
              if (likesInfo) {
                // totalLikes 필드 추가
                const webtoonWithLikes = {
                  ...row[i],
                  totalLikes: likesInfo.totalLikes,
                };
                result.push(webtoonWithLikes); // 수정된 웹툰 정보를 다시 result로
              } else {
                // 웹툰의 좋아요 정보가 없는 경우
                result.push(row[i]);
              }
            }
          }

          res.send(result); 
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