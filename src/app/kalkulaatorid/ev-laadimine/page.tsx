import { EvLaadiminePageClient } from "@/components/ev-laadimine-page";
import { Suspense } from "react";

export default function EvLaadiminePage() {
  return (
    <Suspense fallback={null}>
      <EvLaadiminePageClient />
    </Suspense>
  );
}

