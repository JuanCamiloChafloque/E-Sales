const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Client name is required"],
    },
    document: {
      type: String,
      required: [true, "Client document is required"],
    },
    email: {
      type: String,
      required: [true, "Client email is required"],
    },
    points: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("client", ClientSchema);
