const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");

router.post("/create", function (req, res) {
  const test = pathCardModel.countDocuments();
  console.log("test : ", test);
  console.log("test : ", test.count_documents);
  const pathCard = new pathCardModel({
    userId: "wkdrmadl3",
    pathId: 1,
    sort: 0,
  });
  //pathCard.save();
});

router.get("/getList", function (req, res) {
  // 임시 카드목록

  const list = [
    { id: 1, title: "테크마인드" },
    { id: 2, title: "유밥" },
    { id: 3, title: "Career1" },
    { id: 4, title: "Career2" },
    { id: 5, title: "Career3" },
    { id: 6, title: "Career4" },
    { id: 7, title: "Career5" },
    { id: 8, title: "Career6" },
  ];
  res.send(list);
});

module.exports = router;
