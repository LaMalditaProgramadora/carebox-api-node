import mongoose from "mongoose";

const schemaAdministrator = {
  names: String,
  isActive: Boolean,
  lastNames: String,
  phone: String,
  userLogin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserLogin",
  },
};

const Administrator = mongoose.model(
  "Administrator",
  schemaAdministrator,
  "administrators"
);

export default Administrator;
