import { EvLaadiminePageClient } from "@/components/ev-laadimine-page";
import { Suspense } from "react";
import { CalculatorRenderBoundary } from "@/components/calculator-render-boundary";

export default function EvLaadiminePage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold text-zinc-50">Route kontroll: EV laadimise kalkulaator</h1>
      <Suspense
        fallback={
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="text-sm text-zinc-300">Laen kalkulaatorit...</div>
          </div>
        }
      >
        <CalculatorRenderBoundary calculatorName="EV laadimine">
          <EvLaadiminePageClient />
        </CalculatorRenderBoundary>
      </Suspense>
    </div>
  );
}

