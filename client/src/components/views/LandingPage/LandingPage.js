import React from "react";

import Meta from "antd/lib/card/Meta";
import { Avatar, Col, Row } from "antd";
import Title from "antd/lib/typography/Title";

import { withRouter } from "react-router-dom";

function LandingPage(props) {
  const Videos = [];
  const renderCards = Videos.map((video, idx) => {
    return (
      <Col lg={6} md={8} xs={24} key={idx}>
        <a href>
          <div style={{ position: "relative" }}>
            <img style={{ width: "100%" }} src alt="thumbnail" />

            <div className="duration">
              <span>duration</span>
            </div>
          </div>
        </a>
        <br />
        <Meta avatar={<Avatar />} title description />
        <span>name</span>
        <br />
        <span style={{ marginLeft: "3rem" }}>views</span> -{" "}
        <span>createAt</span>
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

export default withRouter(LandingPage);
