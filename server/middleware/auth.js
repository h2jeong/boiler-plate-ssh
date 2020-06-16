const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 1. middleware: auth (인증처리하는 곳)
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.w_auth;
  console.log("token:", token);
  // 복호화(decode) 한후 유저를 아이디와 토큰으로 찾는다. => user model에서 처리
  User.findByToken(token, (err, user) => {
    // 에러 처리. 그리고 유저가 없으면 인증 no, 에러 있음
    // 유저가 있으면 인증 ok - 토큰과 유저정보 전달
    if (err) {
      throw err;
    }
    console.log("middleware auth:: 여기", token);
    if (!user) {
      return res.json({ isAuth: false, Error: true });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
