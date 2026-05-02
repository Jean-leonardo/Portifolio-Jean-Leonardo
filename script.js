window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadingOverlay").classList.add("hidden");
  }, 800);
});

const themeSwitcher = document.getElementById("themeSwitcher");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;
let isDarkMode = true;

themeSwitcher.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
  } else {
    body.setAttribute("data-theme", "light");
    themeIcon.textContent = "☀️";
  }
});

document
  .getElementById("downloadResume")
  .addEventListener("click", function (e) {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = "CV Jean Leonardo 2026.pdf";
    link.download = "Currículo-Jean-Leonardo.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    showFormFeedback("Por favor, preencha todos os campos.", "error");
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showFormFeedback("Por favor, insira um e-mail válido.", "error");
    return;
  }

  const mailtoLink = `mailto:jeanleonardo794@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`)}`;
  window.open(mailtoLink, "_blank");
  showFormFeedback(
    "Mensagem preparada! Seu cliente de e-mail será aberto.",
    "success",
  );
  this.reset();
  setTimeout(() => {
    document.getElementById("formFeedback").innerHTML = "";
  }, 4000);
});

function showFormFeedback(msg, type) {
  const feedbackDiv = document.getElementById("formFeedback");
  feedbackDiv.innerHTML = `<span style="color: ${type === "error" ? "#ff4444" : "#00c851"};">${msg}</span>`;
}

const backToTop = document.getElementById("backToTop");
backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "flex" : "none";
});

let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop && scrollTop > 100)
    navbar.style.transform = "translateY(-100%)";
  else navbar.style.transform = "translateY(0)";
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document
  .querySelectorAll(".metric-card, .certificate-card, .timeline-content")
  .forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      this.style.transform = `translateY(-8px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

document
  .querySelectorAll(".cta-button, .theme-switcher, .form-button")
  .forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });
    btn.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

document
  .getElementById("contactPhone")
  .setAttribute("href", "https://wa.me/5519999643389");
