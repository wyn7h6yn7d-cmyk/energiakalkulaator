import { NextResponse } from "next/server";

const fallbackPrices = [0.089, 0.094, 0.101, 0.097, 0.105, 0.11, 0.087];

function messages(lang: "et" | "en") {
  return {
    live:
      lang === "en"
        ? "Nord Pool Estonia: 7-day average spot price."
        : "Nord Pool Eesti 7 päeva keskmine hind.",
    fallback:
      lang === "en"
        ? "Live spot price could not be loaded. Using fallback values; you can enter a price manually."
        : "Reaalajas börsihinda ei õnnestunud laadida. Kasutame hetkel varuandmestikku, soovi korral sisesta hind käsitsi.",
  };
}

export async function GET(request: Request) {
  const langParam = new URL(request.url).searchParams.get("lang");
  const lang = langParam === "en" ? "en" : "et";
  const msg = messages(lang);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const now = new Date();
    const end = now.toISOString();
    const start = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7).toISOString();
    const url = `https://dashboard.elering.ee/api/nps/price?start=${start}&end=${end}`;

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: "application/json",
      },
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error("Nord Pool päring ebaõnnestus");
    }

    const data = (await response.json()) as {
      data?: {
        ee?: Array<{ price: number }>;
      };
    };

    const eePrices = data?.data?.ee ?? [];
    const values = eePrices
      .map((item) => item.price / 1000)
      .filter((price) => Number.isFinite(price) && price > 0);

    if (values.length === 0) {
      throw new Error("Nord Pool andmed puuduvad");
    }

    const average = values.reduce((sum, item) => sum + item, 0) / values.length;
    return NextResponse.json({
      source: "live",
      averagePrice: Number(average.toFixed(4)),
      message: msg.live,
    });
  } catch {
    const fallbackAverage =
      fallbackPrices.reduce((sum, item) => sum + item, 0) / fallbackPrices.length;

    return NextResponse.json({
      source: "fallback",
      averagePrice: Number(fallbackAverage.toFixed(4)),
      message: msg.fallback,
    });
  }
}
