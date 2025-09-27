const request = require("supertest");
const app = require("../app"); // Import app (not server.js)

describe("Integration Tests - Basic Routes", () => {
  it("should return 200 and render the homepage", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    // check if HTML includes title text
    expect(res.text).toContain("Portfolio BuildR"); 
  });

  it("should return 200 and render the form page", async () => {
    const res = await request(app).get("/form");
    expect(res.statusCode).toBe(200);
    // form page usually has 'submit' button
    expect(res.text).toContain("form");
  });
});
