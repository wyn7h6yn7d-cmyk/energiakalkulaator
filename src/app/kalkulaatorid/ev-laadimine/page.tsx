export default function EvLaadiminePage() {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-zinc-50">EV laadimise kalkulaator</h2>
      <p className="mt-2 text-sm text-zinc-400">
        See moodul on valmimas. Siia lisandub laadimisakna, võimsuse ja spot-hindade põhine
        soovituslik ajakava.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
        <p className="font-medium text-zinc-100">Pro funktsioonid</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Odavaimate tundide leidmine Eleringi andmetega</li>
          <li>Laadimisgraafiku eksport</li>
          <li>Reeglid “lae ainult kui hind &lt; X”</li>
        </ul>
      </div>
    </section>
  );
}

