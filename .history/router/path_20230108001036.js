const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");
console.log("path");

router.post("/create", function (req, res) {
  const { userId, title, sort } = req.body;
  pathCardModel.count().then((count) => {
    const pathCard = new pathCardModel({
      userId: userId,
      pathId: count + 1,
      title,
      sort: count,
    });
    pathCard.save().then(res.send({ pathId: pathCard.pathId }));
  });
});

router.get("/getList", function (req, res) {
  console.log("getList");
  console.log("req.query");
  // 임시 카드목록
  const { userId } = req.query;
  pathCardModel
    .find({ userId })
    .populate(tagBlockModel.pathId)
    .then((data) => {
      console.log("data : ", data);
      res.status(200).send(data);
    });
});

module.exports = router;
