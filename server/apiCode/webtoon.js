//웹툰의 정보를 볼 수 있는 api

const webtoonAPI = (server, getConn) => {

//요일별 서브페이지
//url에서 요일을 받아와 웹툰 제목을 출력하는 메서드
server.get('/api/daywebtoon', async (req, res) => {
    const conn = await getConn();
    const { day } = req.query;
    const query = 'CALL Day_Webtoon(?);';
    try {
      const [rows] = await conn.query(query, [day]);
      //웹툰 정보 추출 
      const webtoons = rows[0].map(row => ({
        webtoon_name: row.Webtoon_Name, //제목
        author: row.Webtoon_Author, //작가
        like: row.Likes_Count //좋아요 갯수
      }));
      // console.log({webtoons});
      res.send({ webtoons });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release();
    }
  });


//메인페이지에서 좋아요가 가장 높은 웹툰 중 top5 제목과 작가 출력
server.get('/popular', async (req, res) => {
    const conn = await getConn();
    const query = 'CALL Like_Top();'; // 프로시저 호출
    try {
      const [rows] = await conn.query(query);
      const result = rows[0].map((row) => ({
        webtoon_name: row.Webtoon_Name,
        author: row.Webtoon_Author
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
  

//새롭게 업로드된지 일주일 된 신규 웹툰의 제목을 출력
server.get('/api/new', async (req, res) => {
    const conn = await getConn();
    const query = 'SELECT Webtoon_Table.Webtoon_Name FROM Webtoon_Table JOIN Webtoon_Detail_Table ON Webtoon_Table.Webtoon_Id = Webtoon_Detail_Table.Webtoon_Id WHERE Webtoon_Date >= DATE_SUB(NOW(), INTERVAL 7 DAY);';
    try{
    let [rows] = await conn.query(query);
    const result = rows.map((row) => row.Webtoon_Name); //웹툰 제목만 출력
    // console.log({result});
    res.send({result});
    }catch(error) {
      console.error(error);
      res.status(500).json({ error: '서버 스크립트의 오류' });
    } finally {
      conn.release(); // 연결 해제
    }
});



}
module.exports = webtoonAPI;