const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
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

    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Load HTML content
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Force screen media (so it looks like browser, not print mode)
    await page.emulateMediaType("print");

    // Inject CSS to hide download button in PDF
    await page.addStyleTag({
      content: `
        @media print {
          .download-btn-container {
            display: none !important;
          }
        }
      `,
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

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
