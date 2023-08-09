//웹툰 삭제 api (adminpage)

const webtoonDeleteApi = (server, getConn) => {

    server.del('/api/webtoonDelete', async (req, res) => {
        const conn = await getConn();
        const { WebName } = req.query;

        const webtoonQuery = 'CALL usp_delete_webtoon(?);';

        try {
            await conn.query(webtoonQuery, WebName); 
            res.send("삭제 성공");
        } catch (error) {
            res.status(500).json('입력 실패');
        } finally {
            conn.release();
        }
    });
    

}
module.exports = webtoonDeleteApi;