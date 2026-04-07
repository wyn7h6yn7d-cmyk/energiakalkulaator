"use client";

import { useMemo, useState } from "react";

function num(v: string): number {
  const n = Number(v.replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

const fmtEur = (value: number) =>
  new Intl.NumberFormat("et-EE", { maximumFractionDigits: 0 }).format(value) + " €";

export default function VppPage() {
  const [capacityKwh, setCapacityKwh] = useState("");
  const [powerKw, setPowerKw] = useState("");
  const [investmentEur, setInvestmentEur] = useState("");
  const [annualRevenueEur, setAnnualRevenueEur] = useState("");
  const [lifetimeYears, setLifetimeYears] = useState("10");
  const [efficiencyPct, setEfficiencyPct] = useState("92");

  const result = useMemo(() => {
    const inv = num(investmentEur);
    const rev = num(annualRevenueEur);
    const eff = Math.min(Math.max(num(efficiencyPct), 50), 99) / 100;
    const netRev = Math.max(rev * eff, 0);
    const payback = netRev > 0 ? inv / netRev : Infinity;
    const total = netRev * Math.max(num(lifetimeYears), 1) - inv;
    return { netRev, payback, total };
  }, [annualRevenueEur, efficiencyPct, investmentEur, lifetimeYears]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-zinc-50">VPP tasuvusmudel</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Hinnang aku osalemisele VPP / paindlikkuse teenustes. Sisesta lihtsad eeldused ja saa
          esimene tasuvusvaade.
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
        </div>

        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-zinc-200">
          <strong className="block text-zinc-50">Täisanalüüs</strong>
          <p className="mt-1 text-zinc-300">
            Detailne VPP simulatsioon (turuplokid, stsenaariumid, risk, cashflow tabel, eksport)
            avaneb tasulises täisanalüüsis.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-zinc-50">Tulemused</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="result-card">
            <p>Netotulu aastas (efektiivsusega)</p>
            <strong>{fmtEur(result.netRev)}</strong>
          </div>
          <div className="result-card">
            <p>Lihtne tasuvusaeg</p>
            <strong>
              {Number.isFinite(result.payback) ? `${result.payback.toFixed(1)} aastat` : "Pole võimalik arvutada"}
            </strong>
          </div>
          <div className="result-card sm:col-span-2">
            <p>Kogukasum eluaja jooksul</p>
            <strong>{fmtEur(result.total)}</strong>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
          <p className="font-medium text-zinc-100">Märkused</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>See on V1 lihtsustatud mudel, mis kasutab sisestatud tulueeldust.</li>
            <li>Efektiivsus vähendab eelduslikku tulu proportsionaalselt.</li>
            <li>Täisanalüüs lisab turuandmed, stsenaariumid ja detailse rahavoo.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

