"use client";

import { useState } from "react";
import type { Notification } from "@/lib/types";

interface NotificationsBellProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export function NotificationsBell({ notifications, onMarkRead }: NotificationsBellProps) {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notificaciones"
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-hairline text-foreground hover:border-brand hover:text-brand"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-expense px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-hairline bg-surface p-2 shadow-lg">
          {notifications.length === 0 ? (
            <p className="p-3 text-center text-sm text-muted">Sin notificaciones.</p>
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
                      onClick={() => onMarkRead(n.id)}
                      className="mt-1 text-xs font-semibold text-brand hover:underline"
                    >
                      Marcar como leída
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
