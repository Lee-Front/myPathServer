const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");

router.post("/create", function (req, res) {
  pathCardModel.count().then((count) => {
    const pathCard = new pathCardModel({
      userId: "wkdrmadl3",
      pathId: count + 1,
      sort: count,
    });
    pathCard.save().then(res.send({ pathId: pathCard.pathId }));
  });
});

router.get("/getList", function (req, res) {
  // 임시 카드목록
  const { userId } = req.query;
  pathCardModel
    .find({ userId })
    .populate(tagBlockModel.pathId)
    .then((data) => {
      res.status(200).send(data);
    });
});

module.exports = router;
