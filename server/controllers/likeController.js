// const LikeModel = require('../models/likeModel');
// const axios = require('axios');

// const LikeController = {
//   async showLikes(req, res) {
//     try {
//       const { id } = req.query;
//       const likes = await LikeModel.showLikes(id);
//       res.send(likes);
//       console.log(likes);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//     }
//   },

//   async updateLike(req, res) {
//     try {
//       const { userID, EnName } = req.body;
//       const result = await LikeModel.updateLike(userID, EnName);
//       res.send(result);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: '서버 오류' });
//     }
//   }
// };

// module.exports = LikeController;
