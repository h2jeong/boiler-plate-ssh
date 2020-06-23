const express = require("express");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");

router.post("/subscribe", (req, res) => {
  // console.log("subscribe:", req.body);
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/unSubscribe", (req, res) => {
  const { userTo, userFrom } = req.body;
  Subscriber.findOneAndDelete({ userTo, userFrom }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/subscribed", (req, res) => {
  const { userTo, userFrom } = req.body;
  // console.log("server:", req.body);
  Subscriber.find({ userTo, userFrom }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    // console.log("subscribed:", !!doc.length);
    return res.status(200).json({ success: true, subscribed: !!doc.length });
  });
});

router.post("/getCount", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    // console.log("getCount:", doc, doc.length);
    return res.status(200).json({ success: true, count: doc.length });
  });
});

module.exports = router;
