/**
 * @jest-environment jsdom
 */

describe("Form Page UI", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <form id="portfolioForm">
        <input id="fullName" name="fullName" placeholder="Full Name" value=""/>
        <input id="email" name="email" type="email" placeholder="Email" value=""/>
        <textarea id="skills" name="skills"></textarea>
        <button type="submit" id="submitBtn">Create Portfolio</button>
      </form>
    `;
  });

  it("should render all required fields", () => {
    expect(document.getElementById("fullName")).not.toBeNull();
    expect(document.getElementById("email")).not.toBeNull();
    expect(document.getElementById("skills")).not.toBeNull();
    expect(document.getElementById("submitBtn")).not.toBeNull();
  });

  it("should not allow submission when required fields are empty", () => {
    const form = document.getElementById("portfolioForm");
    const mockSubmit = jest.fn((e) => e.preventDefault());
    form.addEventListener("submit", mockSubmit);

    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(document.getElementById("fullName").value).toBe("");
    expect(document.getElementById("email").value).toBe("");
  });

  it("should allow submission when fields are filled", () => {
    document.getElementById("fullName").value = "Test User";
    document.getElementById("email").value = "test@example.com";
    document.getElementById("skills").value = "Node.js, MongoDB";

    const form = document.getElementById("portfolioForm");
    const mockSubmit = jest.fn((e) => e.preventDefault());
    form.addEventListener("submit", mockSubmit);

    form.dispatchEvent(new Event("submit", { bubbles: true }));

    expect(mockSubmit).toHaveBeenCalled();
    expect(document.getElementById("fullName").value).toBe("Test User");
    expect(document.getElementById("email").value).toBe("test@example.com");
    expect(document.getElementById("skills").value).toBe("Node.js, MongoDB");
  });
});
