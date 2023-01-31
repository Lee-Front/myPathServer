const express = require("express");
const router = express.Router();
const fileDataModel = require("../models/fileData");
const tagBlockModel = require("../models/tagBlock");
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];

    fileDataModel.count().then((count) => {
      cb(null, count.toString() + "." + extension);
    });
  },
});
const upload = multer({ storage: storage });

router.get("/images/:fileName", function (req, res) {
  const fileId = req.params.fileName;

  fileDataModel.findOne({ fileId }).then((data) => {
    fs.readFile(
      "./images/" + data.fileId + "." + data.extension,
      function (err, data) {
        res.writeHead(200, { "Context-Type": "text/html" });
        res.end(data);
      }
    );
  });
});

router.post("/upload", upload.single("img"), (req, res) => {
  const originalName = Buffer.from(req.file.originalname, "latin1").toString(
    "utf8"
  );
  const idx = req.file.filename.lastIndexOf(".");
  const fileId = req.file.filename.substring(0, idx);
  const extension = req.file.filename.substring(
    idx + 1,
    req.file.filename.length
  );
  const uuid = req.body.uuid;

  tagBlockModel
    .findOne({ uuid })
    .then((data) => {
      const fileData = new fileDataModel({
        fileId: fileId,
        uuid: uuid,
        fileName: originalName, //original File Name
        extension: extension,
      });
      console.log("then");

      fileData.save().then(() => {
        data.files = [fileData];
        data.save();
      });
    })
    .exec();

  res.status(200).json({ fileId });
});

module.exports = router;
