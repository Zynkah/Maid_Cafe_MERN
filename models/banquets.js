const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const banquetSchema = new Schema(
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
    cost: {
      type: Number,
      required: true,
    },
    featured: {
      required: true,
    },
  },
  { timestamps: true }
);

const Banquets = mongoose.model("Menu", banquetSchema);

module.exports = Banquets;