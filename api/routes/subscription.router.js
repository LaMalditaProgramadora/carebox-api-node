import express from "express";
import { getAllByEmail } from "../controllers/subscription.controller.js";
import { validateToken } from "../middlewares/_index.js";
import { SubscriptionController } from "../controllers/_index.js";

const {
  createSubscription,
  cancel,
  getByIdClient,
  getAll,
  getTodaySubscriptions,
  getTodaySubscriptionsByEmail,
  updateDeliveredThisMonth,
} = SubscriptionController;

const router = express.Router();

const subscriptionRoutes = {
  CREATE_SUBSCRIPTION: "/subscriptions/create",
  CANCEL: "/subscriptions/cancel",
  GET_BY_ID_CLIENT: "/subscriptions/listByIdClient",
  GET_ALL: "/subscriptions/listAll",
  GET_ALL_BY_EMAIL: "/subscriptions/listAllByEmail",
  GET_TODAY_SUBSCRIPTIONS: "/subscriptions/listTodaySubscriptions",
  GET_TODAY_SUBSCRIPTIONS_BY_EMAIL:
    "/subscriptions/listTodaySubscriptionsByEmail",
  UPDATE_DELIVERY: "/subscriptions/update",
};

router.post(
  subscriptionRoutes.CREATE_SUBSCRIPTION,
  validateToken,
  createSubscription
);
router.delete(subscriptionRoutes.CANCEL, validateToken, cancel);
router.get(subscriptionRoutes.GET_BY_ID_CLIENT, validateToken, getByIdClient);
router.get(subscriptionRoutes.GET_ALL, validateToken, getAll);
router.get(subscriptionRoutes.GET_ALL_BY_EMAIL, validateToken, getAllByEmail);
router.get(
  subscriptionRoutes.GET_TODAY_SUBSCRIPTIONS,
  validateToken,
  getTodaySubscriptions
);
router.get(
  subscriptionRoutes.GET_TODAY_SUBSCRIPTIONS_BY_EMAIL,
  validateToken,
  getTodaySubscriptionsByEmail
);
router.put(
  subscriptionRoutes.UPDATE_DELIVERY,
  validateToken,
  updateDeliveredThisMonth
);

export default router;
