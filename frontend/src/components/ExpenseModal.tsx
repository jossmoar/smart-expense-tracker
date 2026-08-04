"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/Modal";
import type { ExpenseInput } from "@/lib/types";

interface ExpenseModalProps {
  onClose: () => void;
  onSubmit: (data: ExpenseInput) => Promise<void>;
}

const today = () => new Date().toISOString().slice(0, 10);

export function ExpenseModal({ onClose, onSubmit }: ExpenseModalProps) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(today());
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({
        amount: parseFloat(amount),
        description,
        category: category || undefined,
        date,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Agregar gasto" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <input
          type="text"
          required
          placeholder="Descripción (ej. Almuerzo en soda)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <input
          type="text"
          placeholder="Categoría (opcional — se clasifica sola)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
          className="mt-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? "Guardando..." : "Agregar gasto"}
        </button>
      </form>
    </Modal>
  );
}
