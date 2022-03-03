import express from "express";

import { AdministratorController } from "../controllers/_index.js";

const { updateAdministrator } = AdministratorController;

const router = express.Router();

const administratorRoutes = {
  UPDATE_ADMINISTRATOR: "/administrators/update",
};

router.put(administratorRoutes.UPDATE_ADMINISTRATOR, updateAdministrator);

export default router;
