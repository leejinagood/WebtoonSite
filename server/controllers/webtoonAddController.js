const WebtoonAddService = require('../service/webtoonAddService');

const WebtoonAddController = {

    // 웹툰 추가
    async addWebtoon(req, res) {
        try {
            const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories } = req.body;

            //유효성 검사
            if (!content || !author || !WebtoonName || !week || !thumbnail) {
                throw new Error('내용을 입력하세요');
            }
            else if (!/^[A-Za-z]+$/.test(WebtoonEnName)) { 
                throw new Error('영어로 웹툰 이름을 입력하세요');
            }
            else{
                const resultMessage = await WebtoonAddService.addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories);
                res.send(resultMessage); // "웹툰 추가 성공"
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    
    // 에피소드 추가
    async addEpisode(req, res) {
        try {
            const { WebtoonEnName, count, thumbnail, ep } = req.body;

            // 유효성 검사
            if (!count || !thumbnail) {
                throw new Error('내용을 입력하세요');
            }
            else if (!/^[A-Za-z]+$/.test(WebtoonEnName)) { 
                throw new Error('영어로 웹툰 이름을 입력하세요');
            }
            else{
                const resultMessage = await WebtoonAddService.addEpisode(WebtoonEnName, count, thumbnail, ep);
                res.send(resultMessage); // "에피소드 추가 성공"
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }

};

module.exports = WebtoonAddController;
