import mongoose from "mongoose";

const schemaClient = {
  names: String,
  lastNames: String,
  phone: String,
  address: String,
  userLogin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserLogin",
  },
  boxes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Box",
    },
  ],
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
  ],
};

const Client = mongoose.model("Client", schemaClient, "clients");

export default Client;
