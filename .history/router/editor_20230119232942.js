const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");

const findFiles = async (data) => {
  const files = await fileDataModel.find({ uuid: data.uuid }).exec();
  console.log("files1: ", files);
  return files;
};

router.get("/getList", async function (req, res) {
  // tagBlockModel
  //   .find({ pathId: req.query.pathId })
  //   .populate("files")
  //   .select("-_id")
  //   .then((data) => {
  //     res.status(200).send(data);
  //   });
  const tagList = await tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .exec();

  let count = 0;
  tagList.map(async (data) => {
    const file = await fileDataModel.findOne({ uuid: data.uuid }).exec();

    if (data.tagName === "image") {
      data.html = "image";
      data.files = [];
      data.files.push(file);
    }

    count++;

    if (count === tagList.length) {
      res.status(200).send(tagList);
    }
  });
});

router.post("/save", function (req, res) {
  const modifyList = req.body;

  modifyList.map((blockData) => {
    if (blockData.type === "delete") {
      tagBlockModel.deleteOne({ uuid: blockData.data.uuid }).exec();
    } else {
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
