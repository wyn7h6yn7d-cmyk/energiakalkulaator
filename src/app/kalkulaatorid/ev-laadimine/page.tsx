import { EvLaadiminePageClient } from "@/components/ev-laadimine-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function EvLaadiminePage() {
  return (
    <CalculatorRouteShell
      title="EV laadimise kalkulaator"
      description="Arvuta EV laadimise aeg, maksumus ja sobiv laadija võimsus peakaitsme järgi."
    >
      <EvLaadiminePageClient />
    </CalculatorRouteShell>
  );
}

