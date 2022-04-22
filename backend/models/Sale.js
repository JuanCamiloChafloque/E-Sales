const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SaleSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "client",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    details: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sale", SaleSchema);
