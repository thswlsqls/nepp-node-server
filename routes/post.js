import express from 'express';
import { getPostMain } from '../controllers/post.js';
var router = express.Router();

// 서버주소/user으로 요청이 올 경우
router.post('/main', getPostMain);

export default router;
