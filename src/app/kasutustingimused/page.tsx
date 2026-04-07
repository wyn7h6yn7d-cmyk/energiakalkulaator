import { LegalLayout } from "@/app/(legal)/legal-layout";

export default function TermsPage() {
  return (
    <LegalLayout title="Kasutustingimused" updatedAt="07.04.2026">
      <p className="text-zinc-200">
        Need kasutustingimused reguleerivad Energiakalkulaatori teenuse kasutamist. Enne teenuse
        päris kasutuselevõttu palume tingimused juristiga üle vaadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">1. Üldsätted</h2>
      <p className="mt-2">
        Veebilehe <strong>energiakalkulaator.ee</strong> teenust osutab hetkel eraisik{" "}
        <strong>Kenneth Alto</strong>. Kontakt: <strong>kennethalto95@gmail.com</strong>.
      </p>
      <p className="mt-2">
        Ettevõtlusvormi muutumisel (nt ettevõtte asutamisel) uuendatakse teenusepakkuja andmeid
        veebilehel.
      </p>
      <p className="mt-2">
        Teenus on suunatud nii eraisikutele kui ettevõtetele ning on mõeldud energiaotsuste
        informatiivseks hindamiseks.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">2. Teenuse kirjeldus</h2>
      <p className="mt-2">
        Energiakalkulaator pakub kalkulaatoreid (nt päikesejaama tasuvus, VPP tasuvusmudel, jne), mis
        arvutavad sisendandmete põhjal hinnangulisi tulemusi. Tulemused ei ole garantii ning võivad
        erineda tegelikkusest.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">3. Kasutajakonto</h2>
      <p className="mt-2">
        Teenuse teatud funktsioonid võivad eeldada konto loomist (nt projektide salvestamine,
        ekspordid). Kasutaja vastutab oma sisselogimisandmete turvalisuse eest.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">4. Hinnad ja tasumine</h2>
      <p className="mt-2">
        Tasuliste teenuste hinnad on avaldatud lehel <strong>/pricing</strong>. Tegemist on digitaalse
        teenusega; enne ostu kinnitab kasutaja tingimused ja mõistab, et teenuse kohene osutamine võib
        mõjutada taganemisõigust vastavalt kohaldatavale õigusele.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">5. Intellektuaalne omand</h2>
      <p className="mt-2">
        Teenuse sisu, disain ja kood on teenusepakkuja või tema partnerite intellektuaalomand.
        Teenuse kasutamine ei anna õigust teenuse sisu kopeerida, levitada või taaskasutada väljaspool
        lubatud kasutusulatust.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">6. Vastutuse piirang</h2>
      <p className="mt-2">
        Teenus on informatiivne. Teenusepakkuja ei vastuta otsuste, kahjude või saamata jäänud tulu
        eest, mis põhinevad kalkulaatori tulemustel. Kasutaja peab vajadusel konsulteerima
        spetsialistidega.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">7. Teenuse kättesaadavus</h2>
      <p className="mt-2">
        Teenusepakkuja võib teenust ajutiselt piirata hoolduse, arenduse või turvalisuse tagamise
        eesmärgil.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">8. Lõppsätted</h2>
      <p className="mt-2">
        Tingimusi võidakse uuendada. Olulistest muudatustest teavitatakse mõistlikul viisil.
        Vaidlused lahendatakse esmalt läbirääkimiste teel; kohaldub Eesti õigus.
      </p>
    </LegalLayout>
  );
}

