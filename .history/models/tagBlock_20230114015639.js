const mongoose = require("mongoose");

const tagBlockSchema = new mongoose.Schema(
  {
    pathId: { type: Number, requied: true },
    uuid: { type: String, required: true, unique: true },
    tagName: { type: String, requied: true },
    html: { type: String },
    defaultPlaceHolder: { type: String },
    placeholder: { type: String },
    parentId: { type: String },
    direction: { type: String },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "fileData" }],
  },
  { timestames: true, versionKey: false }
);

const fileDataSchema = new mongoose.Schema({
  fileId: { type: Number, require: true, unique: true },
  uuid: { type: String, require: true },
  fileName: { type: String, require: true },
  extension: { type: String, require: true },
  fileSize: { type: Number, require: true },
});

module.exports = mongoose.model("tagBlock", tagBlockSchema);
module.exports = mongoose.model("fileData", fileDataSchema);
