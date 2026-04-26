import { VppPageClient } from "@/components/vpp-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function VppPage() {
  return (
    <CalculatorRouteShell
      title="VPP tasuvusmudel"
      description="Arvuta aku osalemise potentsiaalne tulu, tasuvusaeg ja stsenaariumite mõju."
    >
      <VppPageClient />
    </CalculatorRouteShell>
  );
}

