require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { PORT, MONGO_URI } = process.env;
const ip = require("ip");

mongoose.Promise = global.Promise;

console.log("ip : ", ip.address());
console.log("PORT : ", PORT);
mongoose
  .set("strictQuery", true)
  .connect(MONGO_URI)
  .then((response) => {
    console.log("Successfully connect to mongodb");
  })
  .catch((e) => {
    console.error(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

const pathRouter = require("./router/path");
const editorRouter = require("./router/editor");

app.listen(PORT, function () {
  console.log("서버실행 완료");
});

app.use("/api/path", pathRouter);
app.use("/api/editor", editorRouter);

//app.use("/api/editor", editorRouter);
