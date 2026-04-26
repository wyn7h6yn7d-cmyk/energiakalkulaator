import { VppPageClient } from "@/components/vpp-page";
import { Suspense } from "react";

export default function VppPage() {
  return (
    <Suspense fallback={null}>
      <VppPageClient />
    </Suspense>
  );
}

