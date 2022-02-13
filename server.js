import express from "express";
import mongoose from "mongoose";
import {
  ProductController,
  CategoryController,
} from "./api/controllers/_index.js";
import dotenv from "dotenv";

dotenv.config();

const { getAllProducts, getByIdCategory, getByIdCategoryAndName, getByName } =
  ProductController;
const { getAllCategories } = CategoryController;

// Connect to db
await mongoose.connect(process.env.MONGODB_URL);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

// Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (response) => {
  response.send("CAREBOX API");
});

// Product
app.get("/products", getAllProducts);
app.get("/products/listByIdCategory", getByIdCategory);
app.get("/products/listByIdCategoryAndName", getByIdCategoryAndName);
app.get("/products/listByName", getByName);

// Category
app.get("/categories", getAllCategories);

// Launch server
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Se inició el servidor");
});
