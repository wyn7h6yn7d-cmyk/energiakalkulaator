"use client";

import { useMemo, useState } from "react";
import { canDownloadPdf, canViewFullAnalysis } from "@/lib/unlock";
import { useProjectUnlock } from "@/lib/useProjectUnlock";
import { PaywallCard } from "@/components/paywall-card";
import { FEATURES } from "@/lib/features";
import { buildCumulative, irr, npv } from "@/lib/calculators/finance";
import { MiniCashflowChart } from "@/components/charts/mini-cashflow-chart";

function num(v: string): number {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

const fmtEur = (value: number) =>
  new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(value) + " €";

export function VppPageClient() {
  const { projectId, unlock, purchaseBusy, startCheckout, checkPaymentStatus, message, setMessage } =
    useProjectUnlock();
  const [capacityKwh, setCapacityKwh] = useState("");
  const [powerKw, setPowerKw] = useState("");
  const [investmentEur, setInvestmentEur] = useState("");
  const [annualRevenueEur, setAnnualRevenueEur] = useState(""); // baas-stsenaarium
  const [cyclesPerYear, setCyclesPerYear] = useState("250");
  const [lifetimeYears, setLifetimeYears] = useState("10");
  const [efficiencyPct, setEfficiencyPct] = useState("92");
  const [degradationPct, setDegradationPct] = useState("1,5");
  const [annualOandMEur, setAnnualOandMEur] = useState("250");
  const [discountRatePct, setDiscountRatePct] = useState("6");

  const model = useMemo(() => {
    const inv = Math.max(num(investmentEur), 0);
    const baseRev = Math.max(num(annualRevenueEur), 0);
    const eff = Math.min(Math.max(num(efficiencyPct), 50), 99) / 100;
    const years = Math.max(Math.round(num(lifetimeYears)), 1);
    const degr = Math.min(Math.max(num(degradationPct), 0), 10) / 100;
    const opex = Math.max(num(annualOandMEur), 0);
    const disc = Math.min(Math.max(num(discountRatePct), 0), 20) / 100;

    // Cycles affect how realistic the revenue is (simple sanity factor).
    const cycles = Math.min(Math.max(num(cyclesPerYear), 0), 1500);
    const cycleFactor = cycles >= 50 ? 1 : 0.7;

    const scenarios = [
      { key: "konservatiivne", label: "Konservatiivne", rev: baseRev * 0.75 },
      { key: "baas", label: "Baas", rev: baseRev },
      { key: "optimistlik", label: "Optimistlik", rev: baseRev * 1.25 },
    ] as const;

    const perScenario = scenarios.map((s) => {
      const cashflows: number[] = [];
      cashflows.push(-inv);
      let factor = 1;
      for (let y = 1; y <= years; y += 1) {
        const gross = s.rev * eff * cycleFactor * factor;
        const net = Math.max(gross - opex, 0);
        cashflows.push(net);
        factor *= 1 - degr;
      }
      const cum = buildCumulative(cashflows);
      const npvValue = npv(disc, cashflows);
      const irrValue = irr(cashflows);
      const payback =
        cum.findIndex((v) => v >= 0) === -1 ? null : (() => {
          // reuse cumulative for approximate payback year without importing helper again
          for (let t = 1; t < cum.length; t += 1) {
            if (cum[t] >= 0) {
              const prev = cum[t - 1];
              const curr = cum[t];
              if (prev >= 0) return t - 1;
              const frac = (curr - prev) !== 0 ? (-prev) / (curr - prev) : 1;
              return (t - 1) + Math.min(Math.max(frac, 0), 1);
            }
          }
          return null;
        })();
      return {
        ...s,
        cashflows,
        cum,
        netRevYear1: cashflows[1] ?? 0,
        totalProfit: cum[cum.length - 1] ?? -inv,
        npv: npvValue,
        irr: irrValue,
        paybackYears: payback,
      };
    });

    return { inv, eff, years, degr, opex, disc, cycles, perScenario };
  }, [annualOandMEur, annualRevenueEur, cyclesPerYear, degradationPct, discountRatePct, efficiencyPct, investmentEur, lifetimeYears]);

  const downloadPdf = async () => {
    if (!projectId) return;
    try {
      const res = await fetch("/api/pdf/generate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          projectId,
          fullAnalysisSessionId: unlock.fullAnalysisSessionId,
          pdfSessionId: unlock.pdfSessionId,
          payload: {
            calculatorType: "vpp",
            inputs: [
              {
                group: "Aku ja investeering",
                items: [
                  { label: "Aku maht", value: capacityKwh ? `${capacityKwh} kWh` : "—" },
                  { label: "Aku võimsus", value: powerKw ? `${powerKw} kW` : "—" },
                  { label: "Investeering", value: investmentEur ? `${investmentEur} €` : "—" },
                ],
              },
              {
                group: "Tulud ja eluiga",
                items: [
                  { label: "Aastane tulupotentsiaal", value: annualRevenueEur ? `${annualRevenueEur} €` : "—" },
                  { label: "Eluiga", value: `${lifetimeYears} a` },
                  { label: "Efektiivsus", value: `${efficiencyPct}%` },
                ],
              },
              {
                group: "Kulud ja eeldused",
                items: [
                  { label: "Hooldus (€/a)", value: annualOandMEur ? `${annualOandMEur} €` : "—" },
                  { label: "Degradatsioon", value: `${degradationPct}%/a` },
                  { label: "Tsüklid", value: `${cyclesPerYear}/a` },
                ],
              },
            ],
            assumptions: [{ label: "Märkus", value: "Mudel tugineb sisestatud tulueeldustele. Turupõhine tegelik tulu võib erineda." }],
            metrics: [
              { label: "Baas: netotulu (aasta 1)", value: fmtEur(model.perScenario[1]?.netRevYear1 ?? 0) },
              { label: "Baas: tasuvusaeg", value: model.perScenario[1]?.paybackYears ? `${model.perScenario[1].paybackYears.toFixed(1)} a` : "—" },
              { label: "Baas: NPV", value: fmtEur(model.perScenario[1]?.npv ?? 0) },
              { label: "Baas: IRR", value: model.perScenario[1]?.irr ? `${(model.perScenario[1].irr * 100).toFixed(1)}%` : "—" },
              { label: "Efektiivsus", value: `${efficiencyPct}%` },
              { label: "Eluiga", value: `${lifetimeYears} a` },
              { label: "Investeering", value: investmentEur ? `${investmentEur} €` : "—" },
            ],
            charts: {
              cashflowByYear: (model.perScenario[1]?.cashflows ?? []).slice(1).map((v, idx) => ({
                year: idx + 1,
                cashflow: v,
              })),
            },
          },
        }),
      });
      if (!res.ok) {
        setMessage("PDF genereerimine ebaõnnestus.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "energiakalkulaator-vpp-analuus.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setMessage("PDF allalaadimine ebaõnnestus.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {message ? (
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>{message}</p>
            <button type="button" className="btn-ghost" onClick={() => setMessage(null)}>
              Peida
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="btn-ghost" onClick={checkPaymentStatus}>
              Kontrolli makse staatust
            </button>
          </div>
        </div>
      ) : null}

      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-zinc-50">VPP tasuvusmudel</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Lihtne hinnang aku osalemisele paindlikkuse teenustes. Sisesta eeldused ja vaata, mis suurusjärgus
          võiks tulemus olla.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Aku maht (kWh)</span>
            <input
              className="input"
              value={capacityKwh}
              inputMode="decimal"
              onChange={(e) => setCapacityKwh(e.target.value)}
              placeholder="nt 100"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Aku võimsus (kW)</span>
            <input
              className="input"
              value={powerKw}
              inputMode="decimal"
              onChange={(e) => setPowerKw(e.target.value)}
              placeholder="nt 50"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Investeering (€)</span>
            <input
              className="input"
              value={investmentEur}
              inputMode="numeric"
              onChange={(e) => setInvestmentEur(e.target.value)}
              placeholder="nt 60000"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Aastane tulupotentsiaal (€)</span>
            <input
              className="input"
              value={annualRevenueEur}
              inputMode="numeric"
              onChange={(e) => setAnnualRevenueEur(e.target.value)}
              placeholder="nt 12000"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Tsüklid aastas</span>
            <input
              className="input"
              value={cyclesPerYear}
              inputMode="numeric"
              onChange={(e) => setCyclesPerYear(e.target.value)}
              placeholder="nt 250"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Aku eluiga (a)</span>
            <select className="input" value={lifetimeYears} onChange={(e) => setLifetimeYears(e.target.value)}>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="15">15</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Round-trip efficiency (%)</span>
            <input
              className="input"
              value={efficiencyPct}
              inputMode="decimal"
              onChange={(e) => setEfficiencyPct(e.target.value)}
              placeholder="nt 92"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Degradatsioon (%/a)</span>
            <input
              className="input"
              value={degradationPct}
              inputMode="decimal"
              onChange={(e) => setDegradationPct(e.target.value)}
              placeholder="nt 1,5"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Hooldus (€/a)</span>
            <input
              className="input"
              value={annualOandMEur}
              inputMode="numeric"
              onChange={(e) => setAnnualOandMEur(e.target.value)}
              placeholder="nt 250"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-100">Diskontomäär (%/a)</span>
            <input
              className="input"
              value={discountRatePct}
              inputMode="decimal"
              onChange={(e) => setDiscountRatePct(e.target.value)}
              placeholder="nt 6"
            />
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-zinc-200">
          <strong className="block text-zinc-50">Märkus</strong>
          <p className="mt-1 text-zinc-300">
            {FEATURES.paywallEnabled
              ? "Detailsem VPP simulatsioon (stsenaariumid, risk ja rahavoog) on arenduses."
              : "Beetaversioon: mudel on lihtsustatud ja tugineb sinu sisestatud tulueeldustele."}
          </p>
        </div>
      </section>

      <PaywallCard
        locked={!canViewFullAnalysis(unlock)}
        title={FEATURES.paywallEnabled ? "Täisanalüüs" : "Detailne analüüs"}
        description={
          FEATURES.paywallEnabled
            ? "avab VPP detailse simulatsiooni (stsenaariumid, risk, cashflow tabel, eksport) selle projekti jaoks."
            : "detailsem vaade VPP tasuvusele koos tundlikkuse ja soovitustega."
        }
        ctaLabel={purchaseBusy === "full_analysis" ? "Suunamine..." : "Ava Täisanalüüs 9,99 €"}
        secondaryLabel="Kontrolli makse staatust"
        onCta={() => startCheckout("full_analysis")}
        onSecondary={checkPaymentStatus}
        footer={
          <>
            Projekt: <span className="font-medium text-zinc-200">{projectId}</span>
          </>
        }
      >
        <h2 className="text-2xl font-semibold text-zinc-50">Tulemused</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="result-card">
            <p>Baas: netotulu (aasta 1)</p>
            <strong>{fmtEur(model.perScenario[1]?.netRevYear1 ?? 0)}</strong>
          </div>
          <div className="result-card">
            <p>Baas: tasuvusaeg</p>
            <strong>
              {model.perScenario[1]?.paybackYears ? `${model.perScenario[1].paybackYears.toFixed(1)} aastat` : "—"}
            </strong>
          </div>
          <div className="result-card">
            <p>Baas: NPV</p>
            <strong>{fmtEur(model.perScenario[1]?.npv ?? 0)}</strong>
          </div>
          <div className="result-card">
            <p>Baas: IRR</p>
            <strong>{model.perScenario[1]?.irr ? `${(model.perScenario[1].irr * 100).toFixed(1)}%` : "—"}</strong>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
          <p className="font-medium text-zinc-100">Märkused</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Mudel tugineb sisestatud tulueeldustele; tegelik tulu sõltub turuolukorrast ja lepingust.</li>
            <li>Efektiivsus, hooldus ja degradatsioon mõjutavad tulemusi oluliselt.</li>
            <li>Vaata kolme stsenaariumi ja vali konservatiivne eeldus, kui tulemus läheb otsuse aluseks.</li>
          </ul>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="card">
            <h3 className="section-title">Stsenaariumid</h3>
            <div className="grid gap-3 text-sm">
              {model.perScenario.map((s) => (
                <div key={s.key} className="compare-row">
                  <span className="compare-label">{s.label}</span>
                  <strong>
                    {s.paybackYears ? `${s.paybackYears.toFixed(1)} a` : "—"} · NPV {fmtEur(s.npv)}
                  </strong>
                </div>
              ))}
            </div>
          </article>
          <article className="card">
            <h3 className="section-title">Rahavoog (baas)</h3>
            <MiniCashflowChart cashflows={(model.perScenario[1]?.cashflows ?? []).slice(1)} />
          </article>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="card">
            <h3 className="section-title">Tundlikkus (tulu ±20%)</h3>
            {(() => {
              const low = model.perScenario[0]?.paybackYears ?? null;
              const base = model.perScenario[1]?.paybackYears ?? null;
              const high = model.perScenario[2]?.paybackYears ?? null;
              return (
                <div className="grid gap-3 text-sm">
                  <div className="compare-row">
                    <span className="compare-label">Madalam tulu (−20%)</span>
                    <strong>{low ? `${low.toFixed(1)} a` : "—"}</strong>
                  </div>
                  <div className="compare-row">
                    <span className="compare-label">Baas</span>
                    <strong>{base ? `${base.toFixed(1)} a` : "—"}</strong>
                  </div>
                  <div className="compare-row">
                    <span className="compare-label">Kõrgem tulu (+20%)</span>
                    <strong>{high ? `${high.toFixed(1)} a` : "—"}</strong>
                  </div>
                </div>
              );
            })()}
            <p className="mt-3 text-xs text-zinc-400">
              VPP puhul mõjutab tulemust enim tulueeldus (€/a) ja aku kasutuskoormus.
            </p>
          </article>

          <article className="card">
            <h3 className="section-title">Soovitused</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Testi vähemalt 3 stsenaariumi: madal / baas / kõrge tulu.</li>
              <li>Kui eesmärk on stabiilsus, kasuta konservatiivset tulueeldust ja jäta varu hoolduseks.</li>
              <li>Kui tasuvus on pikk, vaata üle investeering või realistlik tulu.</li>
            </ul>
          </article>
        </div>

        {FEATURES.paywallEnabled ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <p className="text-sm text-zinc-200">PDF raport on saadaval pärast ligipääsu avamist.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {!unlock.pdfUnlocked ? (
                <button
                  type="button"
                  className="btn-glow"
                  onClick={() => startCheckout("pdf_report")}
                  disabled={purchaseBusy === "pdf_report"}
                >
                  {purchaseBusy === "pdf_report" ? "Suunamine..." : "Lisa PDF raport"}
                </button>
              ) : (
                <button type="button" className="btn-glow" onClick={downloadPdf} disabled={!canDownloadPdf(unlock)}>
                  Laadi PDF alla
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-zinc-300">Laadi alla kokkuvõtte PDF.</p>
              <button type="button" className="btn-glow" onClick={downloadPdf}>
                Laadi PDF alla
              </button>
            </div>
          </div>
        )}
      </PaywallCard>
    </div>
  );
}

