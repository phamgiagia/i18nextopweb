import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';

i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
  })
  .then(() => {
    updateContent();
  });

function updateContent() {
  document.getElementById('welcome-message').innerText = i18next.t('common.greeting');
  document.getElementById('description').innerText = i18next.t('common.description');
  // document.getElementById('home-title').innerText = i18next.t('home.title');
  // document.getElementById('home-intro').innerText = i18next.t('home.intro');
  // document.getElementById('about-title').innerText = i18next.t('about.title');
  // document.getElementById('about-content').innerText = i18next.t('about.content');
}

// Change language event
document.getElementById('change-lang-en').addEventListener('click', () => {
  i18next.changeLanguage('en', updateContent);
});

document.getElementById('change-lang-fr').addEventListener('click', () => {
  i18next.changeLanguage('fr', updateContent);
});