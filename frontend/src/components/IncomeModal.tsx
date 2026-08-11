"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "@/components/Modal";
import type { IncomeInput } from "@/lib/types";

interface IncomeModalProps {
  onClose: () => void;
  onSubmit: (data: IncomeInput) => Promise<void>;
}

const today = () => new Date().toISOString().slice(0, 10);

export function IncomeModal({ onClose, onSubmit }: IncomeModalProps) {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState(today());
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ amount: parseFloat(amount), source, date });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title={t("incomeModal.title")} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="number"
          step="0.01"
          min="0"
          required
          placeholder={t("incomeModal.amount")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <input
          type="text"
          required
          placeholder={t("incomeModal.source")}
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-xl bg-income px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? t("common.saving") : t("incomeModal.submit")}
        </button>
      </form>
    </Modal>
  );
}
