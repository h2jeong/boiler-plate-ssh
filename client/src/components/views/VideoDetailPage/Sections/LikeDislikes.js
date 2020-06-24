import React, { useState, useEffect } from "react";
import {
  LikeOutlined,
  LikeFilled,
  DislikeOutlined,
  DislikeFilled
} from "@ant-design/icons";
import axios from "axios";
import { Tooltip } from "antd";

function LikeDislikes({ video, videoId, commentId }) {
  const [Liked, setLiked] = useState(false);
  const [Disliked, setDisliked] = useState(false);
  const [CountOfLike, setCountOfLike] = useState(0);
  const [CountOfDislike, setCountOfDislike] = useState(0);
  const variable = video
    ? {
        userId: localStorage.getItem("userId"),
        videoId: videoId
      }
    : {
        userId: localStorage.getItem("userId"),
        commentId: commentId
      };

  useEffect(() => {
    const countVariable = video ? { videoId } : { commentId };
    axios.post("/api/like/getCountOfLike", countVariable).then(res => {
      if (res.data.success) {
        setCountOfLike(res.data.likes.length);
        res.data.likes.forEach(like => {
          if (like.userId === variable.userId) {
            setLiked(!Liked);
          }
        });
      } else {
        alert("Failed to get count of likes");
      }
    });
    axios.post("/api/like/getCountOfDislike", countVariable).then(res => {
      if (res.data.success) {
        setCountOfDislike(res.data.dislikes.length);

        res.data.dislikes.forEach(dislike => {
          if (dislike.userId === variable.userId) {
            setDisliked(!Disliked);
          }
        });
      } else {
        alert("Failed to get count of likes");
      }
    });
  }, []);

  const onLike = () => {
    if (!localStorage.getItem("userId")) {
      alert("Failed to Like actions. You can add Like after logging in.");
      return;
    }

    if (!Liked) {
      axios.post("/api/like/addLike", variable).then(res => {
        if (res.data.success) {
          setCountOfLike(CountOfLike + 1);
          setLiked(!Liked);
          if (Disliked) {
            setDisliked(!Disliked);
            setCountOfDislike(CountOfDislike - 1);
          }
        } else {
          alert("Failed to add to likes");
        }
      });
    } else {
      axios.post("/api/like/cancelLike", variable).then(res => {
        if (res.data.success) {
          setCountOfLike(CountOfLike - 1);
          setLiked(!Liked);
        } else {
          alert("Failed to add to likes");
        }
      });
    }
  };
  const onDislike = () => {
    if (!localStorage.getItem("userId")) {
      alert("Failed to Like actions. You can add Like after logging in.");
      return;
    }

    if (!Disliked) {
      axios.post("/api/like/addDislike", variable).then(res => {
        if (res.data.success) {
          setCountOfDislike(CountOfDislike + 1);
          setDisliked(!Disliked);
          if (Liked) {
            setLiked(!Liked);
            setCountOfLike(CountOfLike - 1);
          }
        } else {
          alert("Failed to add to Dislikes");
        }
      });
    } else {
      axios.post("/api/like/cancelDislike", variable).then(res => {
        if (res.data.success) {
          setCountOfDislike(CountOfDislike - 1);
          setDisliked(!Disliked);
        } else {
          alert("Failed to add to Dislikes");
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          {!Liked ? (
            <LikeOutlined onClick={onLike} />
          ) : (
            <LikeFilled onClick={onLike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {CountOfLike}
        </span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          {!Disliked ? (
            <DislikeOutlined onClick={onDislike} />
          ) : (
            <DislikeFilled onClick={onDislike} />
          )}
        </Tooltip>
        <span style={{ paddingLeft: "8px", cursor: "auto" }}>
          {CountOfDislike}
        </span>
      </span>
    </div>
  );
}

export default LikeDislikes;
