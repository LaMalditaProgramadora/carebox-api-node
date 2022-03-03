import { Product } from "../models/_index.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json({
    status: 1,
    message: "Productos encontrados",
    products: products,
  });
};

export const getByIdCategory = async (req, res) => {
  const { idCategory: idCategory } = req.query;
  const products = await Product.find({ category: idCategory });
  res.json({
    status: 1,
    message: "Productos encontrados",
    products: products,
  });
};

export const getByIdCategoryAndName = async (req, res) => {
  const { idCategory: idCategory, name: name } = req.query;
  const products = await Product.find({
    name: { $regex: name },
    category: idCategory,
  });
  res.json({
    status: 1,
    message: "Productos encontrados",
    products: products,
  });
};

export const getByName = async (req, res) => {
  const { name: name } = req.query;
  const products = await Product.find({ name: { $regex: name } });
  res.json({
    status: 1,
    message: "Productos encontrados",
    products: products,
  });
};
