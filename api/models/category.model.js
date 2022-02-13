import mongoose from "mongoose";

const schemaCategory = {
  name: String
};

const Category = mongoose.model("Category", schemaCategory, "categories");

export default Category;