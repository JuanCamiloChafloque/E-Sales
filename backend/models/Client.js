const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
    },
    document: {
      type: String,
    },
    email: {
      type: String,
    },
    points: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("client", ClientSchema);
