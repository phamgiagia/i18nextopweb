import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
// Import translation files
import en from './locales/en.json';
import fr from './locales/fr.json';
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/phamgiagia/i18nextopweb/refs/heads/main/locales/';
i18next
  .use(LanguageDetector)
  .use(HttpBackend)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: `${GITHUB_RAW_URL}{{lng}}.json`,
    },
  })
  .then(() => {
    // Wait for translations to be loaded
    return i18next.loadNamespaces('common');
  })
  .then(() => {
    updateContent();
  })
  .catch((error) => {
    console.error('Failed to initialize i18next:', error);
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