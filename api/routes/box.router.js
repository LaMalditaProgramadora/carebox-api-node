import express from "express";

import { BoxController } from "../controllers/_index.js";
import { validateToken } from "../middlewares/_index.js";

const {
  createStandardBox,
  createCustomBox,
  updateBox,
  getById,
  getStandardBoxes,
  getStandardBoxesByName,
  getStandardBoxesByNameAndMinPriceAndMaxPrice,
  getStandardBoxesByMinPriceAndMaxPrice,
  getCustomBoxes,
  getCustomBoxesByName,
} = BoxController;

const router = express.Router();

const boxRouters = {
  CREATE_STANDARD_BOX: "/boxes/createStandard",
  CREATE_CUSTOM_BOX: "/boxes/createCustom",
  UPDATE_BOX: "/boxes/updateBox",
  GET_BY_ID: "/boxes/listById",
  GET_STANDARD_BOXES: "/boxes/listStandard",
  GET_STANDARD_BOXES_BY_NAME: "/boxes/listStandardByName",
  GET_STANDARD_BOXES_BY_NAME_AND_MINPRICE_AND_MAXPRICE:
    "/boxes/listStandardByNameAndMinPriceAndMaxPrice",
  GET_STANDARD_BOXES_BY_MINPRICE_AND_MAXPRICE:
    "/boxes/listStandardByMinPriceAndMaxPrice",
  GET_CUSTOM_BOXES: "/boxes/listCustom",
  GET_CUSTOM_BOXES_BY_NAME: "/boxes/listCustomByName",
};

router.post(boxRouters.CREATE_STANDARD_BOX, validateToken, createStandardBox);
router.post(boxRouters.CREATE_CUSTOM_BOX, validateToken, createCustomBox);
router.put(boxRouters.UPDATE_BOX, validateToken, updateBox);
router.get(boxRouters.GET_BY_ID, getById);
router.get(boxRouters.GET_STANDARD_BOXES, getStandardBoxes);
router.get(boxRouters.GET_STANDARD_BOXES_BY_NAME, getStandardBoxesByName);
router.get(
  boxRouters.GET_STANDARD_BOXES_BY_NAME_AND_MINPRICE_AND_MAXPRICE,
  getStandardBoxesByNameAndMinPriceAndMaxPrice
);
router.get(
  boxRouters.GET_STANDARD_BOXES_BY_MINPRICE_AND_MAXPRICE,
  getStandardBoxesByMinPriceAndMaxPrice
);
router.get(boxRouters.GET_CUSTOM_BOXES, validateToken, getCustomBoxes);
router.get(
  boxRouters.GET_CUSTOM_BOXES_BY_NAME,
  validateToken,
  getCustomBoxesByName
);

export default router;
