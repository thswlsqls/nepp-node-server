import express from "express";
import { getMovieList } from "../apis/movie.js";

var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  //    const query = req.query.query;
  const { query, country, start } = req.query;
  const result = await getMovieList({ query, country, start });

  res.send(result);
});

export default router;
