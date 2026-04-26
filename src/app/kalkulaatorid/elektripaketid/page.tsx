import { ElektripaketidPageClient } from "@/components/elektripaketid-page";
import { Suspense } from "react";

export default function ElektripaketidPage() {
  return (
    <Suspense fallback={null}>
      <ElektripaketidPageClient />
    </Suspense>
  );
}

