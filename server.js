import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {
  ProductRouter,
  CategoryRouter,
  BoxRouter,
  LoginRouter,
  ClientRouter,
  AdministratorRouter,
  SubscriptionRouter,
} from "./api/routes/_index.js";

dotenv.config();

// Connect to db
await mongoose.connect(process.env.MONGODB_CAREBOX_URL);

// Listener to connection error
mongoose.connection.on("error", function (e) {
  console.error("ERROR: ", e);
});

// Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("CAREBOX API");
});

app.use("/", ProductRouter);
app.use("/", CategoryRouter);
app.use("/", BoxRouter);
app.use("/", LoginRouter);
app.use("/", ClientRouter);
app.use("/", AdministratorRouter);
app.use("/", SubscriptionRouter);

// Launch server
app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("Se inició el servidor");
});
