// routes/formRoute.js
const express = require("express");
const router = express.Router();
const Portfolio = require("../models/Portfolio");

// POST route to handle form submission
router.post("/submit", async (req, res) => {
  const {
    fullName,
    email,
    title,
    bio,
    skills,
    projectTitle,
    projectDesc,
    github,
    linkedin,
  } = req.body;

  try {
    const newPortfolio = new Portfolio({
      fullName,
      email,
      title,
      bio,
      skills,
      projectTitle,
      projectDesc,
      github,
      linkedin,
    });

    await newPortfolio.save();
    console.log("Form Data Received:", newPortfolio);

    // Rendering a portfolio view or redirect
    res.send(`
      <h2>Thank you ${fullName}!</h2>
      <p>Your portfolio has been generated.</p>
      <a href="/">Back to Home</a>
    `);
  } catch (err) {
    console.err("Error saving Portfolio:", err);
    res.status(500).send("Error saving protfolio data, Please Try again.");
  }
});

module.exports = router;
