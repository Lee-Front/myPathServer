const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/pathCard");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel.findAll();
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {
  const tagBlock = new tagBlockModel({
    uuid: { type: String, required: true, unique: true },
    tagName: { type: String, requied: true },
    parentId: { type: String },
    html: { type: String },
    defaultPlaceHolder: { type: String },
    placeholder: { type: String },
  });
});
