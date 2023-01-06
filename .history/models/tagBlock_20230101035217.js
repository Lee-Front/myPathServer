const mongoose = require("mongoose");

const tagBlockSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    pathId: { type: String, required: true },
    tagName: { type: String, requied: true },
    parentId: { type: String },
    html: { type: String },
    defaultPlaceHolder: { type: String },
    placeholder: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tagBlock", tagBlockSchema);
