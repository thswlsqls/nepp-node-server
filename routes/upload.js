import express from 'express';
import { postUploadImage } from '../controllers/upload.js';
import { upload } from '../aws/index.js';
var router = express.Router();

// 중간다리 역할로 호출한 함수의 결과를 최종 함수에서 req 값으로 활용할 수 잇음
router.post('/image', upload.single('file'), postUploadImage);

export default router;
