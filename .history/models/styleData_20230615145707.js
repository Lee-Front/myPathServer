const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    width: { type: Number, required: true, default: 100 },
    fontSize: { type: Number, required: false },
    color: { type: String, required: false },
    background: { type: String, required: false },
    fontFamily: { tyle: String, required: false },
    bold: { type: Boolean, required: false },
    italic: { type: Boolean, required: false },
    underLine: { type: Boolean, required: false },
    strikethrough: { type: Boolean, required: false },
    textAlign: { type: String, required: false },
  },
  { timestames: true, versionKey: false }
);

module.exports = mongoose.model("Style", styleSchema);
