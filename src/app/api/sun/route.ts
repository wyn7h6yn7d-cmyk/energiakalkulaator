import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const latitude = Number(url.searchParams.get("lat") ?? "59.437");
  const longitude = Number(url.searchParams.get("lon") ?? "24.7536");

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
  }

  try {
    const omUrl =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      "&daily=sunrise,sunset&forecast_days=1&timezone=auto";
    const res = await fetch(omUrl, { next: { revalidate: 900 } });
    if (!res.ok) throw new Error(`Sun API failed (${res.status})`);

    const json = (await res.json()) as {
      daily?: {
        sunrise?: string[];
        sunset?: string[];
      };
    };

    const sunriseIso = json.daily?.sunrise?.[0] ?? null;
    const sunsetIso = json.daily?.sunset?.[0] ?? null;
    if (!sunriseIso || !sunsetIso) {
      return NextResponse.json({ error: "Sunrise/sunset missing" }, { status: 502 });
    }

    return NextResponse.json({
      sunriseIso,
      sunsetIso,
      latitude,
      longitude,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
