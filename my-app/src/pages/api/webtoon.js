import axios from "axios";

export default async function handler(req, res) {
  const { EnName ,ep} = req.query;
  console.log(EnName);

  if (EnName) {
    try {
      const response = await axios.get(`http://192.168.0.98:4000/api/webtoonpage?EnName=${EnName}&ep=${ep}`);
      const webtoons = response.data;
      
      
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
