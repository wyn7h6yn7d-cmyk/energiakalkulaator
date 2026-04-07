"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/kalkulaatorid/paikesejaam", label: "Kalkulaatorid" },
  { href: "/pricing", label: "Pro paketid" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-400 shadow-[0_0_18px_rgba(16,185,129,0.22)]" />
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight text-zinc-50">
              Energiakalkulaator
            </div>
            <div className="text-xs text-zinc-400">Rohelise energia otsused</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-white/10 text-zinc-50"
                    : "text-zinc-300 hover:bg-white/5 hover:text-zinc-50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/pricing" className="btn-ghost hidden sm:inline-flex">
            Vaata Pro
          </Link>
          <Link href="/kalkulaatorid/paikesejaam" className="btn-glow inline-flex">
            Proovi kalkulaatorit
          </Link>
        </div>
      </div>
    </header>
  );
}

