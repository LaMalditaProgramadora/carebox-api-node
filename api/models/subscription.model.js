import mongoose from "mongoose";

const schemaSubscription = {
  deliveryDate: String,
  deliveredThisMonth: Boolean,
  deliveries: Number,
  address: String,
  price: Number,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  box: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Box",
  },
};

const Subscription = mongoose.model(
  "Subscription",
  schemaSubscription,
  "subscriptions"
);

export default Subscription;
