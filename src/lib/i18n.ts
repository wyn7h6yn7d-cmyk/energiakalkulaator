import type { InterpretationKind } from "@/types/calculator";

export type Locale = "et" | "en";

const LANG_STORAGE = "wattwise-lang";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "et";
  try {
    const v = window.localStorage.getItem(LANG_STORAGE);
    return v === "en" ? "en" : "et";
  } catch {
    return "et";
  }
}

export function persistLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_STORAGE, locale);
  } catch {
    /* ignore */
  }
}

export type Copy = {
  htmlTitle: string;
  heroIntro: string;
  startCalc: string;
  calcTitle: string;
  calcSubtitle: string;
  sectionSystem: string;
  labelPvKw: string;
  labelAnnualProd: string;
  hintAnnualProd: string;
  labelConsumption: string;
  labelDailyConsumption: string;
  labelBattery: string;
  labelBatteryKwh: string;
  hintBatteryKwh: string;
  yes: string;
  no: string;
  sectionPrice: string;
  labelPriceSource: string;
  priceManual: string;
  priceNordpool: string;
  labelSpot: string;
  labelNordAvg: string;
  btnRefresh: string;
  btnLoading: string;
  labelGridFee: string;
  labelSellBack: string;
  labelMargin: string;
  sectionInvest: string;
  labelPvCost: string;
  labelBatteryCost: string;
  labelExtraInstall: string;
  labelSupport: string;
  labelMaintenance: string;
  labelPeriodYears: string;
  investFootnote: string;
  submitUpdating: string;
  submitIdle: string;
  resultsTitle: string;
  effectivePrice: string;
  kpiAnnualSaving: string;
  kpiPayback: string;
  kpiSelfConsumption: string;
  kpiExport: string;
  kpiTotalPeriod: string;
  kpiBatteryValue: string;
  paybackNa: string;
  yearsSuffix: string;
  compareTitle: string;
  compareNoBattery: string;
  compareWithBattery: string;
  compareGridReduction: string;
  verdictTitle: string;
  verdictCo2Suffix: string;
  chartTitle: string;
  chartScrollHint: string;
  chartEmpty: string;
  yearAria: string;
  energyFlowsTitle: string;
  energySelf: string;
  energyExport: string;
  assumptionsTitle: string;
  assumption1: string;
  assumption2: string;
  assumption3: string;
  assumption4: string;
  contactTitle: string;
  contactBody: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  errProduction: string;
  errConsumption: string;
  errPrice: string;
  errBattery: string;
  interpret: Record<InterpretationKind, string>;
  nordLoading: string;
  nordFetchFailed: string;
};

export const copy: Record<Locale, Copy> = {
  et: {
    htmlTitle: "WattWise - päikesekalkulaator",
    heroIntro:
      "Sisesta oma süsteemi andmed, võrdle akuga ja akuta stsenaariume ning saa selge majanduslik ülevaade koos praktilise soovitusega.",
    startCalc: "Alusta arvutust",
    calcTitle: "Kalkulaator",
    calcSubtitle: "Lihtsustatud vaade: ainult kõige olulisemad sisendid.",
    sectionSystem: "1) Süsteem ja tarbimine",
    labelPvKw: "Päikesepargi võimsus (kW)",
    labelAnnualProd: "Aastane tootmine (kWh)",
    hintAnnualProd: "Kui täpset toodangut ei tea, kasuta hinnangut 850–1000 kWh per kW aastas.",
    labelConsumption: "Aastane elektritarbimine (kWh)",
    labelDailyConsumption: "Päevane tarbimine (kWh)",
    labelBattery: "Aku olemasolu",
    labelBatteryKwh: "Aku mahtuvus (kWh)",
    hintBatteryKwh: "Täida ainult siis, kui aku on olemas.",
    yes: "Jah",
    no: "Ei",
    sectionPrice: "2) Elektrihind",
    labelPriceSource: "Elektrihinna allikas",
    priceManual: "Käsitsi sisestus",
    priceNordpool: "Nord Pool keskmine",
    labelSpot: "Elektri börsihind (€/kWh)",
    labelNordAvg: "Nord Pool keskmine (€/kWh)",
    btnRefresh: "Uuenda",
    btnLoading: "Laen...",
    labelGridFee: "Võrgutasu ja muud tasud (€/kWh)",
    labelSellBack: "Müügi hind võrku (€/kWh)",
    labelMargin: "Margin / teenustasu (€/kWh)",
    sectionInvest: "3) Investeering",
    labelPvCost: "PV süsteemi maksumus (€)",
    labelBatteryCost: "Aku maksumus (€)",
    labelExtraInstall: "Muud paigalduskulud (€)",
    labelSupport: "Toetus (€)",
    labelMaintenance: "Hoolduskulu aastas (€)",
    labelPeriodYears: "Arvutusperiood (aastat)",
    investFootnote:
      "Täpsemad tehnilised eeldused (suund, varjutus, kasutegur, degradatsioon, hinnakasv) on hetkel seadistatud konservatiivsete vaikimisi väärtustega.",
    submitUpdating: "Arvutan...",
    submitIdle: "Uuenda tulemused",
    resultsTitle: "Tulemused",
    effectivePrice: "Efektiivne elektri hind arvutuses:",
    kpiAnnualSaving: "Hinnanguline aastane sääst",
    kpiPayback: "Lihtne tasuvusaeg",
    kpiSelfConsumption: "Omakasutus",
    kpiExport: "Võrku müük",
    kpiTotalPeriod: "Kogutulu perioodis",
    kpiBatteryValue: "Aku lisaväärtus",
    paybackNa: "Ei arvutatav",
    yearsSuffix: "aastat",
    compareTitle: "Ilma akuta vs akuga",
    compareNoBattery: "Ilma akuta aastane netokasu",
    compareWithBattery: "Akuga aastane netokasu",
    compareGridReduction: "Võrgu sõltuvuse vähenemine (akuga)",
    verdictTitle: "Kas see investeering tundub mõistlik?",
    verdictCo2Suffix: "Sinu valitud stsenaariumis on hinnanguline aastane CO2 vähenemine",
    chartTitle: "Rahavoo prognoos aastate lõikes",
    chartScrollHint: "Mobiilis: libista horisontaalselt, et näha kõiki aastaid.",
    chartEmpty: "Rahavoogu ei saanud arvutada. Kontrolli sisestatud andmeid.",
    yearAria: "Aasta",
    energyFlowsTitle: "Energiavood",
    energySelf: "Omakasutatud energia",
    energyExport: "Võrku müüdud energia",
    assumptionsTitle: "Arvutuse alused",
    assumption1: "Tootmist korrigeeritakse suuna, varjutuse, kasuteguri ja hooajalisuse teguriga.",
    assumption2:
      "Akuga stsenaariumis kasvab omakasutus vastavalt aku kasutatavale mahule ja eelduslikule profiilile.",
    assumption3: "Rahavoog arvestab elektrihinna kasvu, süsteemi degradatsiooni ja diskontomäära.",
    assumption4:
      "Nord Pool reaalhindade tõrke korral kasutatakse varuandmeid ning saad alati käsitsi hinda muuta.",
    contactTitle: "Küsimused?",
    contactBody: "Küsimuste korral pöördu:",
    faqTitle: "KKK",
    faq: [
      {
        q: "Kuidas tasuvusaega arvutatakse?",
        a: "Tasuvusaeg leitakse investeeringu ja aastase netokasu suhtena, arvestades hoolduskulu.",
      },
      {
        q: "Kas aku tasub ennast ära?",
        a: "Aku lisab väärtust peamiselt siis, kui õhtune tarbimine on suur ja võrku müügi hind on madalam kui ostuhind.",
      },
      {
        q: "Mis vahe on omatarbel ja võrku müügil?",
        a: "Omakasutus vähendab ostetavat elektrit, võrku müük annab lisatulu ülejääva toodangu arvelt.",
      },
      {
        q: "Kas börsihinnaga arvestamine on täpne?",
        a: "See on hinnanguline. Kalkulaator kasutab keskmisi hindu ja fallback-andmeid, mitte tunnipõhist simulatsiooni.",
      },
      {
        q: "Kas see kalkulaator sobib ettevõttele või eramule?",
        a: "Jah — kui aastane tarbimine ja toodang vastavad reaalsusele, sobib nii kodu kui ettevõtte kiire hinnang.",
      },
    ],
    errProduction: "Aastane tootmine peab olema suurem kui 0.",
    errConsumption: "Aastane tarbimine peab olema suurem kui 0.",
    errPrice: "Elektri hind ei tohi olla negatiivne.",
    errBattery: "Akuga stsenaariumis lisa aku mahtuvus.",
    interpret: {
      needs_input: "Tasuvus vajab täpsemaid sisendeid.",
      fast: "Kiire tasuvus — investeering on väga tugev.",
      moderate: "Mõõdukas tasuvus — stabiilne pikaajaline väärtus.",
      long: "Pikaajaline investeering — tasub hinnata täiendavaid optimeeringuid.",
    },
    nordLoading: "Laen Nord Pool hinda...",
    nordFetchFailed: "Börsihinna laadimine ebaõnnestus. Kasuta käsitsi sisestust.",
  },
  en: {
    htmlTitle: "WattWise - solar calculator",
    heroIntro:
      "Enter your system data, compare scenarios with and without a battery, and get a clear economic overview with practical guidance.",
    startCalc: "Start calculation",
    calcTitle: "Calculator",
    calcSubtitle: "Simplified view: only the most important inputs.",
    sectionSystem: "1) System and consumption",
    labelPvKw: "Solar array capacity (kW)",
    labelAnnualProd: "Annual production (kWh)",
    hintAnnualProd: "If you are unsure, use a rough range of 850–1000 kWh per kW per year.",
    labelConsumption: "Annual electricity use (kWh)",
    labelDailyConsumption: "Average daily use (kWh)",
    labelBattery: "Battery installed",
    labelBatteryKwh: "Battery capacity (kWh)",
    hintBatteryKwh: "Only fill in if a battery is installed.",
    yes: "Yes",
    no: "No",
    sectionPrice: "2) Electricity price",
    labelPriceSource: "Price source",
    priceManual: "Manual entry",
    priceNordpool: "Nord Pool average",
    labelSpot: "Spot electricity price (€/kWh)",
    labelNordAvg: "Nord Pool average (€/kWh)",
    btnRefresh: "Refresh",
    btnLoading: "Loading...",
    labelGridFee: "Grid fees and other charges (€/kWh)",
    labelSellBack: "Export / feed-in price (€/kWh)",
    labelMargin: "Margin / service fee (€/kWh)",
    sectionInvest: "3) Investment",
    labelPvCost: "PV system cost (€)",
    labelBatteryCost: "Battery cost (€)",
    labelExtraInstall: "Other installation costs (€)",
    labelSupport: "Grants / subsidies (€)",
    labelMaintenance: "Annual maintenance (€)",
    labelPeriodYears: "Analysis period (years)",
    investFootnote:
      "More detailed technical assumptions (orientation, shading, efficiency, degradation, price growth) use conservative defaults for now.",
    submitUpdating: "Calculating...",
    submitIdle: "Update results",
    resultsTitle: "Results",
    effectivePrice: "Effective electricity price in the model:",
    kpiAnnualSaving: "Estimated annual saving",
    kpiPayback: "Simple payback",
    kpiSelfConsumption: "Self-consumption",
    kpiExport: "Export to grid",
    kpiTotalPeriod: "Total benefit over period",
    kpiBatteryValue: "Battery added value",
    paybackNa: "Not calculable",
    yearsSuffix: "years",
    compareTitle: "Without battery vs with battery",
    compareNoBattery: "Annual net benefit without battery",
    compareWithBattery: "Annual net benefit with battery",
    compareGridReduction: "Grid dependence reduction (with battery)",
    verdictTitle: "Does this investment look reasonable?",
    verdictCo2Suffix: "In your selected scenario, estimated annual CO₂ reduction is",
    chartTitle: "Cash flow forecast by year",
    chartScrollHint: "On mobile: scroll horizontally to see all years.",
    chartEmpty: "Could not compute cash flow. Check your inputs.",
    yearAria: "Year",
    energyFlowsTitle: "Energy flows",
    energySelf: "Self-consumed energy",
    energyExport: "Energy exported to grid",
    assumptionsTitle: "Modelling assumptions",
    assumption1: "Production is adjusted using orientation, shading, efficiency and seasonality factors.",
    assumption2:
      "With a battery, self-consumption increases based on usable capacity and a simplified consumption profile.",
    assumption3: "Cash flow reflects price growth, system degradation and a discount rate.",
    assumption4:
      "If live Nord Pool data fails, fallback values are used; you can always enter a price manually.",
    contactTitle: "Questions?",
    contactBody: "For questions, contact:",
    faqTitle: "FAQ",
    faq: [
      {
        q: "How is payback calculated?",
        a: "Payback is investment divided by annual net benefit, including maintenance costs.",
      },
      {
        q: "Does a battery pay off?",
        a: "Batteries add most value when evening demand is high and export prices are lower than retail prices.",
      },
      {
        q: "What is the difference between self-consumption and export?",
        a: "Self-consumption reduces purchased electricity; export provides revenue for surplus generation.",
      },
      {
        q: "Is Nord Pool pricing accurate here?",
        a: "This is indicative only. The tool uses average prices and fallbacks, not full hourly simulation.",
      },
      {
        q: "Does this suit homes and businesses?",
        a: "Yes — as long as annual use and production are realistic, it works as a quick estimate for both.",
      },
    ],
    errProduction: "Annual production must be greater than 0.",
    errConsumption: "Annual consumption must be greater than 0.",
    errPrice: "Electricity price cannot be negative.",
    errBattery: "With a battery scenario, add battery capacity.",
    interpret: {
      needs_input: "Payback needs more accurate inputs.",
      fast: "Fast payback — the investment case looks strong.",
      moderate: "Moderate payback — solid long-term value.",
      long: "Long-term investment — worth exploring further optimisation.",
    },
    nordLoading: "Loading Nord Pool price...",
    nordFetchFailed: "Could not load spot price. Use manual entry.",
  },
};
