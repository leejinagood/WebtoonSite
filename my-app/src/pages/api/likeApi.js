import axios from "axios";

export default async function handler(req, res) {
  const { token } = req.body;
  
  if (token) {
    try {
      const response = await axios.get(`http://192.168.0.98:4000/api/update_like`);
      const Like = response.data;
      res.status(200).json(Like);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
