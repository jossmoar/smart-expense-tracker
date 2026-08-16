"use client";

import { useEffect } from "react";
import i18n, { LANG_STORAGE_KEY } from "@/i18n";

export function LanguageSync() {
  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    const browserLang = navigator.language.startsWith("en") ? "en" : "es";
    const lang = stored ?? browserLang;
    if (lang !== i18n.language) i18n.changeLanguage(lang);
  }, []);

  return null;
}
