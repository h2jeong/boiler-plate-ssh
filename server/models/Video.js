const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, maxlength: 50 },
    description: { type: String, maxlength: 200 },
    privacy: { type: Number },
    category: { type: Number },
    filePath: { type: String },
    thumbnail: { type: String },
    duration: { type: String },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
