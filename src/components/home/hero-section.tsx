"use client";

import Link from "next/link";
import { DashboardMockup } from "@/components/home/dashboard-mockup";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-emerald-300/25 bg-[#040b09] px-5 py-8 shadow-[0_28px_100px_rgba(0,0,0,0.65)] sm:px-8 sm:py-10 lg:px-10 lg:py-11">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(16,185,129,0.28),transparent_34%),radial-gradient(circle_at_88%_65%,rgba(20,184,166,0.2),transparent_30%),linear-gradient(180deg,#040b09,#061210_58%,#040b09)]" />
      <div className="absolute -right-20 -top-24 h-[420px] w-[620px] rounded-full border border-emerald-300/25 opacity-90 blur-[1px]" />
      <div className="absolute -right-14 top-1 h-[420px] w-[620px] rounded-full border-2 border-emerald-300/45 opacity-80 shadow-[0_0_80px_rgba(16,185,129,0.32)]" />
      <div className="absolute -right-10 top-20 h-[340px] w-[560px] rounded-full border border-teal-300/25 opacity-70" />
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.0)_34%)] opacity-35" />

      <div className="relative grid items-center gap-8 lg:grid-cols-[0.98fr_1.12fr] lg:gap-8">
        <div className="hero-content-shield">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-200">
            Energia juhtimiskeskus
          </div>
          <h1 className="mt-4 text-balance text-[2.3rem] font-semibold leading-[1.03] tracking-tight text-zinc-50 sm:text-[3.7rem]">
            Arvuta energiaotsuste <span className="text-emerald-300">tasuvus targemalt</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-300 sm:text-[1.02rem]">
            Päikesejaam, VPP, EV laadimine, elektri hinnavõrdlus ja ärikliendi elektritarbimise analüüs ühes
            platvormis.
          </p>

          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
            <Link href="/kalkulaatorid" className="btn-glow inline-flex w-full justify-center px-6 py-3 sm:w-auto">
              Proovi tasuta
            </Link>
            <Link
              href="/kalkulaatorid"
              className="btn-ghost inline-flex w-full justify-center border-emerald-300/30 bg-white/[0.03] px-6 py-3 sm:w-auto"
            >
              Vaata kalkulaatoreid
            </Link>
          </div>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {[
              ["Usaldusväärsed arvutused", "Täpsed metoodikad ja andmed"],
              ["Reaalajas andmed", "Nord Pool börsihind LIVE"],
              ["Sinu andmed on turvalised", "Privaatsus ja andmekaitse tagatud"],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-emerald-300/25 bg-zinc-950/55 px-3 py-2.5 shadow-[0_0_24px_rgba(16,185,129,0.12)]"
              >
                <div className="text-xs font-medium text-zinc-100">{title}</div>
                <div className="mt-1 text-[11px] leading-relaxed text-zinc-400">{description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 lg:pl-2">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

