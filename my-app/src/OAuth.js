const CLIENT_ID = "c3f27e51572a41e42f4204019b897192";
const REDIRECT_URL = "http://localhost:3000";

export const Kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;