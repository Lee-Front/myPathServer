const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
const styleDataModel = require("../models/styleData");

router.get("/", async function (req, res) {
  try {
    const pathCard = await pathCardModel.findById(req.query.pathId);
    const pathId = pathCard._id.toString();
    console.log("a");
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
          let: { styleUuid: "$uuid" },
          pipeline: [
            { $match: { $expr: { $eq: ["$uuid", "$$styleUuid"] } } },
            { $limit: 1 },
            {
              $project: {
                _id: 0,
                style: {}, // 빈 객체로 설정합니다
              },
            },
          ],
          as: "style",
        },
      },
    ]);
    console.log("tagList: ", tagList);
    res.status(200).send(tagList);
  } catch (e) {
    console.log("e : ", e);
    res.status(500).send(e);
  }
});

router.post("/", function (req, res) {
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

router.post("/style", function (req, res) {
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
