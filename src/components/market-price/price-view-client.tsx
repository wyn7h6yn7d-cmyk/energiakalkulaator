"use client";

import { useMemo, useState } from "react";
import { addVat, eurPerKwhToSntPerKwh, MarketPricePoint } from "@/lib/elering";
import { pickBestWindows, pickTopSlots, summarizeDay } from "@/lib/market-recommendations";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function fmtTimeEt(ts: number) {
  const d = new Date(ts * 1000);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function fmtRangeEt(startTs: number, endTs: number) {
  return `${fmtTimeEt(startTs)}–${fmtTimeEt(endTs)}`;
}

function fmtSnt(eurPerKwh: number, vat: boolean) {
  const base = vat ? addVat(eurPerKwh) : eurPerKwh;
  const snt = eurPerKwhToSntPerKwh(base);
  const rounded = Math.round(snt * 10) / 10;
  return new Intl.NumberFormat("et-EE", { maximumFractionDigits: 1 }).format(rounded);
}

function computeNow(points: MarketPricePoint[], intervalMinutes: 15 | 60) {
  const sorted = points.slice().sort((a, b) => a.ts - b.ts);
  const nowTs = Math.floor(Date.now() / 1000);
  const intervalSec = intervalMinutes * 60;

  let current: MarketPricePoint | null = null;
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    if (sorted[i].ts <= nowTs) {
      current = sorted[i];
      break;
    }
  }
  const next = sorted.find((p) => p.ts > nowTs) ?? null;
  const chosen = current ?? next ?? sorted[0] ?? null;
  if (!chosen) return null;

  const chosenIsNext = !current && Boolean(next) ? true : current && next ? chosen.ts === next.ts : false;
  const label =
    intervalMinutes === 15
      ? chosenIsNext
        ? "Järgmine 15 min"
        : "Praegu"
      : chosenIsNext
        ? "Järgmine tund"
        : "Praegune tund";

  const endTs = chosen.ts + intervalSec;
  return { label, startTs: chosen.ts, endTs, eurPerKwh: chosen.price_eur_per_kwh };
}

function startOfDayLocal(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDayLocal(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

function splitByLocalDay(points: MarketPricePoint[], day: Date) {
  const s = startOfDayLocal(day).getTime() / 1000;
  const e = endOfDayLocal(day).getTime() / 1000;
  return points.filter((p) => p.ts >= s && p.ts <= e);
}

function cardTitle(label: string) {
  return <div className="text-xs text-zinc-400">{label}</div>;
}

function HeatRow({ points, vat }: { points: MarketPricePoint[]; vat: boolean }) {
  const values = points.map((p) => (vat ? addVat(p.price_eur_per_kwh) : p.price_eur_per_kwh));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1e-9);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Odavam</span>
        <span>Kallim</span>
      </div>
      <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(6px,1fr))] gap-1">
        {points.map((p) => {
          const v = vat ? addVat(p.price_eur_per_kwh) : p.price_eur_per_kwh;
          const t = (v - min) / span;
          const bg =
            t < 0.33
              ? "bg-emerald-400/45"
              : t < 0.66
                ? "bg-emerald-300/25"
                : "bg-amber-300/25";
          return (
            <div
              key={p.ts}
              className={`h-4 rounded-sm ${bg} ring-1 ring-white/10`}
              title={`${fmtTimeEt(p.ts)} · ${fmtSnt(p.price_eur_per_kwh, vat)} snt/kWh`}
            />
          );
        })}
      </div>
    </div>
  );
}

function AreaChart({ points, vat }: { points: MarketPricePoint[]; vat: boolean }) {
  const values = points.map((p) => (vat ? addVat(p.price_eur_per_kwh) : p.price_eur_per_kwh));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(max - min, 1e-9);
  const w = 520;
  const h = 160;
  const pad = 10;

  const d = values
    .map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / Math.max(values.length - 1, 1);
      const y = pad + (1 - (v - min) / span) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>Hinnagraafik</span>
        <span>
          min {fmtSnt(min, vat)} · max {fmtSnt(max, vat)} snt/kWh
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-[160px] w-full">
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0.30)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.02)" />
          </linearGradient>
        </defs>
        <path d={d} fill="none" stroke="rgba(110,231,183,0.92)" strokeWidth="2" />
        <path d={`${d} L${w - pad},${h - pad} L${pad},${h - pad} Z`} fill="url(#area)" />
      </svg>
    </div>
  );
}

function SlotTable({
  title,
  points,
  vat,
  intervalMinutes,
}: {
  title: string;
  points: MarketPricePoint[];
  vat: boolean;
  intervalMinutes: 15 | 60;
}) {
  const intervalSec = intervalMinutes * 60;
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-sm font-semibold text-zinc-50">{title}</div>
      <div className="mt-3 grid gap-2">
        {points.map((p) => (
          <div key={p.ts} className="compare-row">
            <span className="compare-label">{fmtRangeEt(p.ts, p.ts + intervalSec)}</span>
            <strong className="text-zinc-50">{fmtSnt(p.price_eur_per_kwh, vat)} snt/kWh</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function WindowCard({
  hours,
  pick,
  vat,
}: {
  hours: 1 | 2 | 3 | 4;
  pick: { startTs: number; endTs: number; avgEurPerKwh: number } | null;
  vat: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="text-xs text-zinc-400">Odavaim {hours}h aken</div>
      <div className="mt-2 text-sm font-semibold text-zinc-50">
        {pick ? fmtRangeEt(pick.startTs, pick.endTs) : "—"}
      </div>
      <div className="mt-1 text-sm text-zinc-300">
        {pick ? `${fmtSnt(pick.avgEurPerKwh, vat)} snt/kWh (keskmine)` : "Ei leitud andmeid."}
      </div>
    </div>
  );
}

function AdviceCards({
  cheapestWindow,
  priciestWindow,
  intervalMinutes,
}: {
  cheapestWindow: { startTs: number; endTs: number } | null;
  priciestWindow: { startTs: number; endTs: number } | null;
  intervalMinutes: 15 | 60;
}) {
  const intervalLabel = intervalMinutes === 15 ? "15 minuti" : "tunni";
  return (
    <div className="mt-6 grid gap-4 lg:grid-cols-3">
      <div className="card rounded-3xl p-6">
        <div className="text-sm font-semibold text-zinc-50">Millal tasub tarbida rohkem?</div>
        <p className="mt-2 text-sm text-zinc-300">
          Kui saad tarbimist nihutada, suuna suurem tarbimine eelkõige odavamatesse akendesse. Need on head ajad
          näiteks pesumasinale, boilerile või EV laadimisele.
        </p>
        <p className="mt-3 text-xs text-zinc-400">
          {cheapestWindow ? `Soovitus: ${fmtRangeEt(cheapestWindow.startTs, cheapestWindow.endTs)}.` : `Soovitus: vaata päeva odavaimaid ${intervalLabel} perioode.`}
        </p>
      </div>
      <div className="card rounded-3xl p-6">
        <div className="text-sm font-semibold text-zinc-50">Millal tasub tarbida vähem?</div>
        <p className="mt-2 text-sm text-zinc-300">
          Kõrgema hinnaga tipud tekivad tavaliselt hommikul ja õhtul. Kui võimalik, väldi sel ajal suure tarbimisega seadmeid.
        </p>
        <p className="mt-3 text-xs text-zinc-400">
          {priciestWindow ? `Väldi eelkõige: ${fmtRangeEt(priciestWindow.startTs, priciestWindow.endTs)}.` : `Väldi päeva kalleimaid ${intervalLabel} perioode.`}
        </p>
      </div>
      <div className="card rounded-3xl p-6">
        <div className="text-sm font-semibold text-zinc-50">Kiirnõuanded</div>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-zinc-300">
          <li>EV laadimine: vali 2–4h odavaim aken.</li>
          <li>Boiler: küta odavaimal tunnil, hoia temperatuuri hiljem.</li>
          <li>Soojuspump: väldi tippu, kui maja soojusmaht lubab.</li>
        </ul>
      </div>
    </div>
  );
}

export function PriceViewClient({
  points,
  intervalMinutes,
}: {
  points: MarketPricePoint[];
  intervalMinutes: 15 | 60;
}) {
  const [vat, setVat] = useState(true);

  const nowCard = useMemo(() => computeNow(points, intervalMinutes), [points, intervalMinutes]);

  const todayPoints = useMemo(() => splitByLocalDay(points, new Date()), [points]);
  const tomorrowPoints = useMemo(() => splitByLocalDay(points, new Date(Date.now() + 24 * 60 * 60 * 1000)), [points]);

  const stats = useMemo(() => summarizeDay(todayPoints), [todayPoints]);

  const windowPicks = useMemo(() => {
    const cheapest: Record<string, { startTs: number; endTs: number; avgEurPerKwh: number } | null> = {};
    const priciest: Record<string, { startTs: number; endTs: number; avgEurPerKwh: number } | null> = {};
    ([
      1, 2, 3, 4,
    ] as const).forEach((h) => {
      const r = pickBestWindows({ points: todayPoints, intervalMinutes, windowHours: h, topN: 1 });
      cheapest[String(h)] = r.cheapest[0] ?? null;
      priciest[String(h)] = r.priciest[0] ?? null;
    });
    return { cheapest, priciest };
  }, [todayPoints, intervalMinutes]);

  const topSlots = useMemo(() => pickTopSlots(todayPoints, 3), [todayPoints]);

  const intervalSec = intervalMinutes * 60;

  return (
    <section className="mt-8 grid gap-6">
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-50">Hetkehinnang</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Näitame Eesti börsihinda Eleringi andmetel. Saad valida, kas kuvada hind käibemaksuga (24%) või ilma.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1">
            <button
              type="button"
              className={`rounded-xl px-3 py-2 text-sm ${!vat ? "bg-white/10 text-zinc-50" : "text-zinc-300 hover:bg-white/5 hover:text-zinc-50"}`}
              onClick={() => setVat(false)}
            >
              Ilma KM-ta
            </button>
            <button
              type="button"
              className={`rounded-xl px-3 py-2 text-sm ${vat ? "bg-emerald-400/15 text-zinc-50 ring-1 ring-emerald-300/20" : "text-zinc-300 hover:bg-white/5 hover:text-zinc-50"}`}
              onClick={() => setVat(true)}
            >
              KM-ga (24%)
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-5 card rounded-3xl p-6">
            {cardTitle(nowCard?.label ?? "Praegu")}
            <div className="mt-2 text-4xl font-semibold tracking-tight text-zinc-50">
              {nowCard ? `${fmtSnt(nowCard.eurPerKwh, vat)} ` : "— "}
              <span className="text-base font-semibold text-zinc-300">snt/kWh</span>
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {nowCard ? `${fmtRangeEt(nowCard.startTs, nowCard.endTs)} · ajavahemik` : "Hinna ajavahemikku ei leitud."}
            </div>
            {stats ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-zinc-400">Päeva miinimum</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-50">{fmtSnt(stats.min, vat)} snt</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-zinc-400">Päeva keskmine</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-50">{fmtSnt(stats.mean, vat)} snt</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-zinc-400">Päeva maksimum</div>
                  <div className="mt-1 text-lg font-semibold text-zinc-50">{fmtSnt(stats.max, vat)} snt</div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-7 card rounded-3xl p-6">
            <div className="text-sm font-semibold text-zinc-50">Päeva ülevaade</div>
            <p className="mt-2 text-sm text-zinc-400">
              Kuumuserida näitab hinnataset ajas. Hoia hiirt või puuduta, et näha täpset hinda.
            </p>
            <HeatRow points={todayPoints} vat={vat} />
            <AreaChart points={todayPoints} vat={vat} />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7 grid gap-3 sm:grid-cols-2">
            <WindowCard hours={1} pick={windowPicks.cheapest["1"]} vat={vat} />
            <WindowCard hours={2} pick={windowPicks.cheapest["2"]} vat={vat} />
            <WindowCard hours={3} pick={windowPicks.cheapest["3"]} vat={vat} />
            <WindowCard hours={4} pick={windowPicks.cheapest["4"]} vat={vat} />
          </div>

          <div className="lg:col-span-5 grid gap-4">
            <SlotTable title="Odavaimad 3 perioodi" points={topSlots.cheapest} vat={vat} intervalMinutes={intervalMinutes} />
            <SlotTable title="Kalleimad 3 perioodi" points={topSlots.priciest} vat={vat} intervalMinutes={intervalMinutes} />
          </div>
        </div>

        <AdviceCards
          cheapestWindow={windowPicks.cheapest["2"] ? { startTs: windowPicks.cheapest["2"]!.startTs, endTs: windowPicks.cheapest["2"]!.endTs } : null}
          priciestWindow={windowPicks.priciest["2"] ? { startTs: windowPicks.priciest["2"]!.startTs, endTs: windowPicks.priciest["2"]!.endTs } : null}
          intervalMinutes={intervalMinutes}
        />
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-zinc-50">Hinnad homme</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Kui homsed hinnad on avaldatud, kuvatakse need siin. Kui tabel on tühi, ei ole Elering veel andmeid väljastanud.
        </p>

        {tomorrowPoints.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
            Homseid hindu ei ole praegu saadaval.
          </div>
        ) : (
          <>
            <HeatRow points={tomorrowPoints} vat={vat} />
            <AreaChart points={tomorrowPoints} vat={vat} />
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] text-zinc-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Aeg</th>
                    <th className="px-4 py-3 text-right font-medium">Hind (snt/kWh)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tomorrowPoints
                    .slice()
                    .sort((a, b) => a.ts - b.ts)
                    .map((p) => (
                      <tr key={p.ts} className="bg-zinc-950/20">
                        <td className="px-4 py-3 text-zinc-200">{fmtRangeEt(p.ts, p.ts + intervalSec)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-zinc-50">
                          {fmtSnt(p.price_eur_per_kwh, vat)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

