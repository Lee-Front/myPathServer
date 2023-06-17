const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");
const tagBlockModel = require("../models/tagBlock");

router.post("/create", function (req, res) {
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

router.get("/getList", function (req, res) {
  const { userId } = req.query;
  pathCardModel.find({ userId }).then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;