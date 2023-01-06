const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel.findAll();
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {
  const { uuid, tagName, parentId, html, defaultPlaceHolder, placeholder } =
    req.body;
  const tagBlock = new tagBlockModel({
    uuid: "1",
    tagName: "div",
    parentId: null,
    html: "123",
    defaultPlaceHolder: null,
    placeholder: null,
  });
  tagBlock.save();
});

module.exports = router;
