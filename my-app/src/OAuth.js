const CLIENT_ID = "6298e4ccbcce464caa91f6a4a0e9c7a3";
const REDIRECT_URL = "http://localhost:3000";

export const Kakao_Auth_Url = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;