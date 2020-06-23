const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

router.post("/getComments", (req, res) => {
  Comment.find({ videoId: req.body.videoId })
    .populate("writer")
    .exec((err, commentList) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, commentList });
    });
});

router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, comment });
  });
});

router.post("/getCount", (req, res) => {
  Comment.find({ responseTo: req.body.commentId }).exec((err, commentCount) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, commentCount });
  });
});
module.exports = router;
