export type ElectricityPlanTemplate = {
  id: string;
  provider: string;
  name: string;
  fixedEurKwh: number;
  spotMarginEurKwh: number;
  monthlyFeeEur: number;
  gridFeeEurKwh: number;
  pricesIncludeVat: boolean;
};

export const ELECTRICITY_PLANS_UPDATED_AT = "2026-04-25";

// Demo templates for quick comparison. Prices are manually maintained, not auto-updated from seller APIs.
export const ELECTRICITY_PLAN_TEMPLATES: ElectricityPlanTemplate[] = [
  {
    id: "sample-fixed-balance",
    provider: "NÄIDIS",
    name: "Fikseeritud Tasakaal",
    fixedEurKwh: 0.159,
    spotMarginEurKwh: 0.012,
    monthlyFeeEur: 2.99,
    gridFeeEurKwh: 0.045,
    pricesIncludeVat: true,
  },
  {
    id: "sample-spot-flex",
    provider: "NÄIDIS",
    name: "Börs Flex",
    fixedEurKwh: 0.169,
    spotMarginEurKwh: 0.009,
    monthlyFeeEur: 1.99,
    gridFeeEurKwh: 0.043,
    pricesIncludeVat: true,
  },
  {
    id: "sample-business",
    provider: "NÄIDIS",
    name: "Äripakett",
    fixedEurKwh: 0.149,
    spotMarginEurKwh: 0.007,
    monthlyFeeEur: 4.5,
    gridFeeEurKwh: 0.041,
    pricesIncludeVat: false,
  },
];
