import { LegalLayout } from "@/app/(legal)/legal-layout";

export default function RefundsPage() {
  return (
    <LegalLayout title="Tagastused ja tellimused" updatedAt="07.04.2026">
      <p className="text-zinc-200">
        See leht kirjeldab tellimuste ja digiteenuse kasutamise põhimõtteid. Enne teenuse päris
        kasutuselevõttu palume sisu juristiga üle vaadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">1. Tellimused (subscription)</h2>
      <p className="mt-2">
        Pro paketid võivad olla korduvad tellimused (kuu/aasta). Tellimus pikeneb automaatselt kuni
        tühistamiseni. Tühistamise järel kehtib ligipääs üldjuhul kuni jooksva perioodi lõpuni.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">2. Ühekordne Pro raport</h2>
      <p className="mt-2">
        Pro raport on ühekordne digiteenus ühe projekti kohta (nt PDF/Excel kokkuvõte). Teenus loetakse
        osutatuks, kui raporti ligipääs/eksport on kasutajale avatud.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">3. Tühistamine</h2>
      <p className="mt-2">
        Tellimust saab tühistada konto lehel või klienditoe kaudu: <strong>[SIIN LISA E-POST]</strong>.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">4. Tagasimaksed</h2>
      <p className="mt-2">
        Tagasimakseid käsitletakse juhtumipõhiselt, arvestades digiteenuse osutamise asjaolusid ja
        kohaldatavat õigust. Palun esita taotlus e-postile: <strong>[SIIN LISA E-POST]</strong>.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">5. Digitaalse teenuse osutamine</h2>
      <p className="mt-2">
        Digiteenuse puhul võib kohene ligipääs mõjutada taganemisõigust vastavalt kohaldatavale
        õigusele. Checkoutis lisatakse vastavad kinnitused.
      </p>
    </LegalLayout>
  );
}

