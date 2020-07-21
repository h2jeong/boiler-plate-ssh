import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import Title from "antd/lib/typography/Title";
import TextArea from "antd/lib/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useSelector } from "react-redux";

const privacies = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];
const categories = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vihicles" },
  { value: 2, label: "Educations & Hobbies" }
];

function VideoUploadPage(props) {
  const authUser = useSelector(state => state.user.auth);

  const [FilePath, setFilePath] = useState("");
  const [Video, setVideo] = useState({
    writer: "",
    title: "",
    description: "",
    privacy: "Private",
    category: 0,
    filePath: "",
    thumbnail: "",
    duration: ""
  });

  const onInputChange = e => {
    const { name, value } = e.currentTarget;
    setVideo({ ...Video, [name]: value });
  };

  const onDrop = acceptedFiles => {
    // 1. FormData에 파일을 append -> header config -> 전송
    // 2. 업로드 폴더에 넣어주기 -> 응답 성공이면
    // 3. 썸네일 생성하여 넣어주기
    //    썸네일은 filename 과  file path 필요함
    // 4. 썸네일 폴더에 넣어주기 -> 응답 성공?
    const frm = new FormData();
    frm.append("file", acceptedFiles[0]);
    // console.log("acceptedFiles:", acceptedFiles[0]);
    axios
      .post("/api/video/uploadFiles", frm, {
        header: { "content-type": "multipart/form-data" }
      })
      .then(res => {
        if (res.data.success) {
          // {success: true, path: "uploads/1592320469211_KakaoTalk_Video_2019-12-13-10-01-58.mp4", filename: "1592320469211_KakaoTalk_Video_2019-12-13-10-01-58.mp4"}
          let variable = {
            filePath: res.data.path,
            fileName: res.data.filename
          };

          setFilePath(res.data.path);

          axios.post("/api/video/thumbnail", variable).then(res => {
            if (res.data.success) {
              // { success: true
              // fileDuration: 106.084
              // thumbsnailsPath: "uploads/thumbnails/thumbnail-1592329061274_KakaoTalk_Video_2019-12-13-10-01-58_1.png" }

              setVideo({
                ...Video,
                duration: res.data.fileDuration,
                thumbnail: res.data.thumbsnailsPath
              });
            } else {
              message.error("Failed to create thumbnails.");
            }
          });
        } else {
          message.error("Failed to upload file.");
        }
      });
  };

  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      ...Video,
      filePath: FilePath,
      writer: authUser.user._id
    };

    axios.post("/api/video/uploadVideo", variables).then(res => {
      if (res.data.success) {
        message.info("Successful Upload Video ");
        props.history.push("/");
      } else {
        message.error("Failed to upload video.");
      }
    });
  };

  return (
    <div style={{ width: "700px", maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {/* Drop zone */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>
          {/* Thumbnail zone */}
          {Video.thumbnail && (
            <div>
              <img
                src={`http://localhost:8000/${Video.thumbnail}`}
                alt="thumbnail"
              />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onInputChange} value={Video.title} name="title" />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onInputChange}
          valeu={Video.description}
          name="description"
        />
        <br />
        <br />
        <select onChange={onInputChange} name="privacy" value={Video.privacy}>
          {privacies.map(item => (
            <option key={item.value} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onInputChange} name="category" value={Video.category}>
          {categories.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        {/* available - onClick={onSubmit}, invalid - htmlFor= 'submit'  */}
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(VideoUploadPage);
