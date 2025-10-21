
// ============================================================
// SCRIPT PRINCIPAL - PORTFOLIO THOMAS LE FLOHIC
// Gère : menu mobile, scroll fluide, année dynamique, animations
// ============================================================

// === MENU MOBILE ===
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("show");
  });

  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      navList.classList.remove("show");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// === SCROLL DOUX ENTRE LES SECTIONS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const targetId = anchor.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// === ANNÉE AUTOMATIQUE DU FOOTER ===
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// === ANIMATION D’APPARITION DES SECTIONS ===
const observerOptions = { threshold: 0.15 };

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach(section => observer.observe(section));
// === FORMULAIRE DE CONTACT (EmailJS) ===
(function() {
  emailjs.init({ publicKey: "_pikDWEySDLUt-GEM" });
})();

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = {
      from_name: document.getElementById("name").value,
      message: document.getElementById("message").value,
    };

    emailjs.send("service_xijvu9j", "template_portfolio", formData)
      .then(() => {
        showFormMessage("✅ Message envoyé avec succès !", "success");
        contactForm.reset();
      })
      .catch(() => {
        showFormMessage("❌ Une erreur est survenue. Réessaie plus tard.", "error");
      });
  });
}

function showFormMessage(text, type) {
  if (!formMessage) return;
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.opacity = "1";

  setTimeout(() => {
    formMessage.style.opacity = "0";
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 400);
  }, 3500);
}
