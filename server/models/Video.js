const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    writer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, maxlength: 50 },
    description: { type: String, maxlength: 200 },
    privacy: { type: Number },
    category: { type: String },
    filePath: { type: String },
    thumbnail: { type: String },
    duration: { type: String },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
