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
    const newFileName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    fileDataModel.count().then((count) => {
      cb(null, count.toString() + "." + extension);
    });
  },
});
const upload = multer({ storage: storage });

router.get("/images/:fileName", function (req, res) {
  fs.readFile("./images/" + req.params.fileName, function (err, data) {
    res.writeHead(200, { "Context-Type": "text/html" });
    res.end(data);
  });
});

router.post("/upload", upload.single("img"), (req, res) => {
  const url = "/images/" + req.file.filename;
  res.status(200).json({ url });
});

module.exports = router;
