import { SolarCalculatorPage } from "@/components/solar-calculator-page";
import { Suspense } from "react";

export default function PaikesejaamPage() {
  return (
    <Suspense fallback={null}>
      <SolarCalculatorPage />
    </Suspense>
  );
}

