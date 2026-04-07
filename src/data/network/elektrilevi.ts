export type NetworkTariff = {
  id: string;
  name: string;
  validFrom: string; // ISO date
  // Energy part (€/kWh). (Power part not modeled yet.)
  day_eur_per_kwh: number;
  night_eur_per_kwh: number;
};

// NOTE: Prices must be maintained manually from Elektrilevi price lists.
// Source: https://elektrilevi.ee/et/hinnakirjad
export const ELEKTRILEVI_TARIFFS: NetworkTariff[] = [
  {
    id: "simple",
    name: "Lihtne (päev/öö keskmine)",
    validFrom: "2026-01-01",
    day_eur_per_kwh: 0.0,
    night_eur_per_kwh: 0.0,
  },
];

