import express from "express";
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "asdfasdf" });
});

export default router;
