const redisClient = require('../../redis');
const { getConn } = require('../../database');
const jwt = require('jsonwebtoken');

function AuthAdminToken(cookies) {
    if (typeof cookies === 'string') {
        const resultCookie = cookies.split(';');
        const tokenCookie = resultCookie.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
            const token = tokenCookie.split('=')[1];
            try {
                const decodedToken = jwt.verify(token, 'your-secret-key');
                if (decodedToken && decodedToken.UserEmail) {
                    return decodedToken.UserEmail;
                }
            } catch (error) {
                console.error('토큰이 없음 = ', error);
            }
        }
    }
    return null;
}

const AdminAuthService = {

    async verifyAdmin(cookies) {
        const userEmail = AuthAdminToken(cookies);
        if (userEmail === 'admin') { 
            return '어드민 인증 성공';
        } else {
            return '어드민 인증 실패';
        }
    }  

};

module.exports = AdminAuthService;
