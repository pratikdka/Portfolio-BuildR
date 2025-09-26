document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("theme");
  const container = document.querySelector(".portfolio-container");
  const hiddenThemeInput = document.getElementById("selectedTheme");

  function applyTheme(theme) {
    // Remove all old themes
    container.classList.remove("theme-light", "theme-dark", "theme-blue", "theme-green", "theme-purple");
    // Add new one
    container.classList.add(theme);
    // Update hidden input
    hiddenThemeInput.value = theme;
  }

  // Apply when dropdown changes
  themeSelector.addEventListener("change", (e) => {
    applyTheme(e.target.value);
  });

  // Apply default from hidden input
  applyTheme(hiddenThemeInput.value);
});
