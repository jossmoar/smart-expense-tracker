"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { NotificationsBell } from "@/components/NotificationsBell";
import { ProfileMenu } from "@/components/ProfileMenu";

const REPO_URL = "https://github.com/jossmoar/smart-expense-tracker";

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-4 w-5 flex-col justify-between">
      <span
        className={`h-0.5 w-full rounded-full bg-header-icon transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span className={`h-0.5 w-full rounded-full bg-header-icon transition-opacity ${open ? "opacity-0" : ""}`} />
      <span
        className={`h-0.5 w-full rounded-full bg-header-icon transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </span>
  );
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [justCopied, setJustCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function setLang(lang: "es" | "en") {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsMenuOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: t("app.title"), url });
        setIsMenuOpen(false);
      } catch {
        // user dismissed the native share sheet — leave the menu open
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setJustCopied(true);
      window.setTimeout(() => {
        setJustCopied(false);
        setIsMenuOpen(false);
      }, 1500);
    } catch {
      setIsMenuOpen(false);
    }
  }

  return (
    <nav className="sticky top-0 z-40 bg-header-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Ima Developer" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Ima Developer" className="h-12 w-auto" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 items-center rounded-full border border-header-icon/40 p-0.5 text-xs font-medium">
            <button
              onClick={() => setLang("es")}
              aria-pressed={i18n.language === "es"}
              className={`flex h-full items-center rounded-full px-2.5 transition-colors ${
                i18n.language === "es" ? "bg-header-icon text-header-bg" : "text-header-icon"
              }`}
            >
              ES
            </button>
            <button
              onClick={() => setLang("en")}
              aria-pressed={i18n.language === "en"}
              className={`flex h-full items-center rounded-full px-2.5 transition-colors ${
                i18n.language === "en" ? "bg-header-icon text-header-bg" : "text-header-icon"
              }`}
            >
              EN
            </button>
          </div>

          {user && <NotificationsBell />}

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={t("nav.menuAriaLabel")}
              aria-expanded={isMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-header-icon/40 transition-colors hover:bg-white/10"
            >
              <HamburgerIcon open={isMenuOpen} />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-52 origin-top-right rounded-2xl border border-hairline bg-surface p-1.5 shadow-xl transition-all duration-150 ${
                isMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-black/5"
              >
                {t("nav.home")}
              </Link>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-black/5"
              >
                {t("nav.viewCode")}
              </a>
              <button
                onClick={handleShare}
                className="block w-full rounded-xl px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-black/5"
              >
                {justCopied ? t("nav.linkCopied") : t("nav.share")}
              </button>
            </div>
          </div>

          {user && <ProfileMenu />}
        </div>
      </div>
    </nav>
  );
}
