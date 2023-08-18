import axios from "axios";

export default async function handler(req, res) {
  const { UserEmail , EnName } = req.body;
  
  if (UserEmail) {
    try {
      const response = await axios.get(`http://107.23.243.5:4000/api/update_like`,({
        EnName: EnName,
        UserEmail: UserEmail,
      }));
      const Like = response.data;
      res.status(200).json(Like);
    } catch (error) {
      console.error("Error fetching API:", error);
      res.status(500).json({ error: "Error fetching API" });
    }
  }

  
}
