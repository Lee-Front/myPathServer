const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel.findAll();
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {
  let tagBlock = tagBlockModel.findOne({ uuid: req.body.uuid }).then((data) =>{
    console.log("data : ",data)
  });
  
  new tagBlockModel({
    ...req.body,
  });

  //console.log("tagBlock: ", tagBlock);
  //tagBlock.save();
});

module.exports = router;
