const mongoose = require("mongoose");

const tagBlockSchema = new mongoose.Schema(
  {
    pathId: { type: any },
    uuid: { type: String, required: true, unique: true },
    tagName: { type: String, requied: true },
    parentId: { type: String },
    html: { type: String },
    defaultPlaceHolder: { type: String },
    placeholder: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tagBlock", tagBlockSchema);
