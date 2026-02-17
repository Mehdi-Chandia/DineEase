import express from "express";
import {reservation} from "../controllers/reservation.controller.js";
import {optionalAuth} from "../middleware/auth.js";
import {protect} from "../middleware/protect.js";
const router = express.Router();

router.post("/reservation",reservation)

export default router;