// Costa Rican colones are practically always shown as whole numbers —
// céntimos have been obsolete in everyday use for years.
const formatter = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return formatter.format(amount);
}
