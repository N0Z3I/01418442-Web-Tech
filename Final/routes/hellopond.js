const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/hello", (req, res, next) => {
  res.render("hello", { docTitle: "Hello", path: "../views/hello.ejs" });
});

// router.post("/hello", (req, res, next) => {
//   res.redirect("/");
// });

module.exports = router;
