import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { day } = query;
  
  if (day) {
    try {
      const response = await axios.get(`http://107.23.243.5:4000/api/webtoons?pi_vch_condition=${day}`);
      const webtoons = response.data;
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
