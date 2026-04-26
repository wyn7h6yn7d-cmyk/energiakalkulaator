import { SolarCalculatorPage } from "@/components/solar-calculator-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function PaikesejaamPage() {
  return (
    <CalculatorRouteShell
      title="Päikesejaama tasuvuse kalkulaator"
      description="Hinda päikesejaama tasuvust, rahavoogu ja omatarbimise mõju Eesti tingimustes."
    >
      <SolarCalculatorPage />
    </CalculatorRouteShell>
  );
}

