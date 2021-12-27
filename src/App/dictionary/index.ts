import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';

i18n.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option,
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  },
  resources: {
    en: {
      translation: en
    }
  }
});

export default i18n;
