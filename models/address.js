const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true, trim: true, min: 10},
  pinCode: { type: String, required: true, trim: true },
  locality: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  cityDistrictTown: { type: String, required: true, trim: true },
  state: { type: String, required: true },
  landmark: { type: String, min: 10, max: 100 },
  alternatePhone: { type: String },
  addressType: { type: String, required: true, enum: ["home", "work"], required: true },
});

const userAddressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);