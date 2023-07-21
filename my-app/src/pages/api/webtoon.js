import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { webtoonName ,ep} = query;

  if (webtoonName) {
    try {
      const response = await axios.get(`http://192.168.0.98:4000/api/webtoonpage?webtoonName=${webtoonName}&ep=${ep}`);
      const webtoons = response.data;
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
