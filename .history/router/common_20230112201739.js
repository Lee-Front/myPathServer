const express = require("express");
const router = express.Router();
const fileDataModel = require("../models/fileData");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    console.log("file: ", file);

    const test = Buffer.from(file.originalname, "latins1").toString("utf8");
    console.log("tes : ", test);
    const newFileName = file.originalname;
    cb(null, newFileName);
  },
});
const upload = multer({ storage: storage });

router.get("/image", function (req, res) {
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

router.post("/upload", upload.single("img"), (req, res) => {
  const url = "./images/" + req.file.filename;
  res.status(200).json({ url });
});

module.exports = router;
