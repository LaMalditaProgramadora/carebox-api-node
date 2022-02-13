import { Category } from "../models/_index.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: 1,
    message: "Categorías encontradas",
    categories: categories,
  });
};
