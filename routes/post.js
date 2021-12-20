import express from "express";
import { getPostMain, postPost, getPost } from "../controllers/post.js";
var router = express.Router();

/* GET home page. */
router.get("/main", getPostMain);
router.post("/", postPost);
router.get("/", getPost);

export default router;
