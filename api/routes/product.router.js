import express from "express";

import { ProductController } from "../controllers/_index.js";

const { getAllProducts, getByIdCategory, getByIdCategoryAndName, getByName } =
  ProductController;

const router = express.Router();

const productRoutes = {
  GET_ALL_PRODUCTS: "/products",
  GET_BY_ID_CATEGORY: "/products/listByIdCategory",
  GET_BY_ID_CATEGORY_AND_NAME: "/products/listByIdCategoryAndName",
  GET_BY_NAME: "/products/listByName",
};

router.get(productRoutes.GET_ALL_PRODUCTS, getAllProducts);
router.get(productRoutes.GET_BY_ID_CATEGORY, getByIdCategory);
router.get(productRoutes.GET_BY_ID_CATEGORY_AND_NAME, getByIdCategoryAndName);
router.get(productRoutes.GET_BY_NAME, getByName);

export default router;
