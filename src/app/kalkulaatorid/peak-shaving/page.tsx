export default function PeakShavingPage() {
  return (
    <section className="glass-panel rounded-3xl p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-zinc-50">Peak shaving / ettevõtte võimsus</h2>
      <p className="mt-2 text-sm text-zinc-400">
        See moodul on valmimas. Siia lisandub tippude lõikamise hinnang (tasuta) ning (tasuline) täpne
        simulatsioon 15-min CSV tarbimisest.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-zinc-300">
        <p className="font-medium text-zinc-100">Mida see annab</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Hinnang säästule võrgutasus ja võimsustasudes</li>
          <li>Soovituslik aku suurus kWh ja kW</li>
          <li>(Tasuline) tippude analüüs ja rahavoog tabelina</li>
        </ul>
      </div>
    </section>
  );
}

