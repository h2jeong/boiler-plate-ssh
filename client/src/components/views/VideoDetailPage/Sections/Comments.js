import React from "react";
import Title from "antd/lib/typography/Title";
import SingleComment from "./SingleComment";
import InputForm from "./InputForm";
import ReplyComment from "./ReplyComment";

function Comments({ videoId, commentList, onUpdate }) {
  console.log("comments:", commentList.length);
  return (
    <div style={{ paddingTop: "2rem" }}>
      <Title level={3}>Replies</Title>
      <hr />
      {/* commentList */}
      {commentList &&
        commentList.map(
          (comment, idx) =>
            !comment.responseTo && (
              <div key={idx}>
                <SingleComment
                  comment={comment}
                  onUpdate={onUpdate}
                  videoId={videoId}
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
      {/* replyComment */}
      {/* inputForm */}
      <br />
      <InputForm videoId={videoId} onUpdate={onUpdate} />
    </div>
  );
}

export default Comments;
