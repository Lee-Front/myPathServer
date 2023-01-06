const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");

router.get("/getList", function (req, res) {
  console.log("req.query.pathId: ", req.query.pathId);
  tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .then((data) => {
      res.status(200).send(data);
    });
});

router.post("/save", function (req, res) {
  const modifyList = req.body;

  modifyList.map((blockData) => {
    console.log("blockData : ", blockData);
    tagBlockModel
      .findOneAndUpdate(
        { uuid: blockData.data.uuid },
        { ...blockData.data },
        { new: true, upsert: true }
      )
      .then((data) => {
        console.log("data : ", data);
      });
  });
  res.status(200).send(data);
});

module.exports = router;
