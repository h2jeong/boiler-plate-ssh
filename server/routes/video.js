const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: function(req, file, cb) {
    if (path.extname(file.originalname) !== ".mp4") {
      return cb(new Error("Only mp4 are allowed"));
    }
    cb(null, true);
  }
});

let upload = multer({ storage: storage }).single("file");

router.post("/uploadFiles", (req, res) => {
  console.log("video routes:", req.file);
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.json({
        success: false,
        message: "error during uploading"
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.status(400).json({ success: false, message: err });
    }
    console.log("video::", req.file);
    // 썸네일 생성 하기 위해 필요한 정보만 넘겨준다.
    // => path, filename
    //  { fieldname: "file",
    //   originalname: "KakaoTalk_Video_2019-12-13-10-01-58.mp4",
    //   encoding: "7bit",
    //   mimetype: "video/mp4",
    //   destination: "uploads/",
    //   filename: "file-1592319394247",
    //   path: "uploads/file-1592319394247",
    //   size: 27709534 }

    res.status(200).json({
      success: true,
      path: req.file.path,
      filename: req.file.filename
    });
    // Everything went fine.
  });
  //   if (err) return res.status(400).json({ success: false, err });
  //   return res.status(200).json({ success: true });
});

router.post("/thumbnail", (req, res) => {
  console.log("video thumb::", req.body);
  // const {filePath, fileName} = req.body;
  let fileDuration = "";
  let thumbsnailsPath = "";
  // ffmpeg.ffprobe('path', (err, metadata) => {
  // ffprobe 메소드는 파일 경로를 인자로 받아 콜백함수로 metadata를 받을 수 있다.
  // const {duration, size} = metadata.format;
  // metadata 에서 duration을 알아낸다.
  ffmpeg.ffprobe(req.body.filePath, (err, metadata) => {
    if (err) throw err;
    console.log("metadata:", metadata.format);
    // {filename: 'uploads/1592329061274_KakaoTalk_Video_2019-12-13-10-01-58.mp4',
    //    nb_streams: 2,
    //    nb_programs: 0,
    //    format_name: 'mov,mp4,m4a,3gp,3g2,mj2',
    //    format_long_name: 'QuickTime / MOV',
    //    start_time: 0,
    //    duration: 106.084,
    //    size: 27709534,
    //    bit_rate: 2089629,
    //    probe_score: 100,
    //    tags: {
    //      major_brand: 'isom',
    //      minor_version: '512',
    //      compatible_brands: 'isomiso2avc1mp41',
    //      encoder: 'Lavf57.56.101'
    //    }
    //  }
    fileDuration = metadata.format.duration;
  });

  //   ffmpeg('path')
  //   .on('err', function(err){에러 처리})
  //   .on('end',function(){처리 응답 주기})
  //   .screenshots({count:1,folder:'',size:'',filename:''});
  ffmpeg(req.body.filePath)
    .on("filenames", function(filenames) {
      thumbsnailsPath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function() {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsnailsPath: thumbsnailsPath,
        fileDuration: fileDuration
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 2,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename (filename w/o extension)
      filename: "thumbnail-%b.png"
    });
});

router.post("/uploadVideo", (req, res) => {
  console.log("server upload:", req.body);
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

module.exports = router;
