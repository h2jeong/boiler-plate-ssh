const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/DisLike");

router.post("/getCountOfLike", (req, res) => {
  const variable = req.body;
  console.log("like:", variable);
  Like.find(variable).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, likes });
  });
});

router.post("/getCountOfDislike", (req, res) => {
  const variable = req.body;
  Dislike.find(variable).exec((err, dislikes) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, dislikes });
  });
});

router.post("/addLike", (req, res) => {
  console.log("addlike:", req.body);
  const like = new Like(req.body);

  like.save((err, like) => {
    if (err) return res.status(400).json({ success: false, err });

    Dislike.findOneAndDelete(variable).exec((err, result) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, result });
    });
  });
});

router.post("/cancelLike", (req, res) => {
  const variable = req.body;
  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result });
  });
});
module.exports = router;
