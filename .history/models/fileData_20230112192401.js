const mongoose = require("mongoose");

const fileDataSchema = new mongoose.Schema({
  fileId: { type: Number, require: true, unique: true },
});
