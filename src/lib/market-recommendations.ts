import { MarketPricePoint } from "@/lib/elering";

export type WindowPick = {
  startTs: number;
  endTs: number;
  avgEurPerKwh: number;
};

function avg(points: MarketPricePoint[]) {
  if (points.length === 0) return Infinity;
  const s = points.reduce((sum, p) => sum + p.price_eur_per_kwh, 0);
  return s / points.length;
}

export function summarizeDay(points: MarketPricePoint[]) {
  const values = points.map((p) => p.price_eur_per_kwh).filter((v) => Number.isFinite(v));
  if (values.length === 0) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  return { min, max, mean };
}

export function pickBestWindows({
  points,
  intervalMinutes,
  windowHours,
  topN = 1,
}: {
  points: MarketPricePoint[];
  intervalMinutes: 15 | 60;
  windowHours: 1 | 2 | 3 | 4;
  topN?: number;
}): { cheapest: WindowPick[]; priciest: WindowPick[] } {
  const slotCount = Math.max(1, Math.round((windowHours * 60) / intervalMinutes));
  const stepSec = intervalMinutes * 60;
  const windowSec = windowHours * 60 * 60;
  const sorted = points.slice().sort((a, b) => a.ts - b.ts);
  const windows: WindowPick[] = [];

  for (let i = 0; i + slotCount <= sorted.length; i += 1) {
    const slice = sorted.slice(i, i + slotCount);
    let contiguous = true;
    for (let j = 1; j < slice.length; j += 1) {
      if (slice[j].ts - slice[j - 1].ts !== stepSec) {
        contiguous = false;
        break;
      }
    }
    if (!contiguous) continue;
    const a = avg(slice);
    if (!Number.isFinite(a)) continue;
    windows.push({
      startTs: slice[0].ts,
      // Hoia akna kestus täpselt windowHours, sõltumata andmeallika aukudest.
      endTs: slice[0].ts + windowSec,
      avgEurPerKwh: a,
    });
  }

  const cheapest = windows
    .slice()
    .sort((x, y) => x.avgEurPerKwh - y.avgEurPerKwh)
    .slice(0, topN);

  const priciest = windows
    .slice()
    .sort((x, y) => y.avgEurPerKwh - x.avgEurPerKwh)
    .slice(0, topN);

  return { cheapest, priciest };
}

export function pickTopSlots(points: MarketPricePoint[], topN = 3) {
  const sorted = points.slice().sort((a, b) => a.ts - b.ts);
  const cheapest = sorted
    .slice()
    .sort((a, b) => a.price_eur_per_kwh - b.price_eur_per_kwh)
    .slice(0, topN);
  const priciest = sorted
    .slice()
    .sort((a, b) => b.price_eur_per_kwh - a.price_eur_per_kwh)
    .slice(0, topN);
  return { cheapest, priciest };
}

