const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Portfolio = require("../models/Portfolio");

// Storage engine
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

// Handle form submission
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

    const image = req.file ? `/uploads/${req.file.filename}` : null;

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

    // Save data in session for PDF download
    req.session.portfolio = {
      fullName,
      email,
      title,
      bio,
      skills: skillArray,
      github,
      linkedin,
      image,
      projects: projectArray,
    };

    res.render("portfolio", req.session.portfolio);
  } catch (err) {
    console.error("Error saving portfolio:", err);
    res.status(500).send("Error saving portfolio data.");
  }
});

module.exports = router;
