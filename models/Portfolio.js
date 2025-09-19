const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    title: { type: String },
    bio: { type: String },
    skills: { type: [String] },
    projectTitle: { type: String },
    projectDesc: { type: String },
    github: { type: String },
    linkedin: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", portfolioSchema);
