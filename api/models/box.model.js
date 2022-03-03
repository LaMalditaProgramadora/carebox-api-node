import mongoose from "mongoose";

const schemaBox = {
  name: String,
  price: Number,
  isCustom: Boolean,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
};

const Box = mongoose.model("Box", schemaBox, "boxes");

export default Box;
