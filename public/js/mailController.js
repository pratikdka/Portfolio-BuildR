function toggleMode() {
      const html = document.documentElement;
      const modeLabel = document.getElementById("mode-label");

      if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
        document.body.classList.remove("bg-dark", "text-light");
        document.body.classList.add("bg-light", "text-dark");
        modeLabel.textContent = "Dark Mode";
      } else {
        html.setAttribute("data-theme", "dark");
        document.body.classList.remove("bg-light", "text-dark");
        document.body.classList.add("bg-dark", "text-light");
        modeLabel.textContent = "Light Mode";
      }
    }

    function openMailClient(event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const feedback = document.getElementById("feedback").value;

      const subject = encodeURIComponent(`Feedback from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nFeedback:\n${feedback}`);
      const mailto = `mailto:pratik.khadka18@gmail.com?cc=abhii.mailboxx@gmail.com&subject=${subject}&body=${body}`;

      window.location.href = mailto;
      return false;
    }