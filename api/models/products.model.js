import mongoose from "mongoose";

const schemaProduct = {
  name: String,
  url: String,
  brand: String,
  price: Number,
  description: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
};

const Product = mongoose.model("Product", schemaProduct, "products");

export default Product;
