export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function safeDivide(n: number, d: number) {
  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return null;
  return n / d;
}

export function npv(rate: number, cashflows: number[]) {
  // cashflows[0] = year 0 (typically negative investment)
  let v = 0;
  for (let t = 0; t < cashflows.length; t += 1) {
    v += cashflows[t] / (1 + rate) ** t;
  }
  return v;
}

export function irr(cashflows: number[]) {
  // Simple bisection IRR on [-0.99, 2.0]. Returns null if no sign change.
  const f = (r: number) => npv(r, cashflows);
  let lo = -0.99;
  let hi = 2.0;
  const flo = f(lo);
  const fhi = f(hi);
  if (!Number.isFinite(flo) || !Number.isFinite(fhi)) return null;
  if (flo === 0) return lo;
  if (fhi === 0) return hi;
  if (flo * fhi > 0) return null;
  for (let i = 0; i < 80; i += 1) {
    const mid = (lo + hi) / 2;
    const fmid = f(mid);
    if (!Number.isFinite(fmid)) return null;
    if (Math.abs(fmid) < 1e-7) return mid;
    if (flo * fmid < 0) {
      hi = mid;
    } else {
      lo = mid;
    }
  }
  return (lo + hi) / 2;
}

export function paybackYears(cumulativeCashflow: number[]) {
  // cumulativeCashflow[t] is cumulative after year t (year 0 included)
  for (let t = 1; t < cumulativeCashflow.length; t += 1) {
    if (cumulativeCashflow[t] >= 0) {
      const prev = cumulativeCashflow[t - 1];
      const curr = cumulativeCashflow[t];
      if (prev >= 0) return t - 1;
      const frac = safeDivide(-prev, curr - prev);
      return frac === null ? t : (t - 1) + clamp(frac, 0, 1);
    }
  }
  return null;
}

export function buildCumulative(cashflows: number[]) {
  const out: number[] = [];
  let sum = 0;
  for (const cf of cashflows) {
    sum += cf;
    out.push(sum);
  }
  return out;
}

