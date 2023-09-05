import axios from "axios";

export default async function handler(req, res) {
  try {
    // 서버로 요청 보낼 때 쿠키 설정
    const cookies = req.headers.cookie;

    const response = await axios.get(`http://3.37.36.238:4000/api/Token`, {
      headers: {
        // 여기서 "쿠키이름"은 쿠키에 따라 다르게 설정해야 합니다.
        Cookie: cookies // 클라이언트에서 전달된 쿠키를 그대로 요청 헤더에 포함
      }
    });
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching API:", error);
    res.status(500).json({ error: "Error fetching API" });
  }
}
