const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    purchaseCost: {
      type: String,
    },
    saleCost: {
      type: String,
    },
    stock: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    points: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
