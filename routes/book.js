import express from "express";
import { getBookList, getBookDetail } from "../apis/book.js";

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { query, start } = req.query;
  const result = await getBookList({ query, start });

  res.send(result);
});

router.get("/:isbn", async function (req, res, next) {
  const { isbn } = req.params;
  const result = await getBookDetail({ d_isbn: isbn });

  res.send(result);
});

export default router;
