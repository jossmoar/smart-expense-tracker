"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

interface Feature {
  title: string;
  description: string;
}

export default function LandingPage() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();
  const features = t("landing.features", { returnObjects: true }) as Feature[];

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-16 pt-20 text-center">
        <span className="rounded-full bg-teal px-3 py-1 text-xs font-medium text-white">
          {t("landing.badge")}
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-teal md:text-5xl">
          {t("landing.heroTitle")}
        </h1>
        <p className="max-w-xl text-base text-muted">{t("landing.heroSubtitle")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {loading ? null : user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("landing.ctaDashboard")}
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {t("landing.ctaPrimary")}
            </Link>
          )}
          <a
            href="#features"
            className="rounded-xl border-[1.5px] border-teal px-5 py-3 text-sm font-semibold text-teal transition-colors hover:bg-black/5"
          >
            {t("landing.ctaSecondary")}
          </a>
        </div>
      </div>

      <div id="features" className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-semibold text-teal">
          {t("landing.featuresTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border-[1.5px] border-teal bg-surface p-5 shadow-sm"
            >
              <p className="text-lg font-semibold text-teal">{feature.title}</p>
              <p className="mt-1.5 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
