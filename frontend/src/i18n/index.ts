import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es } from "./locales/es";
import { en } from "./locales/en";

export const LANG_STORAGE_KEY = "smart-expense-tracker:lang";

if (!i18n.isInitialized) {
  // Always boot with the same fixed language on server and client — reading
  // localStorage/navigator here would make the SSR pass and the first client
  // render disagree, which React reports as a hydration mismatch. The real
  // stored/browser language is applied client-side after mount instead (see
  // LanguageSync), which is a normal post-hydration update, not a mismatch.
  i18n.use(initReactI18next).init({
    resources: { es, en },
    lng: "es",
    fallbackLng: "es",
    interpolation: { escapeValue: false },
  });

  i18n.on("languageChanged", (lng) => {
    if (typeof window !== "undefined") localStorage.setItem(LANG_STORAGE_KEY, lng);
  });
}

export default i18n;
