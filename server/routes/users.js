const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

router.post("/register", (req, res) => {
  // User 인스턴스 생성 전에 비밀번호 암호화 하기
  const user = new User(req.body);
  // console.log(req.body, user);

  user.save((err, doc) => {
    if (err) return res.status(400).json({ registerSuccess: false, err });
    return res.status(200).json({ registerSuccess: true });
  });
});

router.post("/login", (req, res) => {
  // 아이디가 존재하는지, 비밀번호가 맞는지, 토큰을 생성하여 응답해준다.
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) return res.status(400).json({ loginSuccess: false, err });
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "User by this email does not exist"
      });

    // console.log("user:", user);
    // 비밀번호 비교, but hash와 비교 불가
    // if(user.password === req.body.password)

    // plainPassword 1234567 암호화된 비밀번호 $2b$10$X/DS6vCsugMFQhQ1x/RvcOXwnpm5KIhRPo19LEnYhiGSFK1mSOjlu
    // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // // result == true or false
    // });
    // => user model에서 메소드 생성하여 처리
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.json({ loginSuccess: false, err });
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      // 토큰생성
      // jsonwebtoken을 이용하여 token 생성하기, 데이터베이스의 _id로 생성
      // 스키마에 넣어주기 => user model에서 메소드 생성하여 처리
      user.generateToken((err, user) => {
        if (err) return res.status(400).json({ loginSuccess: false, err });
        // 토큰과 유효기간을 저장한다. 어디에? 스토리지 : 쿠키, 로컬스토리지
        // res.cookie('name', token)

        res
          .cookie("w_auth", user.token, { maxAge: 60 * 60 * 60 })
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  // 1. middleware: auth (인증처리하는 곳)
  // 인증처리 - 클라이언트 쿠키에서 저장된 Token을 이용하여 복호화하면
  // user의 ID가 나오는데 그 ID와 cookie의 토큰으로 DB에서 유저를 찾은 후
  // 유저가 있으면 인증 ok
  // 2. auth middleware에서 인증된 유저 정보를 전달받기
  // 미들웨어를 통과하면 인증됐다는 거고 반대의 경우는 미들웨어에서 끝남
  // 따라서 여기서는 통과된 부분을 가공해서 클라이언트에 전달해주면 끝
  // 인증됐는지 어드민(role 1) 유저인지 추가 정보 가공하기
  console.log("users/auth:", req.body);
  res.status(200).json({
    user: req.user,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true
  });
});

router.post("/logout", auth, (req, res) => {
  // 로그인 유저 정보 확인 - _id, token 정보를 체크해야 로그아웃 가능
  // => middleware : auth : 토큰 및 유저 확인
  // console.log("logout", req.user);

  // 로그인한 유저의 데이터베이스의 토큰을 지워준다.
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
module.exports = router;
