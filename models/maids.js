const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const maidSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      required: true,
    },
    featured: {
      required: true,
    },
  },
  { timestamps: true }
);

const Maids = mongoose.model("Menu", maidSchema);

module.exports = Maids;