const express = require("express");

const app = express();

const port = 8080;
app.listen(port, function () {
  console.log("서버실행 완료 port : " + port);
});

app.get("/", function (req, res) {
  console.log("aaaa");
  res.send("main");
});
