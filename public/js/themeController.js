// /js/themeController.js
function toggleMode() {
  const body = document.body;
  const btn = document.getElementById("toggleBtn");

  body.classList.toggle("dark-mode");
  btn.innerHTML = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";

  // Save preference
  localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
}

// Apply saved preference when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    const btn = document.getElementById("toggleBtn");
    if (btn) btn.innerHTML = "☀️ Light Mode";
  }
});

