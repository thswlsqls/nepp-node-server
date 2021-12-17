import express from 'express';
import { getPostMain, postPost } from '../controllers/post.js';
var router = express.Router();

// 서버주소/user으로 요청이 올 경우
router.get('/main', getPostMain);
router.post('/', postPost);

export default router;
