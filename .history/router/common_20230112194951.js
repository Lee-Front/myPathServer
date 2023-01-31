const express = require("express");
const router = express.Router();
const fileDataModel = require("../models/fileData");

router.get("/image", function (req, res) {
  fileDataModel.find();
});

router.post("/upload", upload.single("img"), (req, res) => {
  const url = "./images/" + req.file.filename;
  res.status(200).json({ url });
});
