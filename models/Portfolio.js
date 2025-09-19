const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  title: String,
  bio: String,
  skills: [String],
  projectTitle: String,
  projectDesc: String,
  github: String,
  linkedin: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
