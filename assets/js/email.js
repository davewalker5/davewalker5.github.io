document.addEventListener("DOMContentLoaded", function () {
    const user = "contact";
    const domain = "fieldnotesjournal.uk";
    const subject = "Field Notes Journal – Correspondence";

    const email = user + "@" + domain;

    const container = document.getElementById("footer-email");
    if (!container) return;

    const link = document.createElement("a");

    link.href = "mailto:" + email + "?subject=" + encodeURIComponent(subject);

    link.textContent = "email";
    link.title = email;

    link.setAttribute("aria-label", "Email contact");

    container.appendChild(link);
});