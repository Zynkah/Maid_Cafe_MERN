const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
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

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
