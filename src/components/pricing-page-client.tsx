"use client";

import { useState } from "react";

export function PricingPageClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ purchaseType: "full_analysis" }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Checkout'i käivitamine ebaõnnestus.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout'i käivitamine ebaõnnestus.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl p-8 sm:p-12">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">Hinnad</h1>
      <p className="mt-4 max-w-2xl text-zinc-300">
        Täpsem analüüs avab detailsemad tulemused, PDF raportid ja lisagraafikud.
      </p>
      <p className="mt-2 max-w-2xl text-zinc-300">Ühekordne ligipääs või tulevane pakett.</p>

      <article className="mt-8 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 p-6">
        <p className="text-xs uppercase tracking-wide text-emerald-100/80">Plaan</p>
        <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Täpsem analüüs</h2>
        <p className="mt-1 text-3xl font-semibold text-emerald-100">9,99 €</p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-200">
          <li>detailsemad tulemused</li>
          <li>PDF raportid ja lisagraafikud</li>
          <li>tundlikkuse analüüs</li>
        </ul>
        <button type="button" className="btn-glow mt-6 w-full sm:w-auto" disabled={loading} onClick={() => void handleCheckout()}>
          {loading ? "Laen..." : "Ava lisavõimalused"}
        </button>
        {error ? (
          <p className="mt-3 rounded-xl border border-rose-300/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
            {error}
          </p>
        ) : null}
      </article>
    </section>
  );
}
