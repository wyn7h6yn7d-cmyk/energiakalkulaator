import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeServer } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Webhook configuration is missing" }, { status: 500 });
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return NextResponse.json({ error: "Invalid webhook request" }, { status: 400 });
    }

    const stripe = getStripeServer();
    const body = await request.text();

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, secret);
    } catch {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      // TODO(server): persist checkout completion to DB/event store for entitlement history.
      // Keep logs minimal and non-sensitive (no raw payload or customer data dumps).
      console.info("[stripe webhook] checkout.session.completed", {
        id: session.id,
        payment_status: session.payment_status,
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}

