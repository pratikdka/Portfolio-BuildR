const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Portfolio = require("../models/Portfolio");

// Storage engine for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route to handle form submission with image upload
router.post("/submit", upload.single("image"), async (req, res) => {
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
    const skillArray = Array.isArray(skills) ? skills : skills.split(",");
    const projectArray = Array.isArray(projectTitle)
      ? projectTitle.map((title, i) => ({
          title,
          description: projectDesc[i] || "",
        }))
      : [{ title: projectTitle, description: projectDesc }];

    const newPortfolio = new Portfolio({
      fullName,
      email,
      title,
      bio,
      skills: skillArray,
      projectTitle: Array.isArray(projectTitle) ? projectTitle[0] : projectTitle,
      projectDesc: Array.isArray(projectDesc) ? projectDesc[0] : projectDesc,
      github,
      linkedin,
    });

    await newPortfolio.save();
    console.log("Form Data Saved:", newPortfolio);

    // Render the portfolio view with all dynamic data
    res.render("portfolio", {
      fullName,
      email,
      title,
      bio,
      skills: skillArray,
      github,
      linkedin,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      projects: projectArray,
    });
  } catch (err) {
    console.error("Error saving portfolio:", err);
    res.status(500).send("Error saving portfolio data. Please try again.");
  }
});

module.exports = router;
