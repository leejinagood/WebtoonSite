const WebtoonAddService = require('../service/webtoonAddService');
const axios = require('axios');

const WebtoonAddController = {

    // 웹툰 추가
    async addWebtoon(req, res) {
        try {
            const { content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories } = req.body;

            const tokenResponse = await axios.get('http://3.39.187.19:4000/api/adminAuth', {
                headers: {
                Cookie: req.headers.cookie,
                },
            });
            if (tokenResponse.data === '어드민 인증 성공') {

                //유효성 검사
                if (!content || !author || !WebtoonName || !week || !thumbnail) {
                    res.send(400, { message: '내용을 입력하세요' });
                    throw new Error('내용을 입력하세요');
                }
                else if (!/^[A-Za-z]+$/.test(WebtoonEnName)) { 
                    res.send(400, { message: '영어로 웹툰 이름을 입력하세요' });
                    throw new Error('영어로 웹툰 이름을 입력하세요');
                }
                else{
                    const resultMessage = await WebtoonAddService.addWebtoon(content, author, WebtoonName, WebtoonEnName, week, thumbnail, categories);
                    res.send(resultMessage); // "웹툰 추가 성공"
                }
                
            }else {
                res.status(500).json({ message: '권한이 없습니다' });
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

            const tokenResponse = await axios.get('http://3.39.187.19:4000/api/adminAuth', {
                headers: {
                Cookie: req.headers.cookie,
                },
            });
            if (tokenResponse.data === '어드민 인증 성공') {

                // 유효성 검사
                if (!count || !thumbnail) {
                    res.send(400, { message: '내용을 입력하세요' });
                    throw new Error('내용을 입력하세요');
                }
                else if (!/^[A-Za-z]+$/.test(WebtoonEnName)) { 
                    res.send(400, { message: '영어로 웹툰 이름을 입력하세요' });
                    throw new Error('영어로 웹툰 이름을 입력하세요');
                }
                else{
                    const resultMessage = await WebtoonAddService.addEpisode(WebtoonEnName, count, thumbnail, ep);
                    res.send(resultMessage); // "에피소드 추가 성공"
                }
                
            }else {
                res.status(500).json({ message: '권한이 없습니다' });
            }    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: '서버 오류' });
        }
    }

};

module.exports = WebtoonAddController;
