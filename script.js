/* ============================================================
   SCRIPT PRINCIPAL - PORTFOLIO THOMAS LE FLOHIC
   Gère : navigation, défilement fluide, année dynamique, animations
============================================================ */

// === MENU MOBILE ===
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navList.classList.toggle("show");
  });

  // Ferme le menu mobile après un clic sur un lien
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
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// === ANNÉE AUTOMATIQUE DU FOOTER ===
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// === ANIMATION D’APPARITION DES SECTIONS ===
const observerOptions = {
  threshold: 0.15 // déclenche l’apparition quand 15 % de la section est visible
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target); // évite de rejouer l’animation
    }
  });
}, observerOptions);

// Sélectionne toutes les sections pour les animer
document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});
