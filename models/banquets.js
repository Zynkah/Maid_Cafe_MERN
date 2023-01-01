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
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Banquets = mongoose.model("Banquets", banquetSchema);

module.exports = Banquets;
