// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "locales/en/translation.json";
import bgTranslation from "locales/bg/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    bg: { translation: bgTranslation },
  },
  lng: "en", // Set default language to English
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
