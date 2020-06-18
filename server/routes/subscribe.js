const express = require("express");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

router.post("/subscribe", (req, res) => {
  // console.log("subscribe:", req.body);
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/subscribedNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, count: doc.length });
  });
});

module.exports = router;
