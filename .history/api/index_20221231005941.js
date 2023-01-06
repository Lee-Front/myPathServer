const router = require("express").Router();
const path = require("./path");
const editor = require("./editor");

router.use("/path");
router.use("/editor");

module.exports = router;
