const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/pathCard");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel.findAll();
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {
  const tagBlock = new tagBlockModel({
    uuid: "1",
    tagName: "div",
    parentId: null,
    html: "123",
    defaultPlaceHolder: null,
    placeholder: null,
  });
});
