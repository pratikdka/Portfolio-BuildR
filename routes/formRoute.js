const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
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

    // Convert uploaded image to Base64 if exists
    let imageBase64 = null;
    if (req.file) {
      const filePath = path.join("public/uploads", req.file.filename);
      const fileData = fs.readFileSync(filePath);
      imageBase64 = `data:${req.file.mimetype};base64,${fileData.toString("base64")}`;
    }

    // Save to DB (imageBase64 is not stored, but you can extend schema if needed)
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
      image: imageBase64,
      projects: projectArray,
    };

    res.render("portfolio", req.session.portfolio);
  } catch (err) {
    console.error("Error saving portfolio:", err);
    res.status(500).send("Error saving portfolio data.");
  }
});

module.exports = router;
