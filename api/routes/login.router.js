import express from "express";

import { LoginController } from "../controllers/_index.js";

const {
  loginClient,
  loginAdministrator,
  registerAdministrator,
  registerClient,
} = LoginController;

const router = express.Router();

const loginRoutes = {
  LOGIN_CLIENT: "/login/client",
  LOGIN_ADMINISTRATOR: "/login/administrator",
  REGISTER_CLIENT: "/login/registerClient",
  REGISTER_ADMINISTRATOR: "/login/registerAdministrator",
};

router.post(loginRoutes.LOGIN_CLIENT, loginClient);
router.post(loginRoutes.LOGIN_ADMINISTRATOR, loginAdministrator);
router.post(loginRoutes.REGISTER_CLIENT, registerClient);
router.post(loginRoutes.REGISTER_ADMINISTRATOR, registerAdministrator);

export default router;