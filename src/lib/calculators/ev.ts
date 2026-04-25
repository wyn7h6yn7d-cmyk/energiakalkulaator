export const CHARGER_STEPS_KW = [2.3, 3.7, 7.4, 11, 22] as const;

export function chargingCost(chargeableKwh: number, priceEurPerKwh: number) {
  return Math.max(chargeableKwh, 0) * Math.max(priceEurPerKwh, 0);
}

export function chargingTimeHours(chargeableKwh: number, chargerKw: number) {
  const power = Math.max(chargerKw, 0.000001);
  return Math.max(chargeableKwh, 0) / power;
}

export function mainFusePower1fKw(fuseA: number) {
  return (230 * Math.max(fuseA, 0)) / 1000;
}

export function mainFusePower3fKw(fuseA: number) {
  return (Math.sqrt(3) * 400 * Math.max(fuseA, 0)) / 1000;
}

export function usableChargingPowerKw(peakFuseKw: number, reserveKw: number) {
  return peakFuseKw * 0.8 - Math.max(reserveKw, 0);
}

export function pickChargerStepKw(maxKw: number) {
  const safe = Math.max(maxKw, 0);
  let chosen = 0;
  for (const step of CHARGER_STEPS_KW) {
    if (step <= safe + 1e-6) chosen = step;
  }
  return chosen;
}

export type EvChargingFormulaInput = {
  amps: number;
  phase: "1" | "3";
  householdReserveKw: number;
  energyToChargeKwh: number;
  chargerKw: number;
  priceEurKwh: number;
};

export type EvChargingFormulaResult = {
  singlePhaseKw: number;
  threePhaseKw: number;
  mainFuseKw: number;
  availableForEvKw: number;
  chargingTimeHours: number;
  chargingCost: number;
  recommendedChargerKw: number;
  fits11Kw: boolean;
  fits22Kw: boolean;
  loadManagementRecommended: boolean;
  warning22Kw: string | null;
};

export function calculateEvCharging(input: EvChargingFormulaInput): EvChargingFormulaResult {
  const amps = Math.max(input.amps, 0);
  const reserveKw = Math.max(input.householdReserveKw, 0);
  const energyKwh = Math.max(input.energyToChargeKwh, 0);
  const chargerKw = Math.max(input.chargerKw, 0);
  const priceEurKwh = Math.max(input.priceEurKwh, 0);

  // Valemid:
  // singlePhaseKw = 230 * amps / 1000
  // threePhaseKw = Math.sqrt(3) * 400 * amps / 1000
  // availableForEvKw = mainFuseKw * 0.8 - householdReserveKw
  // chargingTimeHours = energyToChargeKwh / chargerKw
  // chargingCost = energyToChargeKwh * priceEurKwh
  const singlePhaseKw = (230 * amps) / 1000;
  const threePhaseKw = (Math.sqrt(3) * 400 * amps) / 1000;
  const mainFuseKw = input.phase === "1" ? singlePhaseKw : threePhaseKw;
  const availableForEvKw = mainFuseKw * 0.8 - reserveKw;

  const safeChargerKw = Math.max(chargerKw, 0.000001);
  const chargingTimeHours = energyKwh / safeChargerKw;
  const chargingCostValue = energyKwh * priceEurKwh;

  const recommendedChargerKw = pickChargerStepKw(Math.max(availableForEvKw, 0));
  const fits11Kw = availableForEvKw >= 11 - 1e-6;
  const fits22Kw = availableForEvKw >= 22 - 1e-6;
  const loadManagementRecommended = chargerKw > Math.max(availableForEvKw, 0) || fits22Kw === false;
  const warning22Kw = fits22Kw
    ? null
    : "22 kW laadija eeldab tavaliselt suuremat peakaitset või koormusjuhtimist.";

  return {
    singlePhaseKw,
    threePhaseKw,
    mainFuseKw,
    availableForEvKw,
    chargingTimeHours,
    chargingCost: chargingCostValue,
    recommendedChargerKw,
    fits11Kw,
    fits22Kw,
    loadManagementRecommended,
    warning22Kw,
  };
}
