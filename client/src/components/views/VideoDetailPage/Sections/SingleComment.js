import React, { useState } from "react";
import { Comment, Avatar } from "antd";
import InputForm from "./InputForm";
import LikeDislikes from "./LikeDislikes";

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
          <LikeDislikes commentId={comment._id} />,
          <span
            key="comment-nested-reply-to"
            onClick={onOpenReply}
            style={{ marginLeft: "8px" }}
          >
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
