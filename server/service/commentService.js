const axios = require('axios');
const { getConn } = require('../database');

const CommentService = {
    async viewComment(EnName, ep) {
        const conn = await getConn();

        try {
            const values = [EnName, ep];
            const viewCommentQuery = 'CALL usp_get_comment(?, ?);';
            const [result] = await conn.query(viewCommentQuery, values);

            return result[0];
        } catch (error) {
            throw error;
        } finally {
            conn.release();
        }
    },

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
