import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: en
    }
  },
  lng: 'EN',
  debug: false,
  interpolation: {
    escapeValue: false
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
