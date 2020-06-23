import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";
import axios from "axios";

function ReplyComment({ commentList, videoId, commentId, onUpdate }) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [Openreply, setOpenreply] = useState(false);
  console.log("reply:", commentList.length, ChildCommentNumber);
  useEffect(() => {
    axios.post("/api/comment/getCount", { commentId }).then(res => {
      if (res.data.success) {
        setChildCommentNumber(res.data.commentCount.length);
      } else {
        alert("Failed to get count about comment");
      }
    });
  }, [commentList]);

  const onOpenReply = () => {
    setOpenreply(!Openreply);
  };
  // console.log("reply:", commentList, commentId);
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: "14px", margin: 0, color: "gray" }}
          onClick={onOpenReply}
        >
          View {ChildCommentNumber} more comment(s)
        </p>
      )}
      {Openreply &&
        commentList.map(
          (comment, idx) =>
            comment.responseTo === commentId && (
              <div key={idx} style={{ width: "80%", marginLeft: "40px" }}>
                <SingleComment
                  comment={comment}
                  videoId={videoId}
                  onUpdate={onUpdate}
                />
                <ReplyComment
                  commentList={commentList}
                  videoId={videoId}
                  commentId={comment._id}
                  onUpdate={onUpdate}
                />
              </div>
            )
        )}
    </div>
  );
}

export default ReplyComment;
