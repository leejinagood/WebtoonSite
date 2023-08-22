import axios from "axios";

export default async function handler(req, res) {
  const { ID ,ep} = req.query;
  console.log(ID);

  if (ID) {
    try {
      const response = await axios.get(`http://3.39.187.19:4000/api/webtoonpage?ID=${ID}&ep=${ep}`);
      const webtoons = response.data;
      
      
      res.status(200).json(webtoons);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
