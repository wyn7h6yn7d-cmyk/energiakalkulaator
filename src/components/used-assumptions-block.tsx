"use client";

type UsedAssumptionsBlockProps = {
  userInputs: string[];
  defaultAssumptions: string[];
  apiValues?: string[];
  mostInfluentialInputs: string[];
};

function RowList({ items, emptyText }: { items: string[]; emptyText: string }) {
  if (items.length === 0) {
    return <p className="text-sm text-zinc-400">{emptyText}</p>;
  }
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function UsedAssumptionsBlock({
  userInputs,
  defaultAssumptions,
  apiValues = [],
  mostInfluentialInputs,
}: UsedAssumptionsBlockProps) {
  return (
    <article className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02]">
      <details className="group" open>
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/[0.02]">
          <div>
            <h4 className="section-title">Kasutatud eeldused</h4>
            <p className="mt-1 text-sm text-zinc-300">Mida täpsemad sisendandmed, seda täpsem on tulemus.</p>
          </div>
          <span className="text-xs text-zinc-400 group-open:hidden">Ava</span>
          <span className="hidden text-xs text-zinc-400 group-open:inline">Peida</span>
        </summary>
        <div className="grid gap-4 px-4 pb-4 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">Kasutaja sisestatud andmed</p>
            <div className="mt-2">
              <RowList items={userInputs} emptyText="Sisestatud andmeid pole veel piisavalt." />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">Vaikimisi eeldused</p>
            <div className="mt-2">
              <RowList items={defaultAssumptions} emptyText="Kõik põhiväärtused on kasutaja poolt üle kirjutatud." />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">API-st tulnud väärtused</p>
            <div className="mt-2">
              <RowList items={apiValues} emptyText="Selles arvutuses API andmeid ei kasutatud." />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-400">Kõige suurema mõjuga sisendid</p>
            <div className="mt-2">
              <RowList items={mostInfluentialInputs} emptyText="Peamisi mõjureid ei saanud veel hinnata." />
            </div>
          </div>
        </div>
      </details>
    </article>
  );
}
