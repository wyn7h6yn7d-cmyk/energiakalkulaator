import { CalculatorTabs } from "@/components/calculator-tabs";

export default function KalkulaatoridLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative page-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
        <div className="grid-glow" />
      </div>
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Kalkulaatorid</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Ühtne hub sinu energiaotsuste jaoks. Vali moodul ja arvuta.
          </p>
        </div>
        <CalculatorTabs />
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}

