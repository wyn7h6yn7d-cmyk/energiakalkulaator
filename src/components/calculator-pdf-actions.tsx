"use client";

import { PaywallGate } from "@/components/paywall/PaywallGate";
import type { CalculatorReturnSlug } from "@/lib/calculator-slugs";
import { type PurchaseType, type UnlockState } from "@/lib/unlock";

type Props = {
  projectId: string;
  unlock: UnlockState;
  purchaseBusy: PurchaseType | null;
  startCheckout: (purchaseType: PurchaseType, options?: { returnSlug?: CalculatorReturnSlug }) => Promise<void>;
  checkPaymentStatus: () => void;
  onDownload: () => void | Promise<void>;
  returnSlug: CalculatorReturnSlug;
  /** Vaikimisi mt-6; nt päikese lehel saab anda mt-0 ja mähkida välimise mt-4 sisse */
  className?: string;
};

export function CalculatorPdfActions({
  projectId,
  unlock,
  purchaseBusy,
  startCheckout,
  checkPaymentStatus,
  onDownload,
  returnSlug,
  className = "mt-6",
}: Props) {
  // Future-ready: access checks can be implemented in PaywallGate without changing calculator pages.
  // Beta mode remains free because PaywallGate allows children when paywall is disabled.
  void unlock;
  void purchaseBusy;
  void startCheckout;
  void checkPaymentStatus;
  void returnSlug;

  const freePdfContent = (
    <div className={`${className} rounded-2xl border border-white/10 bg-white/[0.02] p-4`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-300">Laadi alla kokkuvõtte PDF.</p>
        <button type="button" className="btn-glow" onClick={() => void onDownload()}>
          Laadi PDF alla
        </button>
      </div>
      {projectId ? (
        <p className="mt-2 text-xs text-zinc-300">
          Projekt: <span className="font-medium text-zinc-100">{projectId}</span>
        </p>
      ) : null}
    </div>
  );

  const paywallFallback = (
    <div className={`${className} rounded-2xl border border-amber-300/25 bg-amber-400/10 p-4`}>
      <p className="text-sm text-zinc-200">
        PDF allalaadimine on selle funktsiooni jaoks ajutiselt piiratud.
      </p>
    </div>
  );

  return (
    <PaywallGate featureName="pdf_reports_download" fallback={paywallFallback}>
      {freePdfContent}
    </PaywallGate>
  );
}
