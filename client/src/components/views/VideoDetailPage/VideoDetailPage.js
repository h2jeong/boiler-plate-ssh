import React, { useEffect, useState } from "react";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";

function VideoDetailPage(props) {
  console.log("videoId:", props.match.params);
  const [Video, setVideo] = useState({});

  useEffect(() => {
    const variable = { videoId: props.match.params.videoId };

    axios.post("/api/video/getVideo", variable).then(res => {
      if (res.data.success) {
        console.log("detail:", res.data);
        setVideo(res.data.video);
      } else {
        alert("Failed to load video detail");
      }
    });
  }, []);

  if (Video.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <video
              style={{ width: "100%" }}
              src={`http://localhost:8000/${Video.filePath}`}
              controls
            />
            <List.Item actions>
              <List.Item.Meta
                avatar={<Avatar src={Video.writer.image} />}
                title={Video.title}
                description={Video.description}
              />
            </List.Item>
            {/* comment */}
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
