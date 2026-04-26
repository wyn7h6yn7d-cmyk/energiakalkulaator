"use client";

import CookieSettingsCta from "@/components/legal/cookie-settings-cta";

export default function KupsisedError() {
  return (
    <div className="relative page-bg">
      <main className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="glass-panel rounded-3xl p-7 text-sm leading-relaxed text-zinc-300 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Küpsised</h1>
          <p className="mt-3 text-zinc-200">
            Küpsiste lehte ei saanud hetkel täielikult laadida. Proovi palun mõne aja pärast uuesti.
          </p>
          <p className="mt-3">
            Küpsised on väikesed tekstifailid, mis aitavad veebilehel töötada, salvestada valikuid
            ning parandada kasutuskogemust.
          </p>
          <div className="mt-4">
            <CookieSettingsCta />
          </div>
        </section>
      </main>
    </div>
  );
}

