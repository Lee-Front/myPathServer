const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");

router.get("/getList", function (req, res) {
  tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .then((data) => {
      const tagBlocks = data.filter((block) => {
        if (block.tagName === "image") {
          fileDataModel
            .findOne({ uuid: block.uuid })
            .sort({ fileId: -1 })
            .then((file) => {
              const files = [];
              files.push(file);
              block.files = files;
              block.html = "aaa";
            });
        }
      } return block;);
      console.log("data: ", data);
      res.status(200).send(data);
    });
  // tagBlockModel
  //   .find({ pathId: req.query.pathId })
  //   .populate("files")
  //   .select("-_id")
  //   .then((data) => {
  //     res.status(200).send(data);
  //   });
});

router.post("/save", function (req, res) {
  const modifyList = req.body;

  modifyList.map((blockData) => {
    if (blockData.type === "delete") {
      tagBlockModel.deleteOne({ uuid: blockData.data.uuid }).exec();
    } else {
      console.log("blockData: ", blockData);
      tagBlockModel
        .findOneAndUpdate(
          { uuid: blockData.data.uuid },
          { ...blockData.data },
          { new: true, upsert: true }
        )
        .exec();
    }
  });
  res.status(200).send();
});

module.exports = router;
