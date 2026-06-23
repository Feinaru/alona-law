const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
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
    el.placeholder =
      lang === 'he'
        ? el.dataset.placeholderHe
        : el.dataset.placeholderEn;
  });

  langButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  localStorage.setItem('landingLang', lang);
}

langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// ברירת מחדל אנגלית
setLanguage(localStorage.getItem('landingLang') || 'en');
