const axios = require('axios');

const clientId = 'UKNzqgTrzOB6En83K2Bq';
const clientSecret = '7ZuKjkeTOm';
const sourceLang = 'ko';
const targetLang = 'en';
const textToTranslate = '번역할 텍스트';

const translateText = async () => {
  const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

  try {
    const response = await axios.post(
      apiUrl,
      {
        source: sourceLang,
        target: targetLang,
        text: textToTranslate,
      },
      {
        headers: {
          'X-Naver-Client-Id': clientId,
          'X-Naver-Client-Secret': clientSecret,
        },
      }
    );

    const translatedText = response.data.message.result.translatedText;
    console.log('번역 결과:', translatedText);
  } catch (error) {
    console.error('번역 오류:', error);
  }
};

translateText();
