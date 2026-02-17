import express from 'express';
import {optionalAuth} from "../middleware/auth.js";
import {CartOrder, placeCartOrder, placeOrder} from "../controllers/order.controller.js";
import {protect} from "../middleware/protect.js";
const router = express.Router();

router.post("/order",protect,placeOrder)
router.post("/place-cart-order",CartOrder)

export default router;