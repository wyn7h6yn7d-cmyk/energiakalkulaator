import Link from "next/link";

export default function Home() {
  return (
    <div className="relative page-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
        <div className="grid-glow" />
      </div>

      <main className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <section className="glass-panel relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,0.18),transparent_45%),radial-gradient(circle_at_70%_35%,rgba(14,165,164,0.16),transparent_42%)]" />
          <div className="relative">
            <p className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs tracking-wide text-emerald-200">
              Energiakalkulaator
            </p>
            <h1 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
              Arvuta energiaotsuste tasuvus targemalt
            </h1>
            <p className="mt-4 max-w-2xl text-base text-zinc-300 sm:text-lg">
              Päikesejaama, VPP, elektripaketi, laadimise ja ettevõtte energiakulude kalkulaatorid
              ühes kohas.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/kalkulaatorid/paikesejaam" className="btn-glow inline-flex">
                Proovi kalkulaatorit
              </Link>
              <Link href="/pricing" className="btn-ghost inline-flex">
                Vaata hindu
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {[
            {
              t: "Selge ülevaade",
              d: "Näed omakasutust, võrku müüki, rahavoogu ja lihtsat tasuvust ühes vaates.",
            },
            {
              t: "Eesti tingimused",
              d: "Eeldused ja hinnaloogika on kohandatud Eesti turule ning Nord Poolile.",
            },
            {
              t: "Tasuline analüüs",
              d: "Täisanalüüs ja PDF raport aitavad otsuseid dokumenteerida ja jagada.",
            },
          ].map((item) => (
            <article key={item.t} className="card rounded-3xl p-6">
              <div className="mb-3 h-10 w-10 rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/20" />
              <h2 className="text-lg font-semibold text-zinc-50">{item.t}</h2>
              <p className="mt-2 text-sm text-zinc-400">{item.d}</p>
            </article>
          ))}
        </section>

        <section className="glass-panel rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-zinc-50">Kalkulaatorid</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Vali tööriist ja alusta kohe. Kõik kalkulaatorid kasutavad ühtset premium UI-d.
              </p>
            </div>
            <Link href="/kalkulaatorid/paikesejaam" className="btn-ghost inline-flex">
              Ava hub
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["Päikesejaama tasuvus", "/kalkulaatorid/paikesejaam"],
              ["VPP tasuvusmudel", "/kalkulaatorid/vpp"],
              ["Elektripaketi võrdlus", "/kalkulaatorid/elektripaketid"],
              ["EV laadimine", "/kalkulaatorid/ev-laadimine"],
              ["Peak shaving", "/kalkulaatorid/peak-shaving"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-zinc-200 transition-colors hover:bg-white/[0.05]"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-zinc-50">Miks tasuline analüüs?</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Kui teed otsuseid investeeringute või ettevõtte energiakulu kohta, on detailid olulised.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-zinc-300">
              <li className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                Detailne cashflow ja stsenaariumid
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                Võrdlused ja tundlikkuse analüüs
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                Ekspordid (PDF/Excel) ja projektide salvestus
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/pricing" className="btn-glow inline-flex">
                Vaata hindu
              </Link>
            </div>
          </article>

          <article className="glass-panel rounded-3xl p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-zinc-50">KKK</h2>
            <div className="mt-4 grid gap-3">
              {[
                [
                  "Kas tulemused on täpsed?",
                  "Tulemused on informatiivsed ja sõltuvad sisenditest ning eeldustest. Täisanalüüsis saad rohkem detaili ja selgema rahavoo vaate.",
                ],
                [
                  "Kas sobib ettevõttele?",
                  "Jah. Kalkulaatorid on mõeldud nii kodu kui ettevõtte otsuste toetamiseks. Peak shaving moodul on eriti ettevõtetele.",
                ],
                [
                  "Kas saan Nord Pooli hinda kasutada?",
                  "Jah. Päikesejaama kalkulaatoris saad valida Nord Pool keskmise ning lisada võrgutasu ja marginaali.",
                ],
              ].map(([q, a]) => (
                <details key={q} className="faq-details rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <summary className="faq-summary font-medium text-zinc-100">{q}</summary>
                  <p className="mt-2 pl-8 text-sm leading-relaxed text-zinc-300 md:text-base">{a}</p>
                </details>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
