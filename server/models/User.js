const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  email: {
    type: String,
    unique: 1,
    trim: true
  },
  password: { type: String, minlength: 5 },
  name: { type: String, maxlength: 50 },
  role: { type: Number, default: 0 },
  image: { type: String },
  token: { type: String }
  //tokenExp: { type: Number }
});

userSchema.pre("save", function(next) {
  // req.body로 받는 데이터를 모델에서 가져오기 위해 this로 선언
  let user = this;
  // 몽구스 미들웨어(pre, post) - pre는 next를 인자로 사용
  // 새로 등록하거나 수정되었을 때만 only hash the password if it has been modified (or is new)
  // Document.prototype.isModified() - Returns true if this document was modified, else false.
  // 일부 속성이 수정되었는지 확인하려면 속성 이름을 isModified 함수에 매개 변수로 전달하십시오.
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
  // SALT를 이용하여 암호화하기 : generate salt with saltRounds(글자수)
  // bcrypt.genSalt(saltRounds, (err, salt) => {
  //   if(err) return next(err);
  //   // hash the password along with our new salt
  //   bcrypt.hash(password, salt, (err, hash) => {
  //     if(err) return next(err);
  //     user.password = hash;
  //     next();
  //  })
});

// instance method는 document에 적용되는 method이며
// static method는 model에 적용 되는 method이다.

// 일반적으로 instance method는 query로 찾은 document에 적용하는 method를 정의하기 위해 쓰고,
// static method는 model을 통해 query를 하기위해 쓰인다.

// schema.method('method', function([name], cb) {
// something to do with or without 'name' => result
// then... if(err) return cb(err); cb(null, result);
// })

// schema.static('method', function (name, cb) {
// return this.find({name: name}, cb);
// })

userSchema.methods.comparePassword = function(myPlaintextPassword, cb) {
  // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // // result == true or false
  // });
  bcrypt.compare(myPlaintextPassword, this.password, (err, result) => {
    if (err) return cb(err);
    cb(null, result);
  });
};

userSchema.methods.generateToken = function(cb) {
  // jsonwebtoken을 이용하여 token 생성하기, 데이터베이스의 _id로 생성
  let user = this;
  jwt.sign({ _id: user._id }, "secret", (err, token) => {
    if (err) return cb(err);

    // DB에 넣어주기
    user.token = token;
    user.save((err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.statics.findByToken = function(token, cb) {
  let user = this;
  // 인증처리 - 클라이언트 쿠키에서 저장된 Token을 이용하여 복호화하면
  // user의 ID가 나오는데 그 ID와 cookie의 토큰으로 DB에서 유저를 찾은 후
  // 유저가 있으면 인증 ok

  jwt.verify(token, "secret", (err, decode) => {
    // JsonWebTokenError: jwt must be provided

    console.log("decode:", decode);

    user.findOne({ _id: decode, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
