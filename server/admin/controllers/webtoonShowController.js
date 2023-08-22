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
    

    // 검색 웹툰
    async searchWebtoonList(req, res) {
        try {
            const { word } = req.query;
            const webtoon = await WebtoonShowService.searchWebtoonList(word);
            res.send(webtoon); // 웹툰 내용
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },
};

module.exports = WebtoonShowController;
