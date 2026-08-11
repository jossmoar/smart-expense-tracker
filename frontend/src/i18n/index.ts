import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es";
import { en } from "./locales/en";

const STORAGE_KEY = "smart-expense-tracker:lang";

const storedLang = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
const browserLang =
  typeof navigator !== "undefined" && navigator.language.startsWith("en") ? "en" : "es";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { es, en },
    lng: storedLang ?? browserLang,
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  });

  i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, lng);
  });
}

export default i18n;
