const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileId: { type: String, require: true, unique: true },
  uuid: { type: String, require: true },
  fileName: { type: String, require: true },
  extension: { type: String, require: true },
  fileSize: { type: Number, require: true },
  width: { type: Number, require: true },
});

module.exports = mongoose.model("File", fileSchema);
