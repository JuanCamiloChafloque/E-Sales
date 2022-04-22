const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    purchaseCost: {
      type: String,
      required: [true, "Product purchase cost is required"],
    },
    saleCost: {
      type: String,
      required: [true, "Product sale cost is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    points: {
      type: Number,
      required: [true, "Product points is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
