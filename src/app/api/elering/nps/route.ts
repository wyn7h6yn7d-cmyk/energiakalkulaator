import { NextResponse } from "next/server";
import { fetchEleringNpsSeries } from "@/lib/elering";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const start = url.searchParams.get("start");
  const end = url.searchParams.get("end");
  const area = (url.searchParams.get("area") ?? "ee").toLowerCase();

  if (!start || !end) {
    return NextResponse.json(
      { error: "Missing required query params: start, end" },
      { status: 400 },
    );
  }

  if (!["ee", "lv", "lt", "fi"].includes(area)) {
    return NextResponse.json({ error: "Invalid area (use EE/LV/LT/FI)" }, { status: 400 });
  }

  try {
    const series = await fetchEleringNpsSeries({
      startIso: start,
      endIso: end,
      area: area as "ee" | "lv" | "lt" | "fi",
      revalidateSeconds: 60,
    });

    return NextResponse.json(series);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

