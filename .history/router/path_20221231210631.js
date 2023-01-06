const express = require("express");
const router = express.Router();
const pathCardModel = require("../models/pathCard");

const getTotalCount = async () => {
  let totalCount = 0;
  await pathCardModel.count().then((count) => {
    totalCount = count;
  });
  return totalCount;
};

router.post("/create", function (req, res) {
  //let totalCount = getTotalCount();

  let totalCount = getTotalCount();

  const pathCard = new pathCardModel({
    userId: "wkdrmadl3",
    pathId: totalCount + 1,
    sort: totalCount,
  });

  console.log("totalCount: ", totalCount);
  console.log("pathCard: ", pathCard);
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
