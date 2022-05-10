import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import hebrew from './he';
import english from './en';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    he: {
        translation: hebrew,
    },
    en: {
        translation: english,
    },
};

i18next.use(initReactI18next).use(LanguageDetector).init({
    resources,
    // lng: 'he',
    fallbackLng: 'en',
    detection: {
        order: ['htmlTag','cookie', 'localStorage', 'path', 'subdomain'],
        caches: ['cookie'],
    },
    interpolation: {
        escapeValue: false,
    }
});