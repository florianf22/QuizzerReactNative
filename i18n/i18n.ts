import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
//
import en from './en';
import ka from './ka';

export default i18n.use(initReactI18next).init({
  resources: {
    en,
    ka,
  },
  lng: 'en',
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
