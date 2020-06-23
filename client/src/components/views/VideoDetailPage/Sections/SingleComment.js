import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import InputForm from "./InputForm";

function SingleComment({ comment, onUpdate, videoId }) {
  const [Openreply, setOpenreply] = useState(false);
  const onOpenReply = () => {
    setOpenreply(!Openreply);
  };
  // console.log("single:", comment, comment._id);

  return (
    <>
      <Comment
        actions={[
          <span key="comment-nested-reply-to" onClick={onOpenReply}>
            Reply to
          </span>
        ]}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt={comment.writer.name} />}
        content={<p>{comment.content}</p>}
      />
      {Openreply && (
        <InputForm
          videoId={videoId}
          onUpdate={onUpdate}
          commentId={comment._id}
        />
      )}
    </>
  );
}

export default SingleComment;
