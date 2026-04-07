"use client";

export function MiniCashflowChart({
  cashflows,
  height = 120,
}: {
  cashflows: number[];
  height?: number;
}) {
  const values = cashflows.filter((v) => Number.isFinite(v));
  if (values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1e-9);

  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Rahavoog (aastad)</span>
        <span>{values.length} a</span>
      </div>
      <div className="mt-3 flex items-end gap-1" style={{ height }}>
        {values.map((v, i) => {
          const t = (v - min) / span;
          const h = Math.max(2, Math.round(t * (height - 6)));
          const positive = v >= 0;
          const color = positive ? "from-emerald-400/80 to-teal-300/70" : "from-rose-400/70 to-amber-300/30";
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className={`flex-1 rounded-sm bg-gradient-to-t ${color}`}
              style={{ height: `${h}px` }}
              title={`Aasta ${i + 1}: ${Math.round(v)} €`}
            />
          );
        })}
      </div>
    </div>
  );
}

