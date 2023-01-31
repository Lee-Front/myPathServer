require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { PORT, MONGO_URI } = process.env;
const ip = require("ip");

mongoose.Promise = global.Promise;

mongoose
  .set("strictQuery", true)
  .connect(MONGO_URI)
  .then((response) => {
    console.log("Successfully connect to mongodb");
  })
  .catch((e) => {
    console.error(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

const pathRouter = require("./router/path");
const editorRouter = require("./router/editor");
const commonRouter = require("./router/common");

app.listen(PORT, function () {
  console.log("서버실행 완료");
});

app.get("/images", function (req, res) {
  fs.readdir("images/", { withFileTypes: true }, function (error, items) {
    if (error) {
      res.send({ error, fileList: [], folderList: [] });
      return;
    }

    let files = [];
    let folders = [];

    for (let item of items) {
      if (item.isDirectory()) {
        folders.push(item);
      } else {
        files.push(item);
      }
    }
    res.send({ fileList: files, filderList: folders });
  });
  return;
});

app.use("/api/path", pathRouter);
app.use("/api/editor", editorRouter);
app.use("/api/common", commonRouter);

//app.use("/api/editor", editorRouter);
