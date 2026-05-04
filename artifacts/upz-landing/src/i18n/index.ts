import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import uz from "./locales/uz.json";
import ru from "./locales/ru.json";
import ar from "./locales/ar.json";
import tr from "./locales/tr.json";

export const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "uz", label: "O'zbek", dir: "ltr" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, uz: { translation: uz }, ru: { translation: ru }, ar: { translation: ar }, tr: { translation: tr } },
    fallbackLng: "en",
    supportedLngs: ["en", "uz", "ru", "ar", "tr"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
  });

export function applyDir(lang: string) {
  const found = LANGUAGES.find((l) => l.code === lang);
  const dir = found?.dir ?? "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

export default i18n;
