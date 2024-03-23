const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/jom", (req, res, next) => {
  res.render("jom", { docTitle: "jom", path: "../views/jom.ejs" });
});

// router.post("/hello", (req, res, next) => {
//   res.redirect("/");
// });

module.exports = router;
