function handleMailTo(e) {
  e.preventDefault();
  const fname = document.getElementById("first_name").value;
  const lname = document.getElementById("last_name").value;
  const feedback = document.getElementById("feedback").value;
  const subject = encodeURIComponent("Portfolio BuildR Feedback");
  const body = encodeURIComponent(
    `Name: ${fname} ${lname}\n\nFeedback:\n${feedback}`
  );
  const mailtoLink = `mailto:pratik.khadka18@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoLink;

  // Clear the form after redirect
  document.getElementById("first_name").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("feedback").value = "";
}