const { getConn } = require('../database');

const CommentService = {

    // 댓글 보기
    async viewComment(EnName, ep) {
        const conn = await getConn();

        try {
            const values = [EnName, ep];
            const viewCommentQuery = 'CALL usp_get_comment(?, ?);';
            const [result] = await conn.query(viewCommentQuery, values);

            return result[0]; // 댓글 내용들 반환
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },


    // 댓글 삽입 
    async insertComment(Ep, WebEnName, userID, content) {
        const conn = await getConn();

        try {
            const values = [Ep, WebEnName, userID, content];
            const insertQuery = 'CALL usp_post_comment(?, ?, ?, ?);';

            await conn.query(insertQuery, values);

            return '댓글이 성공적으로 작성되었습니다.';
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    }
    
};

module.exports = CommentService;
