// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Hide floating CTA once the real contact form is on screen
const floatingCta = document.getElementById('floatingCta');
const contactSection = document.getElementById('contact');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    ([entry]) => { floatingCta.style.display = entry.isIntersecting ? 'none' : 'flex'; },
    { threshold: 0.2 }
  );
  observer.observe(contactSection);
}

// Pause the 3D orbit on hover so labels are easy to read
const orbit = document.getElementById('orbit');
if (orbit) {
  const orbitScene = orbit.closest('.orbit-scene');
  orbitScene.addEventListener('mouseenter', () => { orbit.style.animationPlayState = 'paused'; });
  orbitScene.addEventListener('mouseleave', () => { orbit.style.animationPlayState = 'running'; });
}

// Contact form validation
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + 'Error');
  field.closest('.field').classList.toggle('field--invalid', !!message);
  error.textContent = message || '';
}

function validate() {
  let valid = true;

  const name = document.getElementById('name').value.trim();
  if (!name) { setError('name', 'Please enter your name.'); valid = false; }
  else setError('name', '');

  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) { setError('email', 'Please enter your email.'); valid = false; }
  else if (!emailPattern.test(email)) { setError('email', 'Please enter a valid email address.'); valid = false; }
  else setError('email', '');

  const message = document.getElementById('message').value.trim();
  if (!message) { setError('message', 'Please add a few details about your project.'); valid = false; }
  else setError('message', '');

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validate()) {
    status.textContent = 'Please fix the errors above.';
    status.className = 'form__status form__status--error';
    return;
  }

  // NOTE: GitHub Pages hosts static sites only — there's no backend here.
  // Connect a service like Formspree (https://formspree.io) or EmailJS
  // (https://www.emailjs.com) to actually deliver these submissions by email.

  status.textContent = 'Thanks! Your message looks good — connect a form service (see script.js comments) to receive it by email.';
  status.className = 'form__status form__status--success';
  form.reset();
});
