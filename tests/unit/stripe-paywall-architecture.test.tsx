import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
});

async function loadPaywallGateWithFlag(enabled: boolean) {
  vi.doMock("@/lib/features", () => ({
    FEATURES: { paywallEnabled: enabled },
  }));
  const mod = await import("@/components/paywall/PaywallGate");
  return mod.PaywallGate;
}

async function loadCheckoutRouteWithFlag(enabled: boolean) {
  vi.doMock("@/lib/features", () => ({
    FEATURES: { paywallEnabled: enabled },
  }));
  const mod = await import("@/app/api/stripe/create-checkout-session/route");
  return mod.POST;
}

async function loadHinnadPageWithFlag(enabled: boolean) {
  vi.doMock("@/lib/features", () => ({
    FEATURES: { paywallEnabled: enabled },
  }));
  const mod = await import("@/app/hinnad/page");
  return mod.default;
}

describe("Stripe/paywall architecture", () => {
  it("1) paywallEnabled=false => PaywallGate renders children", async () => {
    const PaywallGate = await loadPaywallGateWithFlag(false);
    const html = renderToStaticMarkup(
      PaywallGate({
        children: "Tasuta sisu" as unknown as ReactNode,
        fallback: "Lukustatud" as unknown as ReactNode,
        featureName: "demo",
      }),
    );
    expect(html).toContain("Tasuta sisu");
    expect(html).not.toContain("Lukustatud");
  });

  it("2) paywallEnabled=false => checkout API returns controlled disabled response", async () => {
    const POST = await loadCheckoutRouteWithFlag(false);
    const response = await POST(
      new Request("http://localhost/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ purchaseType: "full_analysis" }),
      }),
    );
    expect(response.status).toBe(403);
    const data = await response.json();
    expect(data).toEqual({ error: "Paywall is disabled" });
  });

  it("3) missing Stripe env => checkout API does not crash", async () => {
    process.env.STRIPE_SECRET_KEY = "";
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "";
    process.env.NEXT_PUBLIC_APP_URL = "";

    const POST = await loadCheckoutRouteWithFlag(true);
    const response = await POST(
      new Request("http://localhost/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ purchaseType: "full_analysis" }),
      }),
    );
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Stripe environment variables are missing or invalid" });
  });

  it("4) /hinnad shows free beta text when flag=false", async () => {
    const HinnadPage = await loadHinnadPageWithFlag(false);
    const html = renderToStaticMarkup(HinnadPage());
    expect(html).toContain("Energiakalkulaator on hetkel tasuta beetaversioonis.");
    expect(html).toContain("Tasulised lisavõimalused võivad hiljem lisanduda.");
  });

  it("5) Stripe buttons are not rendered in free mode", async () => {
    const HinnadPage = await loadHinnadPageWithFlag(false);
    const html = renderToStaticMarkup(HinnadPage());
    expect(html).not.toContain("Ava lisavõimalused");
  });
});
