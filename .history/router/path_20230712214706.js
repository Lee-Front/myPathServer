const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
const styleData = require("../models/styleData");

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
      tagBlocks.forEach((tagBlock) => {
        styleData.deleteOne({ uuid: tagBlock.uuid }).then(() => {
          console.log("styleData deleted");
        });

        tagBlockModel.deleteOne({ uuid: tagBlock.uuid }).then(() => {
          console.log("tagBlock deleted");
        });
      });
    });

    styleData.deleteMany({ pathId }).then(() => {
      res.status(200).send();
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
