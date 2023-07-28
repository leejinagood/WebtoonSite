//웹툰 추가 api (adminpage)

const webtoonAddApi = (server, getConn) => {

    //웹툰 추가 메서드 
    server.post('/api/webtoonAdd', async (req, res) => {
        const conn = await getConn();
        const { content, author, WebtoonName, WebtoonEnName, week, thumbnail } = req.body;
        const values = [content, author, WebtoonName, WebtoonEnName];
        const webtoonQuery = 'CALL usp_post_webtoon(?, ?, ?, ?);';
        const EnName = [WebtoonEnName];
        const webtoonIdQuery = 'CALL usp_get_webtoonID_EnName (?);';
        const webtoonDetailQuery = 'CALL usp_post_webtoonDetail(?,?,?)';
    
        try {
            await conn.query(webtoonQuery, values); 
    
            const result = await conn.query(webtoonIdQuery, EnName);
            const Id = result[0][0]; 
            const detail = [Id, week, thumbnail];
            await conn.query(webtoonDetailQuery, detail);
    
            res.send("웹툰 생성 성공");
        } catch (error) {
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    

}
module.exports = webtoonAddApi;