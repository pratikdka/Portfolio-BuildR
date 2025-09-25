const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");

router.post("/download", async (req, res) => {
  const data = req.session.portfolio;

  if (!data) {
    return res.status(400).send("No portfolio data found.");
  }

  try {
    // Render EJS to HTML
    const html = await ejs.renderFile(
      path.join(__dirname, "../views/portfolio.ejs"),
      data
    );

    // Launch puppeteer and create PDF
    const browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Load HTML content
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Save PDF
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

    await browser.close();

    // Send PDF as download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=portfolio.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).send("Error generating portfolio PDF.");
  }
});

module.exports = router;
