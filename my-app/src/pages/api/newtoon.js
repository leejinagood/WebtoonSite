import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("http://192.168.0.98:4000/api/webtoons");
    const data = await response.data; // response.data가 해결될 때까지 대기
    const { thumbnail, webtoon_name, webtoon_en_name } = data; // 해결된 데이터에서 추출
    res.status(200).json({ thumbnail, webtoon_name, webtoon_en_name });
  } catch (error) {
    console.error("Error fetching API:", error);
    res.status(500).json({ error: "Error fetching API" });
  }
}
