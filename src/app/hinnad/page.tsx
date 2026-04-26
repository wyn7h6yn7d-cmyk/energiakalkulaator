import type { Metadata } from "next";
import { FEATURES } from "@/lib/features";
import { PricingPageClient } from "@/components/pricing-page-client";

export const metadata: Metadata = {
  title: "Hinnad | Energiakalkulaator",
};

function PricingFallback() {
  return (
    <section className="glass-panel rounded-3xl p-8 sm:p-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Hinnad</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">Energiakalkulaator on hetkel tasuta beetaversioonis.</p>
      <p className="mt-2 max-w-2xl text-zinc-300">Tasulised lisavõimalused võivad hiljem lisanduda.</p>
    </section>
  );
}

export default function HinnadPage() {
  return (
    <div className="relative page-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
        <div className="grid-glow" />
      </div>
      <main className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-12 sm:px-8 lg:px-10">
        {FEATURES.paywallEnabled ? <PricingPageClient /> : <PricingFallback />}
      </main>
    </div>
  );
}
