const WebtoonService = require('../service/webtoonService');

const WebtoonController = {

    // 웹툰 정보
    async getWebtoons(req, res) {
        try {
            // All 또는 요일
            const { pi_vch_condition } = req.query;
            const webtoon = await WebtoonService.getWebtoons(pi_vch_condition);
            res.send(webtoon); // 웹툰 내용
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

 
    // 검색
    async searchWebtoon(req, res) {
        try {
            const { word } = req.query;
            const webtoon = await WebtoonService.searchWebtoon(word);
            res.send(webtoon); // 웹툰 내용
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },


    // 카테고리 검색
    async searchByCategory(req, res) {
        try {
            const { word } = req.query;
            const webtoon = await WebtoonService.searchByCategory(word);
            res.send(webtoon); // 웹툰 내용
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
    
};

module.exports = WebtoonController;
