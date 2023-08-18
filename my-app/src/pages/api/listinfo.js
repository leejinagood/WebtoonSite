// 서버 측 API (api/webtoondetail.js)

import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { ID } = query;

  if (ID) {
    try {
      const response = await axios.get(`http://107.23.243.5:4000/api/webtoondetail?ID=${ID}`);

      const webtoonData = response.data;
      res.status(200).json({ webtoonData });

    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  } else {
    res.status(400).json({ error: "Missing parameters" + ID });

  }
}
