// routes/feedbackRoute.js
const express = require("express");
const router = express.Router();

// GET Feedback form page
router.get("/", (req, res) => {
  res.render("feedback");
});

// POST feedback form handler
router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Feedback Received:", { name, email, message });
  res.send("Thank you for your feedback!");
});

module.exports = router;
