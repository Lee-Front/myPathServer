require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { PORT, MONGO_URI } = process.env;

// mongoose.Promise = global.Promise;

// mongoose
//   .connect(MONGO_URI)
//   .then((response) => {
//     console.log("Successfully connect to mongodb");
//   })
//   .catch((e) => {
//     console.error(e);
//   });

app.use(cors());

const pathRouter = require("./router/path");
const editorRouter = require("./router/editor");

app.listen(PORT, function () {
  console.log("서버실행 완료 port : " + PORT);
});
app.use("/api/path", pathRouter);

//app.use("/api/editor", editorRouter);
