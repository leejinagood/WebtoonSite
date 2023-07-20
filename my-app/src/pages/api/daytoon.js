import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { day } = query;

  if (day) {
    try {
      const response = await axios.get(`http://192.168.0.98:4000/api/webtoons?day=${day}`);
      const webtoons = response.data;
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  } else {
    try {
      const response = await axios.get("http://192.168.0.98:4000/api/webtoons");
      const webtoons = response.data;
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }
}
