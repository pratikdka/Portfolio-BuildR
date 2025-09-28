const request = require("supertest");
const app = require("../app");

describe("Integration Test - Form Page", () => {
  it("should render the form with required fields", async () => {
    const res = await request(app).get("/form");
    expect(res.statusCode).toBe(200);

    // Check if the page has the main title
    expect(res.text).toContain("Portfolio BuildR - User Form");

    // Check critical form fields
    expect(res.text).toContain("Full Name");
    expect(res.text).toContain("Email");
    expect(res.text).toContain("Position");
    expect(res.text).toContain("Short Bio");
    expect(res.text).toContain("Skills");
    expect(res.text).toContain("Upload Profile Image");
    expect(res.text).toContain("Project Title");
    expect(res.text).toContain("GitHub Profile");
    expect(res.text).toContain("LinkedIn Profile");

    // Check submit button
    expect(res.text).toContain("Generate Portfolio");
  });
});
