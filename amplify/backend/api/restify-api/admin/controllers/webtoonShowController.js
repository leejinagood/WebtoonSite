const WebtoonShowService = require('../service/webtoonShowService');

const WebtoonShowController = {

    // 웹툰 전체 정보
    async getWebtoon(req, res) {
        try {
            const webtoon = await WebtoonShowService.getWebtoon();
            res.send(webtoon); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },


    // 웹툰 리스트
    async getWebtoonList(req, res) {
        try {
            const { ID } = req.query;
            const webtoonList = await WebtoonShowService.getWebtoonList(ID);
            res.send(webtoonList); // 아이디에 해당하는 웹툰 리스트 정보
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },
    
};

module.exports = WebtoonShowController;
