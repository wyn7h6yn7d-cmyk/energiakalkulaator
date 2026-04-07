import { LegalLayout } from "@/app/(legal)/legal-layout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privaatsuspoliitika" updatedAt="07.04.2026">
      <p className="text-zinc-200">
        Käesolev privaatsuspoliitika kirjeldab, kuidas Energiakalkulaator kogub ja töötleb
        isikuandmeid. Enne teenuse päris kasutuselevõttu palume sisu juristiga üle vaadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">1. Milliseid andmeid kogume</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Kontaktandmed, kui sa võtad meiega ühendust (nt e-post).</li>
        <li>Kasutusandmed (nt lehevaatamised ja tehnilised logid) teenuse töökindluse jaoks.</li>
        <li>Pro teenuse korral kontoandmed ja tellimuse info (nt Stripe/Supabase kaudu).</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">2. Milleks andmeid kasutame</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Teenuse osutamiseks ja arendamiseks.</li>
        <li>Klienditoeks ja päringutele vastamiseks.</li>
        <li>Turvalisuse ja pettuste ennetamiseks.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">3. Õiguslik alus</h2>
      <p className="mt-2">
        Andmeid töödeldakse lepingu täitmiseks, õigustatud huvi alusel (teenuse parendamine ja
        turvalisus) ning vajadusel nõusoleku alusel (nt analüütika, kui rakendatakse).
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">4. Andmete säilitamine</h2>
      <p className="mt-2">
        Säilitame andmeid nii kaua, kui see on vajalik teenuse osutamiseks, seadusest tulenevate
        kohustuste täitmiseks või vaidluste lahendamiseks.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">5. Andmete edastamine</h2>
      <p className="mt-2">
        Võime kasutada teenusepakkujaid (nt makseteenus, autentimine, hostimine). Näited: Stripe (maksed),
        Supabase (autentimine/andmebaas), Vercel (hostimine). Edastame ainult vajalikke andmeid.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">6. Kasutaja õigused</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Õigus tutvuda oma andmetega ja taotleda parandamist.</li>
        <li>Õigus taotleda kustutamist või töötlemise piiramist, kui see on kohaldatav.</li>
        <li>Õigus esitada vastuväide õigustatud huvi alusel töötlemisele.</li>
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">7. Kontakt</h2>
      <p className="mt-2">
        Andmekaitse küsimustes kirjuta: <strong>[SIIN LISA ANDMEKAITSE E-POST]</strong>.
      </p>
    </LegalLayout>
  );
}

