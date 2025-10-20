// ------------------------------
// Dynamique : année du footer
// ------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ------------------------------
// Menu responsive (mobile)
// ------------------------------
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('show');
  });
}

// ------------------------------
// Copier l'email dans le presse-papiers
// ------------------------------
function copyEmail() {
  const email = 'thomas.exemple@mail.com'; // ← change ici avec ton adresse
  if (navigator.clipboard) {
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copié : ' + email);
    }).catch(() => {
      alert('Erreur de copie.');
    });
  } else {
    prompt('Copiez l’email manuellement :', email);
  }
}

// ------------------------------
// Envoi du formulaire (mailto simple)
// ------------------------------
function sendMail(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = encodeURIComponent(form.name.value || 'Contact');
  const message = encodeURIComponent(form.message.value || '');
  const subject = encodeURIComponent('Contact portfolio — ' + name);
  const mailto = `mailto:thomas.exemple@mail.com?subject=${subject}&body=${message}`;
  window.location.href = mailto;
}

// ------------------------------
// Fermeture du menu si clic sur un lien (mobile)
// ------------------------------
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
