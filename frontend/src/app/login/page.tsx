"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

function firebaseErrorKey(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "login.errors.invalidEmail";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "login.errors.wrongCredentials";
    case "auth/email-already-in-use":
      return "login.errors.emailInUse";
    case "auth/weak-password":
      return "login.errors.weakPassword";
    default:
      return "login.errors.generic";
  }
}

export default function LoginPage() {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrorKey(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
      router.push("/dashboard");
    } catch (err) {
      const code = (err as { code?: string }).code ?? "";
      setErrorKey(firebaseErrorKey(code));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-hairline bg-surface p-8 shadow-sm">
        <Link href="/" className="text-sm font-medium text-muted hover:text-brand">
          {t("login.back")}
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {mode === "login" ? t("login.titleLogin") : t("login.titleRegister")}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {mode === "login" ? t("login.subtitleLogin") : t("login.subtitleRegister")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {mode === "register" && (
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
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              {t("login.email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
              placeholder={t("login.emailPlaceholder")}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              {t("login.password")}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
              placeholder={t("login.passwordPlaceholder")}
            />
          </div>

          {errorKey && (
            <p className="rounded-lg bg-expense/10 px-3 py-2 text-sm text-expense">
              {t(errorKey)}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting
              ? t("login.submitting")
              : mode === "login"
                ? t("login.submitLogin")
                : t("login.submitRegister")}
          </button>
        </form>

        <button
          onClick={() => {
            setErrorKey(null);
            setMode((m) => (m === "login" ? "register" : "login"));
          }}
          className="mt-4 w-full text-center text-sm text-muted hover:text-brand"
        >
          {mode === "login" ? t("login.toggleToRegister") : t("login.toggleToLogin")}
        </button>
      </div>
    </main>
  );
}
