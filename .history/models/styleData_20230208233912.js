const mongoose = require("mongoose");

const styleDataSchema = new mongoose.Schema({
  uuid: { type: String, required: true, unique: true },
  width: { type: Number, required: false },
  fontSize: { type: Number, required: true, default: "1.6" },
});
