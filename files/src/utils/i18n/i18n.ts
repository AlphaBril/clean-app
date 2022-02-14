import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

const preload = (lng: string) => ({
  authentication: require(`./locales/${lng}/authentication.ts`).default,
});

const resources = {
  en: preload("en"),
  fr: preload("fr"),
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    defaultNS: "common",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
