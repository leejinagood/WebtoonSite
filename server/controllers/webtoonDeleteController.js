const WebtoonDeleteService = require('../service/webtoonDeleteService');

const WebtoonDeleteController = {
    // 웹툰 삭제
    async deleteWebtoon(req, res) {
        try {
            const { EnName } = req.body;
            if (!EnName) {
                throw new Error('내용을 입력하세요');
            }else{
                const resultMessage = await WebtoonDeleteService.deleteWebtoon(EnName);
                res.send(resultMessage);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    },

    // 에피소드 삭제 
    async deleteEpisode(req, res) {
        try {
            const { EnName, ep } = req.body;
            if (!EnName || !ep) {
                throw new Error('내용을 입력하세요');
            }else{
                const resultMessage = await WebtoonDeleteService.deleteEpisode( EnName, ep);
                res.send(resultMessage);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = WebtoonDeleteController;
