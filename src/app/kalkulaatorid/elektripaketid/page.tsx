export default function ElektripaketidPage() {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-zinc-50">Elektripaketi võrdlus</h2>
      <p className="mt-2 text-sm text-zinc-400">
        See moodul on valmimas. Siia lisandub spot vs fikseeritud pakettide võrdlus, koos võrgutasu ja
        maksude lülititega ning (tasulises) CSV impordiga.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
        <p className="font-medium text-zinc-100">Mis tuleb järgmisena</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Aastakulu ja kuukulu võrdlus</li>
          <li>Spot hinnad Eleringist (server-route)</li>
          <li>(Tasuline) Tunnipõhine simulatsioon CSV tarbimisest</li>
        </ul>
      </div>
    </section>
  );
}

