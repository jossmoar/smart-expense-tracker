interface StatTileProps {
  label: string;
  value: string;
  accent?: string;
}

export function StatTile({ label, value, accent }: StatTileProps) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p
        className="mt-1 text-2xl font-bold"
        style={{ color: accent ?? "var(--color-foreground)" }}
      >
        {value}
      </p>
    </div>
  );
}
