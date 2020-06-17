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
  console.log("user:", authUser);

  const [VideoTitle, setVideoTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value);
  };
  const onDescChange = e => {
    setDescription(e.currentTarget.value);
  };
  const onPrivacyChange = e => {
    setPrivacy(e.currentTarget.value);
  };
  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };

  // const [Video, setVideo] = useState({
  //   writer: "",
  //   title: "",
  //   description: "",
  //   privacy: 0,
  //   category: 0,
  //   filePath: "",
  //   thumbnail: "",
  //   duration: ""
  // });
  // const [ThumbnailPath, setThumbnailPath] = useState("");
  // const onInputChange = e => {
  //   const { name, value } = e.currentTarget;
  //   setVideo({ ...Video, [name]: value });
  // };
  const onDrop = acceptedFiles => {
    // 1. FormData에 파일을 append -> header config -> 전송
    // 2. 업로드 폴더에 넣어주기 -> 응답 성공이면
    // 3. 썸네일 생성하여 넣어주기
    //    썸네일은 filename 과  file path 필요함
    // 4. 썸네일 폴더에 넣어주기 -> 응답 성공?
    const frm = new FormData();
    frm.append("file", acceptedFiles[0]);
    console.log("acceptedFiles:", acceptedFiles[0]);
    axios
      .post("/api/video/uploadFiles", frm, {
        header: { "content-type": "multipart/form-data" }
      })
      .then(res => {
        if (res.data.success) {
          console.log("upload::", res.data);
          // {success: true, path: "uploads/1592320469211_KakaoTalk_Video_2019-12-13-10-01-58.mp4", filename: "1592320469211_KakaoTalk_Video_2019-12-13-10-01-58.mp4"}
          let variable = {
            filePath: res.data.path,
            fileName: res.data.filename
          };

          // setVideo({ ...Video, filePath: res.data.path });
          setFilePath(res.data.path);

          axios.post("/api/video/thumbnail", variable).then(res => {
            if (res.data.success) {
              console.log("thumb::", res.data);
              // { success: true
              // fileDuration: 106.084
              // thumbsnailsPath: "uploads/thumbnails/thumbnail-1592329061274_KakaoTalk_Video_2019-12-13-10-01-58_1.png" }

              setThumbnail(res.data.thumbsnailsPath);
              setDuration(res.data.fileDuration);

              // setVideo({
              //   ...Video,
              //   fileDuration: res.data.fileDuration,
              //   thumbnail: res.data.thumbsnailsPath
              // });
              // setThumbnailPath(res.data.thumbsnailsPath);
            } else {
              alert("Failed to create thumbnails.", res.data.err);
            }
          });
        } else {
          alert("Failed to upload file.", res.data.err);
        }
      });
  };

  const onSubmit = e => {
    e.preventDefault();

    const variable = {
      writer: authUser.user._id,
      title: VideoTitle,
      description: Description,
      privacy: Privacy,
      category: Category,
      filePath: FilePath,
      thumbnail: Thumbnail,
      duration: Duration
    };
    // setVideo({ ...Video, writer: authUser.user._id });
    // console.log("Video:", Video);
    axios.post("/api/video/uploadVideo", variable).then(res => {
      if (res.data.success) {
        console.log("uploadVideo::", res.data);
        message.info("Successful Upload Video ");
        props.history.push("/");
      } else {
        alert("Failed to upload video.");
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
          {Thumbnail && (
            <div>
              <img src={`http://localhost:8080/${Thumbnail}`} alt="thumbnail" />
            </div>
          )}
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescChange} valeu={Description} />
        <br />
        <br />
        <select onChange={onPrivacyChange}>
          {privacies.map((privacy, idx) => (
            <option key={idx} value={privacy.value}>
              {privacy.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categories.map((category, idx) => (
            <option key={idx} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default withRouter(VideoUploadPage);
