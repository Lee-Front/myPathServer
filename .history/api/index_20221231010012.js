const router = require("express").Router();
const path = require("./path");
const editor = require("./editor");

router.use("/path", path.routes());
router.use("/editor", editor.routes());

module.exports = router;
