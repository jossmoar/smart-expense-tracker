"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const FEATURES = [
  {
    title: "Clasificación automática",
    description: "Cada gasto se categoriza solo, a partir de la descripción — sin listas interminables de categorías manuales.",
  },
  {
    title: "Alertas de presupuesto",
    description: "Te avisa apenas una categoría está por superar el límite que definiste, no al final del mes.",
  },
  {
    title: "Predicción de gasto",
    description: "Estima cuánto vas a gastar el próximo mes según tu historial reciente.",
  },
  {
    title: "Reportes exportables",
    description: "Descarga tus movimientos en PDF o Excel cuando los necesites.",
  },
];

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <main className="flex-1 bg-background">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 pb-16 pt-20 text-center">
        <span className="rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-medium text-muted">
          Portafolio de Joselin Montero
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Tus gastos, entendidos — no solo anotados
        </h1>
        <p className="max-w-xl text-base text-muted">
          Un gestor de finanzas personales que clasifica tus gastos automáticamente,
          te avisa antes de pasarte del presupuesto y predice cuánto vas a gastar el próximo mes.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {loading ? null : user ? (
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Ir al dashboard
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Empezar gratis
            </Link>
          )}
          <a
            href="#features"
            className="rounded-xl border border-hairline px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-black/5"
          >
            Ver funcionalidades
          </a>
        </div>
      </div>

      <div id="features" className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
          Qué incluye
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm"
            >
              <p className="text-lg font-semibold text-foreground">{feature.title}</p>
              <p className="mt-1.5 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
