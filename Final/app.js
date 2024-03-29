const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const hello = require("./routes/hellopond");
const jom = require("./routes/jom");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(hello);
app.use(jom);

app.use((req, res, next) => {
  res.status(404).render("404", { docTitle: "Final", path: "" });
});
app.listen(3000);
