const Portfolio = require("../models/Portfolio");

describe("Portfolio Model", () => {
  it("should be defined", () => {
    expect(Portfolio).toBeDefined();
  });

  it("should create a new Portfolio instance with required fields", () => {
    const portfolio = new Portfolio({
      fullName: "Test User",
      email: "test@example.com",
    });

    expect(portfolio.fullName).toBe("Test User");
    expect(portfolio.email).toBe("test@example.com");
  });
});
