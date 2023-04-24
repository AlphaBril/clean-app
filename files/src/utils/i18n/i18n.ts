import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

const preload = (lng: string) => ({
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  authentication: require(`./locales/${lng}/authentication.ts`).default,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  display: require(`./locales/${lng}/display.ts`).default,
});

const resources = {
  en: preload("en"),
  fr: preload("fr"),
};

declare module "i18next" {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    defaultNS: "common",
    returnNull: false,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
