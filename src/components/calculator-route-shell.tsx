import { Suspense } from "react";

function CalculatorRouteFallback({ toolName }: { toolName: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.03] p-5 text-sm text-zinc-300">
      <p className="font-medium text-zinc-100">{toolName} avaneb...</p>
      <p className="mt-1">
        Kalkulaatori interaktiivne osa laeb. Kui skriptid pole veel valmis, näed siin ajutiselt
        kokkuvõtte vaadet.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="h-20 rounded-xl border border-white/10 bg-white/[0.02]" />
        <div className="h-20 rounded-xl border border-white/10 bg-white/[0.02]" />
      </div>
    </div>
  );
}

export function CalculatorRouteShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
      </header>
      <Suspense fallback={<CalculatorRouteFallback toolName={title} />}>{children}</Suspense>
    </section>
  );
}

