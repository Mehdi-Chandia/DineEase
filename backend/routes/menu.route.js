import express from 'express';
import {createMenu, getAllMenuItems} from '../controllers/menu.controller.js';
import {optionalAuth} from "../middleware/auth.js";
import {onlyOwner} from "../middleware/onlyOwner.js";
import upload from "../multer/multer.js";

const router = express.Router();

router.get('/getAllItems', getAllMenuItems); // GET /api/menu

router.post("/",optionalAuth,onlyOwner,upload.single('image'),createMenu)

export default router;
