const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/key");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch(e => console.error(e));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/users", require("./routes/users"));
app.use("/api/video", require("./routes/video"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
