const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const feedbackRoute = require("./routes/feedbackRoute");


// Connect DB
mongoose.connect("mongodb://localhost:27017/porfolioBuildRDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/feedback", feedbackRoute);

app.use(session({
  secret: "superSecretKey",
  resave: false,
  saveUninitialized: true,
}));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const formRoute = require("./routes/formRoute");
const downloadRoute = require("./routes/downloadRoute");

app.use("/", formRoute);
app.use("/", downloadRoute);

// Pages
app.get("/", (req, res) => res.render("index"));
app.get("/form", (req, res) => res.render("form"));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
