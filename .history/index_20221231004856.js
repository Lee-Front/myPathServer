require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { PORT, MONGO_URI } = process.env;

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URI)
  .then((response) => {
    console.log("Successfully connect to mongodb");
  })
  .catch((e) => {
    console.error(e);
  });
app.use(cors());
app.listen(PORT, function () {
  console.log("서버실행 완료 port : " + PORT);
});

app.get("/api/getPathList", function (req, res) {
  console.log("req : ", req.query);
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
