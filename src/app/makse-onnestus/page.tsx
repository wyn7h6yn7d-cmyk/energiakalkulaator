import Link from "next/link";
import { FEATURES } from "@/lib/features";

export default function MakseOnnestusPage() {
  return (
    <main className="page-bg min-h-[calc(100dvh-4rem)] overflow-x-clip px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <section className="glass-panel rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold text-emerald-100 sm:text-4xl">Makse õnnestus</h1>
          <p className="mt-3 text-base text-zinc-200">
            Täname! Ligipääs lisavõimalustele aktiveeritakse.
          </p>
          {!FEATURES.paywallEnabled ? (
            <p className="mt-3 rounded-xl border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-sm text-amber-100">
              Tasulised lisavõimalused ei ole hetkel aktiivsed.
            </p>
          ) : null}

          <div className="mt-6">
            <Link href="/kalkulaatorid" className="btn-glow inline-flex w-full justify-center sm:w-auto">
              Tagasi kalkulaatoritesse
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
