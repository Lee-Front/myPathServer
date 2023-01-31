const express = require("express");
const router = express.Router();
const fileDataModel = require("../models/fileData");
const fs = require("fs");

router.get("/image", function (req, res) {});

router.post("/upload", upload.single("img"), (req, res) => {
  const url = "./images/" + req.file.filename;
  res.status(200).json({ url });
});
