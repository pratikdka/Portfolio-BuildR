const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const formRoute = require("./routes/formRoute");

const feedbackRoute = require("./routes/feedbackRoute");
app.use("/feedback", feedbackRoute);

mongoose
  .connect("mongodb://localhost:27017/porfolioBuildRDB", {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use("/", formRoute);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("Check it out on http://localhost:" + `${PORT}`);
