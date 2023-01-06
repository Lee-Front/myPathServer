const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;

app.listen(port, function () {
  console.log("서버실행 완료 port : " + port);
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", function (req, res) {
  console.log("aaaa");
  res.send("main");
});
