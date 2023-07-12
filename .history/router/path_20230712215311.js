const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
const styleData = require("../models/styleData");
const { promises } = require("fs");

router.post("", function (req, res) {
  const { userId, title, sort } = req.body;
  pathCardModel.count().then((count) => {
    const pathCard = new pathCardModel({
      userId: userId,
      title,
      sort: count,
    });
    pathCard.save().then(res.send({ id: pathCard._id }));
  });
});

router.delete("", function (req, res) {
  const { pathId } = req.query;
  pathCardModel.deleteOne({ _id: pathId }).then(() => {
    tagBlockModel.find({ pathId }).then((tagBlocks) => {
      const promises = [];
      tagBlocks.forEach((tagBlock) => {
        promises.push(styleData.deleteOne({ uuid: tagBlock.uuid }));
        promises.push(tagBlockModel.deleteOne({ uuid: tagBlock.uuid }));
      });
      Promise.all(promises).then(() => {
        res.status(200).send();
      });
    });
  });
});

router.put("", function (req, res) {
  const { pathId, title } = req.body;
  pathCardModel.updateOne({ _id: pathId }, { title }).then(() => {
    res.status(200).send();
  });
});

router.get("", function (req, res) {
  const { userId } = req.query;
  pathCardModel.find({ userId }).then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;
