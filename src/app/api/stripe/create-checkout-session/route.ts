import { NextResponse } from "next/server";
import Stripe from "stripe";
import { FEATURES } from "@/lib/features";

const PRODUCT_NAME = "Täpsem analüüs";
const UNIT_AMOUNT_CENTS = 999;
const CURRENCY = "eur";

function ensureBaseUrl(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.origin;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    if (!FEATURES.paywallEnabled) {
      return NextResponse.json({ error: "Paywall is disabled" }, { status: 403 });
    }

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    const appUrl = ensureBaseUrl(process.env.NEXT_PUBLIC_APP_URL);

    if (!secretKey || !publishableKey || !appUrl) {
      return NextResponse.json(
        { error: "Stripe environment variables are missing or invalid" },
        { status: 500 },
      );
    }

    let body: { projectId?: string; purchaseType?: string } = {};
    try {
      body = (await request.json()) as { projectId?: string; purchaseType?: string };
    } catch {
      body = {};
    }

    const stripe = new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: { name: PRODUCT_NAME },
            unit_amount: UNIT_AMOUNT_CENTS,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/makse-onnestus`,
      cancel_url: `${appUrl}/hinnad`,
      metadata: {
        projectId: body.projectId?.trim() ?? "",
        purchaseType: body.purchaseType?.trim() ?? "full_analysis",
      },
      allow_promotion_codes: false,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Checkout session URL is missing" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
