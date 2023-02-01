const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");

router.get("/getList", async function (req, res) {
  const tagList = await tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .sort({ sort: 1 })
    .exec();

  console.log("tagList: ", tagList);

  let count = 0;
  const newList = [];
  tagList.map(async (data) => {
    newList.push(data);
    if (data.tagName === "image") {
      const files = await fileDataModel
        .findOne({ uuid: data.uuid })
        .sort({ fileId: -1 })
        .exec();
      data = data.toJSON();
      data.files = [files];
    }
    count++;

    if (count === tagList.length) {
      res.status(200).send(newList);
    }
  });
});

router.post("/save", function (req, res) {
  const modifyList = req.body;
  console.log("modifyList : ", modifyList);

  modifyList.map((blockData) => {
    console.log("blockData : ", blockData);
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
