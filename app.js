const express = require("express");
const bodyparser = require("body-parser");
const exp = require("constants");
const date = require(__dirname + "/date.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let day = date.getdate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.listen(3000, () => {
  console.log("Server is working on port 3000");
});
