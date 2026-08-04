"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  return (
    <header className="border-b border-hairline bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-foreground">
          Smart Expense Tracker
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-muted sm:inline">{user.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-hairline px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
