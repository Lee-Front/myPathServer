const mongoose = require("mongoose");

// pathCard에는
// pathCardId, timestames, sort, userId 일단 이정도
// 추후에 명함 디자인 관련된 컬럼이 추가되어야함
const pathCardSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    pathId: { type: Number, required: true, unique: true },
    title: { type: String },
    sort: { type: Number, required: false, unique: true },
  },
  { timestames: true, versionKey: false }
);

module.exports = mongoose.model("PathCard", pathCardSchema);
