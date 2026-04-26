import { PeakShavingPageClient } from "@/components/peak-shaving-page";
import { Suspense } from "react";

export default function PeakShavingPage() {
  return (
    <Suspense fallback={null}>
      <PeakShavingPageClient />
    </Suspense>
  );
}

