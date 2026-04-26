"use client";

export default function EnergiaprognoosError() {
  return (
    <div className="relative page-bg">
      <main className="relative mx-auto w-full max-w-7xl px-3 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <section className="glass-panel rounded-3xl p-6 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">Energiaprognoos</h1>
          <p className="mt-3 text-sm text-zinc-300">
            Prognoosi andmeid ei saanud hetkel laadida. Proovi hiljem uuesti.
          </p>
        </section>
      </main>
    </div>
  );
}

