"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, loading, updateDisplayName } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user?.displayName) return;
    const [first, ...rest] = user.displayName.split(" ");
    setFirstName(first ?? "");
    setLastName(rest.join(" "));
  }, [user?.displayName]);

  if (loading || !user) return null;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await updateDisplayName(firstName, lastName);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="flex flex-1 justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">{t("profile.title")}</h1>
        <p className="mt-1 text-sm text-muted">{user.email}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {t("login.firstName")}
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">
                {t("login.lastName")}
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>
          </div>

          {saved && (
            <p className="rounded-lg bg-income/10 px-3 py-2 text-sm text-income">
              {t("profile.saved")}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? t("login.submitting") : t("profile.save")}
          </button>
        </form>
      </div>
    </main>
  );
}
