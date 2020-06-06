const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minLength: 5
  },
  lastname: {
    type: String,
    maxLength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// 유저 모델을 저장하기 전에 비밀번호 암호화 한다.
userSchema.pre("save", function(next) {
  // req.body로 받는 데이터를 모델에서 가져오기 위해 this로 선언
  let user = this;

  // 유저 정보를 수정할 때가 아니라 비밀번호가 변경될때만 처리한다.
  // Document.prototype.isModified() - Returns true if this document was modified, else false.
  if (user.isModified("password")) {
    // SALT를 이용하여 암호화하기 : salt생성 - saltRounds = (글자수)
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  let user = this;
  // plainPassword 1234567 암호화된 비밀번호 $2b$10$X/DS6vCsugMFQhQ1x/RvcOXwnpm5KIhRPo19LEnYhiGSFK1mSOjlu

  //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // // result == true or false
  // });
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  let user = this;
  // jsonwebtoken을 이용하여 token 생성하기, 데이터베이스의 _id로 생성
  let token = jwt.sign(user._id.toHexString(), "secretToken");
  // 스키마에 넣어주기
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  // 토큰을 decode한다.
  jwt.verify(token, "secretToken", function(err, decoded) {
    // 유저 아이디를 이용해서 유저(decoded)를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인

    user.findOne({ _id: decoded, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
