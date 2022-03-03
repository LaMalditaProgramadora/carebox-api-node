import mongoose from "mongoose";

const schemaUserLogin = {
  email: String,
  password: String
};

const UserLogin = mongoose.model("UserLogin", schemaUserLogin, "userLogins");

export default UserLogin;