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
const observer = new IntersectionObserver(
  ([entry]) => { floatingCta.style.display = entry.isIntersecting ? 'none' : 'flex'; },
  { threshold: 0.2 }
);
observer.observe(contactSection);

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
  // GitHub Pages is static-only — connect Formspree or EmailJS to actually send this.
  status.textContent = 'Thanks! Your message looks good — connect a form service (see comments) to receive it by email.';
  status.className = 'form__status form__status--success';
  form.reset();
});
