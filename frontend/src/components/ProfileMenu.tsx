"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

function ProfileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 19c1.2-3.5 4-5 7.5-5s6.3 1.5 7.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileMenu() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  async function handleLogout() {
    setOpen(false);
    await logout();
    router.push("/");
  }

  const displayName = user.displayName || user.email;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("nav.profileAriaLabel")}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-header-icon/40 text-header-icon transition-colors hover:border-header-icon hover:bg-white/10"
      >
        <ProfileIcon />
      </button>

      <div
        className={`absolute right-0 top-full z-40 mt-2 w-56 origin-top-right rounded-2xl border border-hairline bg-surface p-1.5 shadow-xl transition-all duration-150 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="px-3 py-2">
          <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
          <p className="truncate text-xs text-muted">{user.email}</p>
        </div>
        <div className="my-1 border-t border-hairline" />
        <Link
          href="/profile"
          onClick={() => setOpen(false)}
          className="block rounded-xl px-3 py-2 text-sm text-foreground transition-colors hover:bg-black/5"
        >
          {t("nav.myProfile")}
        </Link>
        <button
          onClick={handleLogout}
          className="block w-full rounded-xl px-3 py-2 text-left text-sm text-expense transition-colors hover:bg-expense/10"
        >
          {t("nav.logout")}
        </button>
      </div>
    </div>
  );
}
