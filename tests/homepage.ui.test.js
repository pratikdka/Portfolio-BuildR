/**
 * @jest-environment jsdom
 */

describe("Homepage UI", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav>
        <a href="/"><span>Portfolio BuildR</span></a>
        <a id="feedback-btn" href="/feedback">Submit Your Feedback</a>
        <a id="form-btn" href="/form">Create Portfolio Now</a>
        <button id="toggleBtn" onclick="toggleMode()">🌓</button>
      </nav>
      <section class="hero-section">
        <h2>Build Your Professional Portfolio</h2>
        <p>Create a stunning portfolio to showcase your work and skills.</p>
        <a href="/form" id="get-started">GET STARTED</a>
      </section>
    `;

    global.toggleMode = jest.fn();
  });

  it("should render navbar with feedback and form buttons", () => {
    expect(document.querySelector("#feedback-btn").textContent).toBe("Submit Your Feedback");
    expect(document.querySelector("#feedback-btn").getAttribute("href")).toBe("/feedback");

    expect(document.querySelector("#form-btn").textContent).toBe("Create Portfolio Now");
    expect(document.querySelector("#form-btn").getAttribute("href")).toBe("/form");
  });

  it("should render hero GET STARTED button linking to /form", () => {
    const btn = document.querySelector("#get-started");
    expect(btn).not.toBeNull();
    expect(btn.textContent).toBe("GET STARTED");
    expect(btn.getAttribute("href")).toBe("/form");
  });

  it("should call toggleMode when dark mode button is clicked", () => {
    const toggleBtn = document.getElementById("toggleBtn");
    toggleBtn.click();
    expect(global.toggleMode).toHaveBeenCalled();
  });
});
