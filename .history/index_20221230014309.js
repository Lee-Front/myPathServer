const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;
app.use(cors());
app.listen(port, function () {
  console.log("서버실행 완료 port : " + port);
});

app.get("/api/getPathList", function (req, res) {
  console.log("req : ", req.params);
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
