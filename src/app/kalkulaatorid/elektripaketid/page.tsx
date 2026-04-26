import { ElektripaketidPageClient } from "@/components/elektripaketid-page";
import { CalculatorRouteShell } from "@/components/calculator-route-shell";

export default function ElektripaketidPage() {
  return (
    <CalculatorRouteShell
      title="Elektripaketi võrdluse kalkulaator"
      description="Võrdle spot- ja fikseeritud paketi hinnangulist kulu sinu tarbimise põhjal."
    >
      <ElektripaketidPageClient />
    </CalculatorRouteShell>
  );
}

