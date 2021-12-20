import express from "express";
import { postUser, postUserLogin, getMyInfo } from "../controllers/user.js";
var router = express.Router();

router.post("/", postUser);
router.post("/token", postUserLogin);
router.get("/me", getMyInfo);

export default router;
