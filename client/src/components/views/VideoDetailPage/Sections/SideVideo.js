import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function SideVideo() {
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

  const sideVideCard = Videos.map((video, idx) => {
    return (
      <div
        key={idx}
        style={{ display: "flex", marginTop: "1rem", padding: "0 2rem" }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <a href={`/video/${video._id}`}>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:8000/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div style={{ width: "50%" }}>
          <a href={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}{" "}
            </span>
            <br />
            <span>{video.writer.name}</span>
            <br />
            <span>{video.views}</span>
            <br />
            <span>
              {moment
                .utc(
                  moment.duration(video.duration, "seconds").asMilliseconds()
                )
                .format("mm:ss")}
            </span>
            <br />
          </a>
        </div>
      </div>
    );
  });

  return <div style={{ maringTop: "3rem" }}>{sideVideCard}</div>;
}

export default SideVideo;
