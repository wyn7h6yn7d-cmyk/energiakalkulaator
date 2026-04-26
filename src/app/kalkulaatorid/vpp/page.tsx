import { VppPageClient } from "@/components/vpp-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function VppPage() {
  return (
    <CalculatorRouteShell
      title="VPP tasuvusmudel"
      description="Sisendid ja arvutus: hinda aku osalemise potentsiaalset tulu, tasuvusaega ja stsenaariumite mõju."
    >
      <VppPageClient />
    </CalculatorRouteShell>
  );
}

