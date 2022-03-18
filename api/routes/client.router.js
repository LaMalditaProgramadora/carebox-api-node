import express from "express";

import { ClientController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { getById, updateClient } = ClientController;

const router = express.Router();

const clientRoutes = {
  GET_BY_ID: "/clients/listById",
  UPDATE_CLIENT: "/clients/update",
};

router.get(clientRoutes.GET_BY_ID, validateToken, getById);
router.put(clientRoutes.UPDATE_CLIENT, validateToken, updateClient);

export default router;