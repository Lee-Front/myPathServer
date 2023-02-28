const mongoose = require("mongoose");

const styleDataSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  width: { type: Number, required: true, default: 100 },
  fontSize: { type: Number, required: false },
  color: { type: String, required: false },
  fontfamily: { tyle: String, required: false },
  bold: { type: Boolean, required: false },
  italic: { type: Boolean, required: false },
});
