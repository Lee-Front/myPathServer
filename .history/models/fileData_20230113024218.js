const mongoose = require("mongoose");

const fileDataSchema = new mongoose.Schema({
  fileId: { type: Number, require: true, unique: true },
  uuid: { type: String, require: true },
  fileName: { type: String, require: true },
  extension: extension,
  fileSize: { type: Number, require: true },
});

module.exports = mongoose.model("fileData", fileDataSchema);
