// 서버 측 API (api/webtoondetail.js)

import axios from "axios";

export default async function handler(req, res) {
  const { query } = req;
  const { id } = query;

  if (id) {
    try {
      const response = await axios.get(`http://3.39.187.19:4000/api/show_like?id=${id}`);

      const likecount = response.data;
      res.status(200).json({ likecount });

    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  } else {
    res.status(400).json({ error: "Missing parameters" + likecount });

  }
}
