import express from "express";

import { CategoryController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { getAllCategories } = CategoryController;

const router = express.Router();

const categoryRouters = {
  GET_ALL_CATEGORIES: "/categories",
};

router.get(categoryRouters.GET_ALL_CATEGORIES, validateToken, getAllCategories);

export default router;
