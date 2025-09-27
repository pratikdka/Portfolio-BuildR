/**
 * @jest-environment jsdom
 */

const mailController = require("../public/js/mailController");

describe("Mail Controller", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <html data-theme="light">
        <span id="mode-label">Light Mode</span>
      </html>
    `;
  });

  it("should toggle light to dark mode", () => {
    mailController.toggleMode();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("should toggle dark to light mode", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    mailController.toggleMode();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });
});
