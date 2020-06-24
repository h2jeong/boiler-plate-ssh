const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/DisLike");

router.post("/getCountOfLike", (req, res) => {
  const variable = req.body;

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
  const like = new Like(req.body);

  like.save((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    Dislike.findOneAndDelete(req.body).exec((err, dislikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, dislikeResult });
    });
  });
});

router.post("/cancelLike", (req, res) => {
  const variable = req.body;
  Like.findOneAndDelete(variable).exec((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, likeResult });
  });
});

router.post("/addDislike", (req, res) => {
  const dislike = new Dislike(req.body);

  dislike.save((err, dislikeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    Like.findOneAndDelete(req.body).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, likeResult });
    });
  });
});

router.post("/cancelDislike", (req, res) => {
  const variable = req.body;
  Dislike.findOneAndDelete(variable).exec((err, dislikeResult) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, dislikeResult });
  });
});

module.exports = router;
