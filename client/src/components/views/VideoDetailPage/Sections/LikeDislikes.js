import React, { useState, useEffect } from "react";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled
} from "@ant-design/icons";
import axios from "axios";

function LikeDislikes({ video, videoId, commentId }) {
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);
  const [CountOfLike, setCountOfLike] = useState(0);
  const [CountOfDislike, setCountOfDislike] = useState(0);

  useEffect(() => {
    const variable = video ? { videoId: videoId } : { commentId: commentId };
    axios.post("/api/like/getCountOfLike", variable).then(res => {
      if (res.data.success) {
        setCountOfLike(res.data.likes.length);
      } else {
        alert("Failed to get count of likes");
      }
    });
    axios.post("/api/like/getCountOfDislike", variable).then(res => {
      if (res.data.success) {
        setCountOfDislike(res.data.dislikes.length);
      } else {
        alert("Failed to get count of likes");
      }
    });
  }, []);

  const onLike = () => {
    if (!localStorage.getItem("userId")) {
      alert("Failed to Like actions");
      return;
    }
    const variable = video
      ? {
          userId: localStorage.getItem("userId"),
          videoId: videoId
        }
      : {
          userId: localStorage.getItem("userId"),
          commentId: commentId
        };

    if (!Liked) {
      axios.post("/api/like/addLike", variable).then(res => {
        if (res.data.success) {
          // setCountOfLike(CountOfLike + 1);
          setLiked(!Liked);
        } else {
          alert("Failed to add to likes");
        }
      });
    } else {
      axios.post("/api/like/cancelLike", variable).then(res => {
        if (res.data.success) {
          // setCountOfLike(CountOfLike - 1);
          setLiked(!Liked);
        } else {
          alert("Failed to add to likes");
        }
      });
    }
  };
  const onDislike = () => {};

  return (
    <div>
      <span style={{ marginRight: "8px" }}>
        {!Liked ? (
          <LikeOutlined onClick={onLike} />
        ) : (
          <LikeFilled onClick={onLike} />
        )}
        {CountOfLike}
      </span>
      <span>
        {!Disliked ? (
          <DislikeOutlined onClick={onDislike} />
        ) : (
          <DislikeFilled onClick={onDislike} />
        )}
        {CountOfDislike}
      </span>
    </div>
  );
}

export default LikeDislikes;
