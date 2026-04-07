import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="relative page-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
        <div className="grid-glow" />
      </div>

      <main className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <header className="glass-panel rounded-3xl p-7 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">Kontakt</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Küsimuste ja koostöö korral võta ühendust. Enne teenuse ametlikku lansseerimist palun täida
            allolevad ettevõtte andmed.
          </p>
        </header>

        <section className="mt-6 glass-panel rounded-3xl p-7 text-sm text-zinc-300 sm:p-10">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-zinc-400">E-post</div>
              <div className="mt-1 text-sm font-semibold text-zinc-50">[SIIN LISA E-POST]</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-zinc-400">Ettevõte</div>
              <div className="mt-1 text-sm font-semibold text-zinc-50">[SIIN LISA ETTEVÕTTE NIMI]</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-zinc-400">Registrikood</div>
              <div className="mt-1 text-sm font-semibold text-zinc-50">[SIIN LISA REGISTRIKOOD]</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-xs text-zinc-400">Aadress</div>
              <div className="mt-1 text-sm font-semibold text-zinc-50">[SIIN LISA AADRESS]</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
            <div className="text-sm font-semibold text-zinc-50">Kiire link</div>
            <p className="mt-1 text-sm text-zinc-300">
              Alusta kalkulaatoritest siit:{" "}
              <Link href="/kalkulaatorid/paikesejaam" className="text-emerald-200 underline underline-offset-4">
                ava kalkulaatorite hub
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

