const request = require("supertest");
const app = require("../app");

describe("Integration Test - Feedback Page", () => {
  it("should render feedback form with required fields", async () => {
    const res = await request(app).get("/feedback");
    expect(res.statusCode).toBe(200);

    // Page title
    expect(res.text).toContain("Submit Your Feedback");

    // Form fields
    expect(res.text).toContain("Your Name");
    expect(res.text).toContain("Your Email");
    expect(res.text).toContain("Your Feedback");

    // Submit button
    expect(res.text).toContain("Send Feedback");
  });
});
