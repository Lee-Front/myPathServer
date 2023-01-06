const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");

router.get("/getList", function (req, res) {
  const tagList = tagBlockModel
    .find({ pathId: req.body.pathId })
    .then((data) => {
      console.log("data : ", data);
    });
  console.log("tagList: ", tagList);
});

router.post("/save", function (req, res) {
  tagBlockModel
    .findOneAndUpdate({ uuid: req.body.uuid }, { ...req.body }, { new: true })
    .then((data) => {
      console.log("data : ", data);
      res.status(200).send(data);
    });
  //   let tagBlock = tagBlockModel.findOne({ uuid: req.body.uuid }).then((data) => {
  //     console.log("data : ", data);
  //     data = { ...req.body };
  //   });

  //   new tagBlockModel({
  //     ...req.body,
  //   });

  //console.log("tagBlock: ", tagBlock);
  //tagBlock.save();
});

module.exports = router;
