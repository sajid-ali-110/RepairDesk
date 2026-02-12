const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    websiteUrl: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    repairItems: {
      type: [String],
      default: [],
    },
    additionalInfo: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
