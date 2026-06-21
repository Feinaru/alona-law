const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

revealElements.forEach(el => observer.observe(el));

const translatable = document.querySelectorAll('[data-he][data-en]');
const placeholders = document.querySelectorAll('[data-placeholder-he][data-placeholder-en]');

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

  translatable.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  placeholders.forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });
}

setLanguage('en');

