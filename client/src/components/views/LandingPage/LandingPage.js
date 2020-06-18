import React, { useState, useEffect } from "react";

import Meta from "antd/lib/card/Meta";
import { Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";

import axios from "axios";
import moment from "moment";

function LandingPage(props) {
  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then(res => {
      // console.log(res.data);
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        alert("Failed to load videos.");
      }
    });
  }, []);

  // 비디오 카드 Template
  const renderCards = Videos.map((video, idx) => {
    // console.log("video:", video.duration);
    // console.log(
    //   moment
    //     .utc(moment.duration(video.duration, "seconds").asMilliseconds())
    //     .format("mm:ss")
    // );
    // console.log(moment.utc(moment.duration(video.duration)).format("mm:ss"));

    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <div style={{ position: "relative" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:8000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
          <div className="duration">
            <span>
              {moment
                .utc(
                  moment.duration(video.duration, "seconds").asMilliseconds()
                )
                .format("mm:ss")}
            </span>
          </div>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          descripteion={video.description}
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>{video.views}</span> -
        <span>{video.createAt}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}>Recomanded</Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
}

export default LandingPage;
