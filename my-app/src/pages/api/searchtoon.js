import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { word } = query;
  
  if (word) {
    try {
      const response = await axios.get(`http://43.201.26.187:4000/api/search?word=${word}`);
      const webtoons = response.data;
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
