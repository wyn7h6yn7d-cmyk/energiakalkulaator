"use client";

import type { ReactNode } from "react";
import { FEATURES } from "@/lib/features";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
  featureName: string;
};

function hasFeatureAccess(_featureName: string): boolean {
  // TODO(paywall): replace with real entitlement check (session/api/db).
  // Beta mode keeps access open to avoid locking features unintentionally.
  return true;
}

export function PaywallGate({ children, fallback, featureName }: Props) {
  if (!FEATURES.paywallEnabled) {
    return <>{children}</>;
  }

  if (!hasFeatureAccess(featureName)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
