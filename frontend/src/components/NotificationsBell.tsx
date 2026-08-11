"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNotifications } from "@/contexts/NotificationsContext";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
      <path
        d="M6 8a6 6 0 1 1 12 0c0 3.2 1 4.8 1.5 5.5.4.5 0 1.5-.7 1.5H5.2c-.7 0-1.1-1-.7-1.5C5 12.8 6 11.2 6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function NotificationsBell() {
  const { t } = useTranslation();
  const { notifications, markRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t("notifications.ariaLabel")}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-header-icon/40 text-header-icon transition-colors hover:border-header-icon hover:bg-white/10"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-expense px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-hairline bg-surface p-2 shadow-lg">
          {notifications.length === 0 ? (
            <p className="p-3 text-center text-sm text-muted">{t("notifications.empty")}</p>
          ) : (
            <ul className="flex max-h-80 flex-col gap-1 overflow-y-auto">
              {notifications.map((n) => (
                <li
                  key={n.id}
                  className={`rounded-xl px-3 py-2 text-sm ${n.read ? "text-muted" : "bg-expense/10 text-foreground"}`}
                >
                  <p>{n.message}</p>
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="mt-1 text-xs font-semibold text-brand hover:underline"
                    >
                      {t("notifications.markRead")}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
