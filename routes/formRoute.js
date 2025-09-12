// routes/formRoute.js
const express = require('express');
const router = express.Router();

// POST route to handle form submission
router.post('/submit', (req, res) => {
  const {
    fullName,
    email,
    title,
    bio,
    skills,
    projectTitle,
    projectDesc,
    github,
    linkedin
  } = req.body;

  // For now, just loging the data and redirecting it to home
  console.log("Form Data Received:");
  console.log(req.body);

  // Rendering a portfolio view or redirect
  res.send(`
    <h2>Thank you ${fullName}!</h2>
    <p>Your portfolio has been generated.</p>
    <a href="/">Back to Home</a>
  `);
});

module.exports = router;
