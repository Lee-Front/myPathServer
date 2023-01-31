const express = require("express");
const router = express.Router();
const tagBlockModel = require("../models/tagBlock");
const multer = require("multer");
const upload = multer({ dest: "images/" });

router.get("/getList", function (req, res) {
  tagBlockModel
    .find({ pathId: req.query.pathId })
    .select("-_id")
    .then((data) => {
      res.status(200).send(data);
    });
});
router.post("/upload", upload.single("img"), (req, res) => {
  console.log(req.file);
});
router.post("/save", function (req, res) {
  const modifyList = req.body;
  console.log("modifyList: ", modifyList);

  modifyList.map((blockData) => {
    if (blockData.type === "delete") {
      tagBlockModel.deleteOne({ uuid: blockData.data.uuid }).exec();
    } else {
      tagBlockModel
        .findOneAndUpdate(
          { uuid: blockData.data.uuid },
          { ...blockData.data },
          { new: true, upsert: true }
        )
        .exec();
    }
  });
  res.status(200).send();
});

module.exports = router;
