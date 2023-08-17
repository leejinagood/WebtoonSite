const AdminAuthService = require('../service/adminAuthService');

const AdminAuthController = {

    // 어드민 검증
    async verifyAdmin(req, res) {
        try {
            const cookies = req.headers.cookie;
            const resultMessage = await AdminAuthService.verifyAdmin(cookies);
            if(resultMessage === '어드민 인증 성공'){
                res.send(resultMessage); 
            }else{
                res.json({ message: '권한이 없습니다' });
            }
        } catch (error) {
            console.error(error);
            res.json({ message: '어드민 인증 실패' });
        }
    },
    
};

module.exports = AdminAuthController;
