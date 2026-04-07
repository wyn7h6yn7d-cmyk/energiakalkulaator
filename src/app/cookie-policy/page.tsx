import { LegalLayout } from "@/app/(legal)/legal-layout";

export default function CookiePolicyPage() {
  return (
    <LegalLayout title="Küpsiste kasutamine (Cookie Policy)" updatedAt="07.04.2026">
      <p className="text-zinc-200">
        See leht selgitab, milliseid küpsiseid ja sarnaseid tehnoloogiaid Energiakalkulaator kasutab.
        Enne teenuse päris kasutuselevõttu palume sisu juristiga üle vaadata.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">1. Vajalikud küpsised</h2>
      <p className="mt-2">
        Vajalikud küpsised võimaldavad saidil korrektselt töötada (nt turvalisus, seansid). Neid ei
        saa üldjuhul välja lülitada, kui soovid teenust kasutada.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">2. Analüütilised küpsised</h2>
      <p className="mt-2">
        Võime kasutada analüütikat (nt anonüümset statistikat), et mõista, kuidas teenust kasutatakse
        ja mida parandada. Kui rakendame nõusolekupõhist analüütikat, lisame ka eelistuste halduse.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">3. Eelistuste haldus</h2>
      <p className="mt-2">
        Eelistuste haldus (cookie banner) lisatakse, kui teenuses kasutatakse analüütilisi või
        turundusküpsiseid, mis vajavad nõusolekut.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-50">4. Kuidas küpsiseid keelata</h2>
      <p className="mt-2">
        Sa saad küpsiseid piirata või kustutada oma brauseri seadetes. Pane tähele, et see võib
        mõjutada saidi funktsionaalsust.
      </p>
    </LegalLayout>
  );
}

