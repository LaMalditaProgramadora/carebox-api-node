import express from "express";

import { ProductController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { getAllProducts, getByIdCategory, getByIdCategoryAndName, getByName } =
  ProductController;

const router = express.Router();

const productRoutes = {
  GET_ALL_PRODUCTS: "/products",
  GET_BY_ID_CATEGORY: "/products/listByIdCategory",
  GET_BY_ID_CATEGORY_AND_NAME: "/products/listByIdCategoryAndName",
  GET_BY_NAME: "/products/listByName",
};

router.get(productRoutes.GET_ALL_PRODUCTS, validateToken, getAllProducts);
router.get(productRoutes.GET_BY_ID_CATEGORY, validateToken, getByIdCategory);
router.get(
  productRoutes.GET_BY_ID_CATEGORY_AND_NAME,
  validateToken,
  getByIdCategoryAndName
);
router.get(productRoutes.GET_BY_NAME, validateToken, getByName);

export default router;
