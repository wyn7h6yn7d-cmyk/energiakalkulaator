export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative page-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora" />
        <div className="grid-glow" />
      </div>

      <main className="relative mx-auto w-full max-w-3xl px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <header className="glass-panel rounded-3xl p-7 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">{title}</h1>
          {updatedAt ? <p className="mt-2 text-sm text-zinc-400">Viimati uuendatud: {updatedAt}</p> : null}
        </header>

        <article className="mt-6 glass-panel rounded-3xl p-7 text-sm leading-relaxed text-zinc-300 sm:p-10">
          {children}
        </article>
      </main>
    </div>
  );
}

