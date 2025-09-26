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
    // Render EJS with the selected theme from the form
    const htmlRaw = await ejs.renderFile(
      path.join(__dirname, "../views/portfolio.ejs"),
      { ...data, theme: req.body.theme || "theme-light" }
    );

    // Inject a <base> tag so /css/... and /images/... resolve while using setContent
    const baseHref = `${req.protocol}://${req.get("host")}/`;
    const html = htmlRaw.replace(
      "<head>",
      `<head><base href="${baseHref}">`
    );

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Load the HTML with a real base URL; wait for CSS to load
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Use print media so your @media print rules (hide button & selector) apply
    await page.emulateMediaType("print");

    //  Hide controls in PDF even if page CSS missed it
    await page.addStyleTag({
      content: `
        @media print {
          .download-btn-container,
          .theme-selector { display: none !important; visibility: hidden !important; }
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

    // Send PDF
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
