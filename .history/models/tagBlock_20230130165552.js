const mongoose = require("mongoose");

const tagBlockSchema = new mongoose.Schema(
  {
    pathId: { type: Number, requied: true },
    uuid: { type: String, required: true, unique: true },
    tagName: { type: String, requied: true },
    html: { type: String },
    width: { type: String },
    parentId: { type: String },
    direction: { type: String },
    checkYn: { type: Boolean },
  },
  { timestames: true, versionKey: false }
);

module.exports = mongoose.model("tagBlock", tagBlockSchema);
