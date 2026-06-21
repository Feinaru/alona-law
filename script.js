const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });
revealElements.forEach(el => observer.observe(el));

const langButtons = document.querySelectorAll('.lang-btn');
const translatable = document.querySelectorAll('[data-he][data-en]');
const placeholders = document.querySelectorAll('[data-placeholder-he][data-placeholder-en]');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

  translatable.forEach(el => {
    el.textContent = el.dataset[lang];
  });

  placeholders.forEach(el => {
    el.placeholder = el.dataset[`placeholder${lang === 'he' ? 'He' : 'En'}`];
  });

  langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('landingLang', lang);
}

langButtons.forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.lang)));
setLanguage(localStorage.getItem('landingLang') || 'en');

function submitForm(event) {
  event.preventDefault();
  const lang = document.documentElement.lang;
  const message = document.getElementById('formMessage');
  message.textContent = lang === 'he'
    ? 'הפרטים נקלטו. נחזור אליכם בהקדם.'
    : 'Your details were received. We will get back to you shortly.';
  event.target.reset();
}
