const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video"
    },
    responseTo: {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    },
    content: {
      type: String
    }
  },
  { timestamp: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
