import { VppPageClient } from "@/components/vpp-page";
import { Suspense } from "react";
import { CalculatorRenderBoundary } from "@/components/calculator-render-boundary";

export default function VppPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold text-zinc-50">Route kontroll: VPP kalkulaator</h1>
      <Suspense
        fallback={
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <div className="text-sm text-zinc-300">Laen kalkulaatorit...</div>
          </div>
        }
      >
        <CalculatorRenderBoundary calculatorName="VPP">
          <VppPageClient />
        </CalculatorRenderBoundary>
      </Suspense>
    </div>
  );
}

