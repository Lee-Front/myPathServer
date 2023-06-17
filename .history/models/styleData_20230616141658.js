const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true, unique: true },
    width: { type: Number, required: true, default: 100 },
    "font-size": { type: String, required: false },
    color: { type: String, required: false },
    background: { type: String, required: false },
    "font-family": { tyle: String, required: false },
    "font-weight": { type: String, required: false },
    "font-style": { type: String, required: false },
    "border-bottom": { type: String, required: false },
    "text-decoration": { type: String, required: false },
    "text-align": { type: String, required: false },
  },
  { timestames: true, versionKey: false }
);

module.exports = mongoose.model("Style", styleSchema);
