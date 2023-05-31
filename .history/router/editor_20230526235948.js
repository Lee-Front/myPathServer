const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");
const styleDataModel = require("../models/styleData");

router.get("/getList", async function (req, res) {
  const pathCard = await pathCardModel.findById(req.query.pathId);
  if (pathCard) {
    const pathId = pathCard._id.toString();

    const tagList = await tagBlockModel.aggregate([
      { $match: { pathId } },
      {
        $lookup: {
          from: "files",
          localField: "uuid",
          foreignField: "uuid",
          as: "files",
        },
      },
      {
        $lookup: {
          from: "styles",
          localField: "uuid",
          foreignField: "uuid",
          as: "style",
        },
      },
    ]);
    res.status(200).send(tagList);
  } else {
    res.status(500).send();
  }
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

  res.status(200).send();
});

module.exports = router;
