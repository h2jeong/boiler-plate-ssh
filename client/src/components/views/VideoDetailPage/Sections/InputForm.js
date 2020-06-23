import React, { useState } from "react";
import { Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useSelector } from "react-redux";

function InputForm({ videoId, onUpdate, commentId }) {
  const auth = useSelector(state => state.user.auth);
  const [Content, setContent] = useState("");
  const [Openreply, setOpenreply] = useState(true);

  const handleChange = e => {
    setContent(e.currentTarget.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    // writer, videoId, responsoTo, content
    const variable = {
      writer: auth.user._id,
      videoId: videoId,
      content: Content,
      responseTo: commentId
    };

    if (variable.writer !== null) {
      axios.post("/api/comment/saveComment", variable).then(res => {
        if (res.data.success) {
          setContent("");
          onUpdate(res.data.comment);
          if (res.data.comment.responseTo) {
            setOpenreply(false);
          }
        } else {
          alert("Failed to save comment");
        }
      });
    } else {
      alert("need to login");
    }
  };
  return (
    <div>
      {Openreply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: "100%", borderRadius: "5px" }}
            onChange={handleChange}
            value={Content}
            placeholder="write some comments"
          />
          <br />
          <Button
            style={{ width: "20%", height: "52px", marginLeft: "10px" }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default InputForm;
