import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { webtoonName } = query;

  if (webtoonName) {
    try {
      const response = await axios.get(`http://192.168.0.98:4000/api/Webtoon_Thumbnail?webtoonName=${encodeURIComponent(webtoonName)}`);
      const thumbnail = response.data.rows[0]?.[0]?.Webtoon_Thumbnail;
      res.status(200).json({ thumbnail });
      return thumbnail || "";
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  } else {
    res.status(400).json({ error: "Missing parameters: name" });
  }
}
