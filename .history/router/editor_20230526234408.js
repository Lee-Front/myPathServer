const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
const fileDataModel = require("../models/fileData");
const styleDataModel = require("../models/styleData");

router.get("/getList", async function (req, res) {
  // const tagList = await tagBlockModel
  //   .find({ _id: req.query.id })
  //   .select("-_id")
  //   .exec();
  // console.log("req.query.id: ", req.query.id);

  const pathCard = await pathCardModel.findById(req.query.pathId);
  if (pathCard) {
    const pathId = pathCard._id.toString();

    const tagList = await tagBlockModel.aggregate([
      { $match: { pathId } },
      {
        $lookup: {
          from: "fileData",
          let: { uuid: "uuid" },
          pipeline: [
            { $match: { $expr: { $eq: ["$uuid", "$$uuid"] } } },
            { $sort: { fileId: -1 } },
            { $limit: 1 },
          ],
          as: "files",
        },
      },
    ]);
    console.log("tagList: ", tagList);
    res.status(200).send(tagList);
  } else {
    console.log("없음");
    res.status(500).send();
  }

  let count = 0;
  const newList = [];

  // tagList.map(async (data) => {
  //   console.log("data: ", data);

  //   if (data.tagName === "image") {
  //     const files = await fileDataModel
  //       .findOne({ uuid: data.uuid })
  //       .sort({ fileId: -1 })
  //       .exec();
  //     data.files = [files];
  //   }

  //   const styleData = await styleDataModel
  //     .findOne({ uuid: data.uuid })
  //     .select("-_id -uuid")
  //     .exec();
  //   data.styleData = styleData;

  //   newList.push(data);
  //   count++;

  //   if (count === tagList.length) {
  //     res.status(200).send(newList);
  //   }
  // });
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
