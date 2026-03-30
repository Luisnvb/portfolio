// ============================
// NAVBAR — scroll + mobile
// ============================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

// Close mobile menu when a link is clicked
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ============================
// SCROLL REVEAL
// ============================
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ============================
// CONTACT FORM
// ============================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function validateField(id, errorId, validator, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!validator(field.value.trim())) {
    field.classList.add('error');
    error.textContent = message;
    return false;
  }
  field.classList.remove('error');
  error.textContent = '';
  return true;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.addEventListener('input', () => {
    field.classList.remove('error');
    error.textContent = '';
  }, { once: true });
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameOk = validateField('name', 'nameError', v => v.length >= 2, 'Por favor ingresa tu nombre.');
  const emailOk = validateField('email', 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Ingresa un email válido.');
  const msgOk = validateField('message', 'messageError', v => v.length >= 10, 'El mensaje debe tener al menos 10 caracteres.');

  ['name', 'email', 'message'].forEach((id, i) => {
    clearError(id, ['nameError', 'emailError', 'messageError'][i]);
  });

  if (nameOk && emailOk && msgOk) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    // Simulated submit (replace with real fetch/ajax)
    setTimeout(() => {
      contactForm.reset();
      formSuccess.classList.add('visible');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensaje';
      setTimeout(() => formSuccess.classList.remove('visible'), 5000);
    }, 800);
  }
});

// ============================
// SMOOTH SCROLL OFFSET (navbar)
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
