import { npv, irr, buildCumulative, paybackYears } from "@/lib/calculators/finance";

export type SolarAssumptions = {
  years: number;
  discountRate: number; // 0.06
  priceGrowthRate: number; // 0.03
  degradationRate: number; // 0.006
  inverterReplacementYear: number; // 12
  inverterReplacementCostEur: number;
  annualMaintenanceEur: number;
};

export type SolarScenarioInput = {
  annualProductionKwh: number;
  annualConsumptionKwh: number;
  selfConsumptionRate: number; // 0..1
  buyPriceEurPerKwh: number; // incl margin + network if desired
  sellPriceEurPerKwh: number;
  investmentEur: number;
};

export type SolarScenarioResult = {
  yearCashflows: number[]; // year1..yearN (undiscounted, real € of year)
  cashflows: number[]; // year0..yearN (year0 negative investment)
  cumulative: number[]; // year0..yearN cumulative
  npvEur: number;
  irr: number | null;
  paybackYears: number | null;
  year1: {
    selfUsedKwh: number;
    exportedKwh: number;
    savingsEur: number;
    exportRevenueEur: number;
    netBenefitEur: number;
  };
};

export function computeSolarScenario(input: SolarScenarioInput, a: SolarAssumptions): SolarScenarioResult {
  const years = Math.max(1, Math.round(a.years));
  const prod0 = Math.max(0, input.annualProductionKwh);
  const cons = Math.max(0, input.annualConsumptionKwh);
  const sc = Math.min(Math.max(input.selfConsumptionRate, 0), 1);

  const selfUsed0 = Math.min(prod0 * sc, cons);
  const exported0 = Math.max(prod0 - selfUsed0, 0);
  const savings0 = selfUsed0 * Math.max(input.buyPriceEurPerKwh, 0);
  const exportRev0 = exported0 * Math.max(input.sellPriceEurPerKwh, 0);
  const net0 = Math.max(savings0 + exportRev0 - Math.max(a.annualMaintenanceEur, 0), 0);

  const yearCashflows: number[] = [];
  const cashflows: number[] = [-Math.max(input.investmentEur, 0)];
  let prod = prod0;

  for (let y = 1; y <= years; y += 1) {
    const growth = (1 + Math.max(a.priceGrowthRate, 0)) ** (y - 1);
    const selfUsed = Math.min(prod * sc, cons);
    const exported = Math.max(prod - selfUsed, 0);
    const savings = selfUsed * input.buyPriceEurPerKwh * growth;
    const exportRev = exported * input.sellPriceEurPerKwh * growth;
    let net = Math.max(savings + exportRev - a.annualMaintenanceEur, 0);

    if (a.inverterReplacementCostEur > 0 && y === a.inverterReplacementYear) {
      net -= a.inverterReplacementCostEur;
    }

    yearCashflows.push(net);
    cashflows.push(net);
    prod *= 1 - Math.max(a.degradationRate, 0);
  }

  const cumulative = buildCumulative(cashflows);
  const npvEur = npv(Math.max(a.discountRate, 0), cashflows);
  const irrValue = irr(cashflows);
  const payback = paybackYears(cumulative);

  return {
    yearCashflows,
    cashflows,
    cumulative,
    npvEur,
    irr: irrValue,
    paybackYears: payback,
    year1: {
      selfUsedKwh: selfUsed0,
      exportedKwh: exported0,
      savingsEur: savings0,
      exportRevenueEur: exportRev0,
      netBenefitEur: net0,
    },
  };
}

