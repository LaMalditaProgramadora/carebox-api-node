import express from "express";

import { AdministratorController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const { updateAdministrator } = AdministratorController;

const router = express.Router();

const administratorRoutes = {
  UPDATE_ADMINISTRATOR: "/administrators/update",
};

router.put(administratorRoutes.UPDATE_ADMINISTRATOR, validateToken, updateAdministrator);

export default router;
