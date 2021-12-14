import express from 'express';
import { postUser, postUserLogin } from '../controllers/user.js';
var router = express.Router();

// 서버주소/user으로 요청이 올 경우
router.post('/', postUser);
// 서버주소/token으로 요청이 올 경우
router.post('/token', postUserLogin);

export default router;
