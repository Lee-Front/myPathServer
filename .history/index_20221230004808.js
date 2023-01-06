const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const port = 8080;

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://www.example.org",
    changeOrigin: true,
  })
);
app.listen(port, function () {
  console.log("서버실행 완료 port : " + port);
});

app.get("/api", function (req, res) {
  console.log("aaaa");
  res.send("main");
});
