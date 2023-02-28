const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");
const styleDataModel = require("../models/styleData");

router.get("/getList", async function (req, res) {
  const tagList = await tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .exec();

  let count = 0;
  const newList = [];
  tagList.map(async (data) => {
    if (data.tagName === "image") {
      const files = await fileDataModel
        .findOne({ uuid: data.uuid })
        .sort({ fileId: -1 })
        .exec();
      data = data.toJSON();
      data.files = [files];
    }
    newList.push(data);
    count++;

    if (count === tagList.length) {
      res.status(200).send(newList);
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

router.post("/style/save", function (req, res) {
  const data = req.body;
  styleDataModel
    .findOneAndUpdate(
      { uuid: req.body.uuid },
      { ...data },
      { new: true, upsert: true }
    )
    .exec();

  console.log("style : ", styleData);
});

module.exports = router;
