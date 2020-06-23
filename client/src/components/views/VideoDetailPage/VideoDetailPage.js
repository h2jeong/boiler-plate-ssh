import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";
import Comments from "./Sections/Comments";
import LikeDislikes from "./Sections/LikeDislikes";

function VideoDetailPage(props) {
  // console.log("videoId:", props.match.params);
  const [Video, setVideo] = useState({});
  const [CommentList, setCommentList] = useState([]);

  const videoId = props.match.params.videoId;

  useEffect(() => {
    axios.post("/api/video/getVideo", { videoId }).then(res => {
      if (res.data.success) {
        setVideo(res.data.video);
      } else {
        alert("Failed to load video detail");
      }
    });

    axios.post("/api/comment/getComments", { videoId }).then(res => {
      if (res.data.success) {
        setCommentList(res.data.commentList);
      } else {
        alert("Failed to get comment list");
      }
    });
  }, []);

  const onUpdate = newComment => {
    setCommentList(CommentList.concat(newComment));
  };
  // console.log("detail:", CommentList.length);

  if (Video.writer) {
    // 본인을 구독할 수 없음 처리
    const subscribeButton = Video.writer._id !==
      localStorage.getItem("userId") && (
      <Subscriber
        userTo={Video.writer._id}
        userFrom={localStorage.getItem("userId")}
      />
    );

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:8000/${Video.filePath}`}
              controls
            />
            {/* actions={[ '배열'에 ReactNode 넣어주기]} */}
            <List.Item
              actions={[
                <LikeDislikes video videoId={videoId} />,
                subscribeButton
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              />
            </List.Item>
            {/* comment */}
            <Comments
              videoId={videoId}
              commentList={CommentList}
              onUpdate={onUpdate}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
