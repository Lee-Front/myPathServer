const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");

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
  // 임시 카드목록
  const { userId } = req.query;
  pathCardModel.find({ userId }).then((data) => {
    console.log("data : ", data.id);
    res.status(200).send(data);
  });
});

module.exports = router;
