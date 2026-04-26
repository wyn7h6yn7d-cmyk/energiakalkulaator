import { PeakShavingPageClient } from "@/components/peak-shaving-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function PeakShavingPage() {
  return (
    <CalculatorRouteShell
      title="Peak shaving kalkulaator"
      description="Hinda tipukoormuse lõikamise võimekust, piiravat tegurit ja võimalikku aastast säästu."
    >
      <PeakShavingPageClient />
    </CalculatorRouteShell>
  );
}

