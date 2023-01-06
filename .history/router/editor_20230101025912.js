const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/pathCard");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel.findAll();
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {});
