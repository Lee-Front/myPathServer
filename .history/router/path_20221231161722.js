const express = require("express");
const router = express.Router();
const pathCard = require("../models/pathCard");

router.get("/getList", function (req, res) {
  // 임시 카드목록

  const path = new pathCard({
    pathId: 1,
    title: "테스트",
  });
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
