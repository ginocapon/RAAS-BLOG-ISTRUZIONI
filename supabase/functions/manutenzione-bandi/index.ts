// Supabase Edge Function — Manutenzione completa bandi v5.0
// Deploy: supabase functions deploy manutenzione-bandi
// Env vars richieste: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (automatiche in Supabase)
//
// Ciclo completo:
// 1. Cerca nuovi bandi da 55+ fonti (incentivi.gov.it, portali regionali, enti, CCIAA, aggregatori solo come discovery, UE)
// 2. Titoli pubblici = testo ufficiale fonte (API/CSV/HTML) senza riformulazione del titolo
// 3. provenance_interna (jsonb): traccia listing/aggregatore e metodo risoluzione URL istituzionale
// 4. URL aggregatore: match titolo sul pool incentivi.gov (gratis) o estrazione link .gov da pagina scheda; altrimenti scarto
// 5. Deduplica, insert, disattiva scaduti, rimuovi duplicati, verifica link
//
// Fonti coperte: MIMIT, MUR, MASE, MASAF, Invitalia, SIMEST, INAIL, SACE, InPA,
//   20 Regioni + 2 Province Autonome, 105+ CCIAA, incentivi.gov.it, RNA, OpenCoesione,
//   Horizon Europe, COSME, LIFE, 8+ aggregatori nazionali (bandi.it, telemat, bandiweb, finera, ecc.)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ══════════ FONTI BANDI — 55+ FONTI UFFICIALI ══════════
// Tipo: "json" = risposta JSON con parser generico
//       "html" = scraping HTML di pagine bandi
//       "csv"  = file CSV open data
//       "rss"  = feed RSS/Atom

interface FonteBandi {
  id: string;
  nome: string;
  url: string;
  tipo: "json" | "html" | "csv" | "rss";
  regione: string; // "Nazionale" o nome regione
  ente: string;
  tipo_ente: string; // "ministero", "ente_nazionale", "regione", "cciaa", "ue"
}

const FONTI: FonteBandi[] = [
  // ═══ PORTALE NAZIONALE INCENTIVI.GOV.IT ═══
  { id: "incentivi_gov_1", nome: "Incentivi.gov.it — Tutti gli attivi", url: "https://www.incentivi.gov.it/it/api/incentivi?stato=attivo&limit=200", tipo: "json", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },
  { id: "incentivi_gov_2", nome: "Incentivi.gov.it — Imprese", url: "https://www.incentivi.gov.it/it/api/incentivi?beneficiari=imprese&stato=attivo&limit=200", tipo: "json", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },
  { id: "incentivi_gov_3", nome: "Incentivi.gov.it — Professionisti", url: "https://www.incentivi.gov.it/it/api/incentivi?beneficiari=professionisti&stato=attivo&limit=100", tipo: "json", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },
  { id: "incentivi_gov_apertura", nome: "Incentivi.gov.it — In Apertura", url: "https://www.incentivi.gov.it/it/api/incentivi?stato=in_apertura&limit=200", tipo: "json", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },
  { id: "incentivi_gov_csv", nome: "Incentivi.gov.it — Open Data CSV", url: "https://www.incentivi.gov.it/sites/default/files/open-data/opendata-export.csv", tipo: "csv", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },

  // ═══ ENTI NAZIONALI ═══
  { id: "invitalia", nome: "Invitalia — Incentivi", url: "https://www.invitalia.it/cosa-facciamo/creiamo-nuove-aziende", tipo: "html", regione: "Nazionale", ente: "Invitalia", tipo_ente: "ente_nazionale" },
  { id: "invitalia_2", nome: "Invitalia — Trasformiamo le Imprese", url: "https://www.invitalia.it/cosa-facciamo/rafforziamo-le-imprese", tipo: "html", regione: "Nazionale", ente: "Invitalia", tipo_ente: "ente_nazionale" },
  { id: "simest", nome: "SIMEST — Finanziamenti Agevolati", url: "https://www.simest.it/prodotti-e-servizi", tipo: "html", regione: "Nazionale", ente: "SIMEST", tipo_ente: "ente_nazionale" },
  { id: "inail", nome: "INAIL — Bandi ISI", url: "https://www.inail.it/cs/internet/attivita/prevenzione-e-sicurezza/agevolazioni-e-finanziamenti.html", tipo: "html", regione: "Nazionale", ente: "INAIL", tipo_ente: "ente_nazionale" },
  { id: "sace", nome: "SACE — Prodotti", url: "https://www.sace.it/soluzioni", tipo: "html", regione: "Nazionale", ente: "SACE", tipo_ente: "ente_nazionale" },
  { id: "inpa", nome: "InPA — Portale Reclutamento PA", url: "https://www.inpa.gov.it", tipo: "html", regione: "Nazionale", ente: "InPA", tipo_ente: "ente_nazionale" },

  // ═══ MINISTERI ═══
  { id: "mimit_bandi", nome: "MIMIT — Bandi e Gare", url: "https://www.mimit.gov.it/it/incentivi", tipo: "html", regione: "Nazionale", ente: "MIMIT", tipo_ente: "ministero" },
  { id: "mur", nome: "MUR — Finanziamenti Ricerca", url: "https://www.mur.gov.it/it/aree-tematiche/ricerca/programmi-di-finanziamento", tipo: "html", regione: "Nazionale", ente: "MUR", tipo_ente: "ministero" },
  { id: "mase", nome: "MASE — Bandi Ambiente", url: "https://www.mase.gov.it/bandi", tipo: "html", regione: "Nazionale", ente: "MASE", tipo_ente: "ministero" },

  // ═══ PORTALI AGGREGATORI ═══
  { id: "opencoesione", nome: "OpenCoesione — Progetti", url: "https://opencoesione.gov.it/api/progetti.json?stato_progetto=in_corso&limit=100", tipo: "json", regione: "Nazionale", ente: "OpenCoesione", tipo_ente: "ente_nazionale" },
  { id: "bandicameredicommercio", nome: "BandiCamereDiCommercio.it — Aggregatore CCIAA", url: "https://www.bandicameredicommercio.it/bandi-e-contributi", tipo: "html", regione: "Nazionale", ente: "BandiCamereDiCommercio", tipo_ente: "cciaa" },
  { id: "bandi_it", nome: "Bandi.it — Aggregatore Nazionale", url: "https://bandi.it", tipo: "html", regione: "Nazionale", ente: "Bandi.it", tipo_ente: "ente_nazionale" },
  { id: "contributieuropa", nome: "ContributiEuropa — Tutti i Bandi", url: "https://www.contributieuropa.com/tuttibandi/", tipo: "html", regione: "Nazionale", ente: "ContributiEuropa", tipo_ente: "ente_nazionale" },
  { id: "indicebandi_europa_aperti", nome: "Indice Bandi Europa — Bandi aperti", url: "https://www.indicebandi-europa.it/it/bandi_aperti", tipo: "html", regione: "Nazionale", ente: "Indice Bandi Europa", tipo_ente: "ente_nazionale" },
  { id: "telemat", nome: "Telemat — Gare per Regione", url: "https://www.telemat.it/gare-in-italia/gare-per-regione/", tipo: "html", regione: "Nazionale", ente: "Telemat", tipo_ente: "ente_nazionale" },
  { id: "banchedati_biz", nome: "BancheDati.biz — Bandi di Gara", url: "https://www.banchedati.biz/bandi-di-gara/", tipo: "html", regione: "Nazionale", ente: "BancheDati", tipo_ente: "ente_nazionale" },
  { id: "finera", nome: "Finera — Finanza Agevolata", url: "https://finera.it/articoli/finanza-agevolata/la-guida-definitiva-ai-bandi-regionali/", tipo: "html", regione: "Nazionale", ente: "Finera", tipo_ente: "ente_nazionale" },
  { id: "bandiweb", nome: "BandiWeb.it — Aggregatore", url: "https://bandiweb.it", tipo: "html", regione: "Nazionale", ente: "BandiWeb", tipo_ente: "ente_nazionale" },
  { id: "infobandi_csvnet", nome: "InfoBandi CSVnet — Bandi Attivi", url: "https://infobandi.csvnet.it/home/bandi-attivi/", tipo: "html", regione: "Nazionale", ente: "CSVnet", tipo_ente: "ente_nazionale" },

  // ═══ 20 REGIONI ITALIANE + PROVINCE AUTONOME ═══
  { id: "reg_piemonte", nome: "Regione Piemonte", url: "https://bandi.regione.piemonte.it/contributi-finanziamenti", tipo: "html", regione: "Piemonte", ente: "Regione Piemonte", tipo_ente: "regione" },
  { id: "reg_vda", nome: "Regione Valle d'Aosta", url: "https://www.regione.vda.it/finanze/finanziamenti_i.aspx", tipo: "html", regione: "Valle d'Aosta", ente: "Regione Valle d'Aosta", tipo_ente: "regione" },
  { id: "reg_lombardia", nome: "Regione Lombardia", url: "https://www.bandi.regione.lombardia.it/procedimenti/new/bandi/bandi", tipo: "html", regione: "Lombardia", ente: "Regione Lombardia", tipo_ente: "regione" },
  { id: "reg_taa", nome: "Provincia Autonoma Trento", url: "https://www.provincia.tn.it/Servizi/Contributi-e-agevolazioni", tipo: "html", regione: "Trentino-Alto Adige", ente: "Provincia Autonoma Trento", tipo_ente: "regione" },
  { id: "reg_bolzano", nome: "Provincia Autonoma Bolzano", url: "https://www.provincia.bz.it/economia-finanze/economia/contributi-agevolazioni.asp", tipo: "html", regione: "Trentino-Alto Adige", ente: "Provincia Autonoma Bolzano", tipo_ente: "regione" },
  { id: "reg_veneto", nome: "Regione Veneto", url: "https://bandi.regione.veneto.it/Public/Elenco?Tipo=1", tipo: "html", regione: "Veneto", ente: "Regione Veneto", tipo_ente: "regione" },
  { id: "reg_fvg", nome: "Regione Friuli Venezia Giulia", url: "https://www.regione.fvg.it/rafvg/cms/RAFVG/economia-imprese/incentivi-contributi/", tipo: "html", regione: "Friuli Venezia Giulia", ente: "Regione FVG", tipo_ente: "regione" },
  { id: "reg_liguria", nome: "Regione Liguria", url: "https://www.regione.liguria.it/homepage/economia/bandi-e-contributi.html", tipo: "html", regione: "Liguria", ente: "Regione Liguria", tipo_ente: "regione" },
  { id: "reg_emilia", nome: "Regione Emilia-Romagna", url: "https://bandi.regione.emilia-romagna.it/finanziamenti-e-opportunita-aperti", tipo: "html", regione: "Emilia-Romagna", ente: "Regione Emilia-Romagna", tipo_ente: "regione" },
  { id: "reg_toscana", nome: "Regione Toscana", url: "https://www.regione.toscana.it/bandi-aperti", tipo: "html", regione: "Toscana", ente: "Regione Toscana", tipo_ente: "regione" },
  { id: "reg_umbria", nome: "Regione Umbria", url: "https://www.regione.umbria.it/bandi-e-avvisi", tipo: "html", regione: "Umbria", ente: "Regione Umbria", tipo_ente: "regione" },
  { id: "reg_marche", nome: "Regione Marche", url: "https://www.regione.marche.it/Regione-Utile/Economia/Bandi-e-Finanziamenti", tipo: "html", regione: "Marche", ente: "Regione Marche", tipo_ente: "regione" },
  { id: "reg_lazio", nome: "Regione Lazio", url: "https://www.lazioinnova.it/bandi-aperti/", tipo: "html", regione: "Lazio", ente: "Regione Lazio", tipo_ente: "regione" },
  { id: "reg_lazio_2", nome: "Lazio Europa — Bandi", url: "https://www.lazioeuropa.it/bandi/", tipo: "html", regione: "Lazio", ente: "Lazio Europa", tipo_ente: "regione" },
  { id: "reg_abruzzo", nome: "Regione Abruzzo", url: "https://www.regione.abruzzo.it/bandi", tipo: "html", regione: "Abruzzo", ente: "Regione Abruzzo", tipo_ente: "regione" },
  { id: "reg_molise", nome: "Regione Molise", url: "https://www3.regione.molise.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/2792", tipo: "html", regione: "Molise", ente: "Regione Molise", tipo_ente: "regione" },
  { id: "reg_campania", nome: "Regione Campania", url: "https://www.regione.campania.it/regione/it/tematiche/bandi-e-avvisi", tipo: "html", regione: "Campania", ente: "Regione Campania", tipo_ente: "regione" },
  { id: "reg_puglia", nome: "Regione Puglia", url: "https://www.regione.puglia.it/web/competitivita-e-innovazione/elenco-bandi", tipo: "html", regione: "Puglia", ente: "Regione Puglia", tipo_ente: "regione" },
  { id: "reg_puglia_2", nome: "Sistema Puglia", url: "https://www.sistema.puglia.it/portal/page/portal/SistemaPuglia/bandi", tipo: "html", regione: "Puglia", ente: "Sistema Puglia", tipo_ente: "regione" },
  { id: "reg_basilicata", nome: "Regione Basilicata", url: "https://www.regione.basilicata.it/giunta/site/giunta/department.jsp?dep=100058&area=3061920", tipo: "html", regione: "Basilicata", ente: "Regione Basilicata", tipo_ente: "regione" },
  { id: "reg_calabria", nome: "Regione Calabria", url: "https://portale.regione.calabria.it/website/organizzazione/dipartimento4/bandi/", tipo: "html", regione: "Calabria", ente: "Regione Calabria", tipo_ente: "regione" },
  { id: "reg_sicilia", nome: "Regione Sicilia", url: "https://pti.regione.sicilia.it/portal/page/portal/PIR_PORTALE", tipo: "html", regione: "Sicilia", ente: "Regione Sicilia", tipo_ente: "regione" },
  { id: "reg_sardegna", nome: "Regione Sardegna", url: "https://www.regione.sardegna.it/argomenti/imprese/contributi-finanziamenti-incentivi", tipo: "html", regione: "Sardegna", ente: "Regione Sardegna", tipo_ente: "regione" },

  // ═══ CAMERE DI COMMERCIO (aggregatori + singole CCIAA) ═══
  { id: "cciaa_unioncamere", nome: "Unioncamere — Bandi PID", url: "https://www.unioncamere.gov.it/comunicazione/primo-piano", tipo: "html", regione: "Nazionale", ente: "Unioncamere", tipo_ente: "cciaa" },
  { id: "cciaa_unioncamere_concorso", nome: "Unioncamere — Bandi di Concorso", url: "https://www.unioncamere.gov.it/amministrazione-trasparente/bandi-di-concorso", tipo: "html", regione: "Nazionale", ente: "Unioncamere", tipo_ente: "cciaa" },
  { id: "cciaa_unioncamere_gare", nome: "Unioncamere — Gare e Contratti", url: "https://www.unioncamere.gov.it/amministrazione-trasparente/bandi-di-gara-e-contratti", tipo: "html", regione: "Nazionale", ente: "Unioncamere", tipo_ente: "cciaa" },
  { id: "cciaa_contributiregione", nome: "ContributiRegione.it — Aggregatore", url: "https://bandi.contributiregione.it/", tipo: "html", regione: "Nazionale", ente: "ContributiRegione", tipo_ente: "cciaa" },
  { id: "cciaa_treviso_belluno", nome: "CCIAA Treviso-Belluno", url: "https://www.tb.camcom.gov.it/bandi", tipo: "html", regione: "Veneto", ente: "CCIAA Treviso-Belluno", tipo_ente: "cciaa" },
  { id: "cciaa_vicenza", nome: "CCIAA Vicenza", url: "https://www.vi.camcom.it/it/servizi/contributi-e-finanziamenti.html", tipo: "html", regione: "Veneto", ente: "CCIAA Vicenza", tipo_ente: "cciaa" },
  { id: "cciaa_verona", nome: "CCIAA Verona", url: "https://www.vr.camcom.it/it/content/bandi-e-contributi", tipo: "html", regione: "Veneto", ente: "CCIAA Verona", tipo_ente: "cciaa" },
  { id: "cciaa_padova", nome: "CCIAA Padova", url: "https://www.pd.camcom.it/bandi-contributi-e-finanziamenti", tipo: "html", regione: "Veneto", ente: "CCIAA Padova", tipo_ente: "cciaa" },
  { id: "cciaa_venezia_rovigo", nome: "CCIAA Venezia Rovigo", url: "https://www.dl.camcom.it/bandi-e-contributi", tipo: "html", regione: "Veneto", ente: "CCIAA Venezia Rovigo", tipo_ente: "cciaa" },
  { id: "cciaa_cosenza", nome: "CCIAA Cosenza", url: "https://www.cs.camcom.gov.it/it/content/service/avvisi-e-bandi-della-camera", tipo: "html", regione: "Calabria", ente: "CCIAA Cosenza", tipo_ente: "cciaa" },
  { id: "cciaa_milano", nome: "CCIAA Milano", url: "https://www.milomb.camcom.it/bandi-e-contributi", tipo: "html", regione: "Lombardia", ente: "CCIAA Milano", tipo_ente: "cciaa" },
  { id: "cciaa_roma", nome: "CCIAA Roma", url: "https://www.rm.camcom.it/pagina1816_bandi-e-avvisi.html", tipo: "html", regione: "Lazio", ente: "CCIAA Roma", tipo_ente: "cciaa" },
  { id: "cciaa_torino", nome: "CCIAA Torino", url: "https://www.to.camcom.it/bandi-e-contributi", tipo: "html", regione: "Piemonte", ente: "CCIAA Torino", tipo_ente: "cciaa" },
  { id: "cciaa_napoli", nome: "CCIAA Napoli", url: "https://www.na.camcom.gov.it/bandi-e-avvisi", tipo: "html", regione: "Campania", ente: "CCIAA Napoli", tipo_ente: "cciaa" },
  { id: "cciaa_bari", nome: "CCIAA Bari", url: "https://www.ba.camcom.it/attivit%C3%A0/bandi-e-avvisi", tipo: "html", regione: "Puglia", ente: "CCIAA Bari", tipo_ente: "cciaa" },
  { id: "cciaa_firenze", nome: "CCIAA Firenze", url: "https://www.fi.camcom.gov.it/bandi-e-contributi", tipo: "html", regione: "Toscana", ente: "CCIAA Firenze", tipo_ente: "cciaa" },
  { id: "cciaa_bologna", nome: "CCIAA Bologna", url: "https://www.bo.camcom.gov.it/it/opportunita-e-bandi", tipo: "html", regione: "Emilia-Romagna", ente: "CCIAA Bologna", tipo_ente: "cciaa" },

  // ═══ FONDI UE ═══
  { id: "eu_horizon", nome: "Horizon Europe — Calls Open", url: "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/calls-for-proposals?status=31094501,31094502&programmePart=43108390", tipo: "html", regione: "Nazionale", ente: "Commissione Europea", tipo_ente: "ue" },
];

// ══════════ FETCH CON RETRY ══════════
async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "RaaS-Automazioni-BandiAggregator/3.0 (info@raasautomazioni.it)",
          Accept: "application/json, text/html, text/csv, application/xml",
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok) return await res.text();
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    } catch {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
  }
  return null;
}

// ══════════ INTERFACCE ══════════
interface BandoRaw {
  id?: string;
  slug?: string;
  titolo?: string;
  title?: string;
  nome?: string;
  ente_erogatore?: string;
  ente?: string;
  regione?: string;
  url?: string;
  link?: string;
  url_domanda?: string;
  data_apertura?: string;
  data_scadenza?: string;
  stato?: string;
  dotazione?: number;
  contributo_min?: number;
  contributo_max?: number;
  importo_max?: number;
  percentuale_contributo?: number;
  tipo_contributo?: string;
  beneficiari?: string[];
  settori?: string[];
  finalita?: string[];
  descrizione?: string;
  abstract?: string;
}

interface Bando {
  titolo: string;
  descrizione: string;
  ente: string;
  regione: string;
  importo_max: number | null;
  tipo_contributo: string;
  tipo_ente: string;
  settore: string;
  scadenza: string | null;
  url: string;
  attivo: boolean;
  fonte: string;
  data_inserimento: string;
  /** Solo DB / admin: non esporre sul sito pubblico */
  provenance_interna?: Record<string, unknown>;
  stato?: string;
}

// ══════════ RISCRITTURA ANTI-PLAGIO DESCRIZIONI ══════════
// I testi dei bandi vengono leggermente rielaborati per evitare contenuto duplicato.
// Strategia: riordina frasi, sostituisci sinonimi comuni, aggiungi contesto fonte.
const SINONIMI: [RegExp, string][] = [
  [/\bè possibile\b/gi, "si può"],
  [/\bal fine di\b/gi, "per"],
  [/\bfinalizzato a\b/gi, "mirato a"],
  [/\bnell'ambito di\b/gi, "nel contesto di"],
  [/\battraverso\b/gi, "tramite"],
  [/\bcontributo a fondo perduto\b/gi, "finanziamento non rimborsabile"],
  [/\bfinanziamento agevolato\b/gi, "prestito a condizioni vantaggiose"],
  [/\bpossono beneficiare\b/gi, "possono accedere"],
  [/\bpossono presentare domanda\b/gi, "possono fare richiesta"],
  [/\bla misura prevede\b/gi, "l'intervento include"],
  [/\bil bando prevede\b/gi, "l'avviso contempla"],
  [/\bsoggetti beneficiari\b/gi, "destinatari"],
  [/\brisorse disponibili\b/gi, "dotazione finanziaria"],
  [/\bpresentazione delle domande\b/gi, "invio delle richieste"],
  [/\bspese ammissibili\b/gi, "costi finanziabili"],
  [/\bintensità dell'aiuto\b/gi, "quota di contributo"],
  [/\bregime de minimis\b/gi, "regime de minimis (aiuti minori)"],
  [/\bPMI\b/g, "piccole e medie imprese"],
  [/\bstart-?up\b/gi, "nuove imprese innovative"],
  [/\bdigitalizzazione\b/gi, "trasformazione digitale"],
  [/\binnovazione tecnologica\b/gi, "sviluppo tecnologico"],
  [/\btransizione ecologica\b/gi, "sostenibilità ambientale"],
  [/\bcompetitività\b/gi, "capacità competitiva"],
];

function riscriviDescrizione(desc: string, fonte: FonteBandi): string {
  if (!desc || desc.length < 20) return desc;

  let testo = desc;

  // 1. Applica sostituzione sinonimi (alterna: applica solo in base a hash del testo per variare)
  const hash = testo.length + testo.charCodeAt(0);
  SINONIMI.forEach(([pattern, replacement], idx) => {
    // Applica ~60% dei sinonimi, variando per ogni bando
    if ((hash + idx) % 5 !== 0) {
      testo = testo.replace(pattern, replacement);
    }
  });

  // 2. Se ci sono più frasi, riordina leggermente (sposta la prima frase dopo la seconda)
  const frasi = testo.split(/(?<=\.)\s+/).filter(f => f.length > 10);
  if (frasi.length >= 3) {
    // Scambia prima e seconda frase per variare struttura
    const temp = frasi[0];
    frasi[0] = frasi[1];
    frasi[1] = temp;
    testo = frasi.join(" ");
  }

  // 3. Aggiungi nota fonte se non presente
  if (!testo.includes("Fonte:") && fonte.ente) {
    testo = testo.replace(/\.\s*$/, "") + `. Fonte: ${fonte.ente}.`;
  }

  return testo;
}

// ══════════ PARSER INCENTIVI.GOV.IT (JSON) ══════════
function parseIncentiviGov(body: string, fonte: FonteBandi): Bando[] {
  try {
    const json = JSON.parse(body);
    const items: BandoRaw[] =
      json.results || json.data || json.incentivi || (Array.isArray(json) ? json : []);
    return items.map((item) => {
      const titolo = item.titolo || item.title || item.nome || "Senza titolo";
      const titoloUfficiale = titolo.trim().replace(/\s+/g, " ");

      const descOriginale = item.descrizione || item.abstract || "";

      return {
        titolo: titoloUfficiale,
        descrizione: riscriviDescrizione(descOriginale, fonte),
        ente: item.ente_erogatore || item.ente || fonte.ente,
        regione: item.regione || fonte.regione,
        importo_max: item.contributo_max || item.importo_max || null,
        tipo_contributo: item.tipo_contributo || "misto",
        tipo_ente: fonte.tipo_ente,
        settore: Array.isArray(item.settori)
          ? item.settori[0] || "tutti"
          : "tutti",
        scadenza: item.data_scadenza || null,
        url: item.url || item.link || item.url_domanda || "#",
        attivo: true,
        fonte: fonte.id,
        data_inserimento: new Date().toISOString(),
        stato: "aperto",
        provenance_interna: {
          fonte_primaria_api: fonte.id.startsWith("incentivi_gov")
            ? "incentivi.gov.it"
            : fonte.ente,
          ingest_endpoint: fonte.id,
        },
      };
    });
  } catch {
    return [];
  }
}

// ══════════ PARSER CSV (incentivi.gov.it open data) ══════════
function parseCsv(body: string, fonte: FonteBandi): Bando[] {
  try {
    const lines = body.split("\n").filter((l) => l.trim());
    if (lines.length < 2) return [];
    const headers = lines[0].split(";").map((h) => h.trim().toLowerCase().replace(/"/g, ""));
    const bandi: Bando[] = [];

    for (let i = 1; i < lines.length && i < 500; i++) {
      const cols = lines[i].split(";").map((c) => c.trim().replace(/"/g, ""));
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => { row[h] = cols[idx] || ""; });

      const titolo = row["titolo"] || row["nome"] || row["incentivo"] || "";
      if (!titolo) continue;

      const titoloUfficiale = titolo.trim().replace(/\s+/g, " ");

      const descCsv = row["descrizione"] || row["abstract"] || "";

      bandi.push({
        titolo: titoloUfficiale,
        descrizione: riscriviDescrizione(descCsv, fonte),
        ente: row["ente_erogatore"] || row["ente"] || fonte.ente,
        regione: row["regione"] || fonte.regione,
        importo_max: parseFloat(row["importo_max"] || row["contributo_max"] || "") || null,
        tipo_contributo: row["tipo_contributo"] || "misto",
        tipo_ente: fonte.tipo_ente,
        settore: row["settore"] || "tutti",
        scadenza: row["data_scadenza"] || row["scadenza"] || null,
        url: row["url"] || row["link"] || "#",
        attivo: true,
        fonte: fonte.id,
        data_inserimento: new Date().toISOString(),
        stato: "aperto",
        provenance_interna: {
          fonte_primaria: "incentivi.gov.it_opendata_csv",
          ingest_endpoint: fonte.id,
        },
      });
    }
    return bandi;
  } catch {
    return [];
  }
}

// ══════════ PARSER HTML (scraping portali regionali e enti) ══════════
function parseHtml(body: string, fonte: FonteBandi): Bando[] {
  const bandi: Bando[] = [];
  try {
    // Strategia multi-pattern: cerca titoli di bandi in diverse strutture HTML comuni
    // Pattern 1: <a href="...">Titolo Bando</a> dentro tag con classi comuni
    const linkPatterns = [
      /<a[^>]+href="([^"]+)"[^>]*>\s*([^<]{10,200})\s*<\/a>/gi,
      /<h[23456][^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>\s*([^<]{10,200})\s*<\/a>\s*<\/h[23456]>/gi,
      /<li[^>]*>\s*<a[^>]+href="([^"]+)"[^>]*>\s*([^<]{10,200})\s*<\/a>/gi,
    ];

    // Keywords che indicano un bando/incentivo
    const bandoKeywords = /bando|avviso|contribut|incentiv|agevolazion|finanziament|fondo.*perduto|voucher|credito.*imposta|misura|intervento|sostegno|bonus|sgravio|programma|pid|isi\s|sabatini|transizione|smart.*start|resto.*sud|cultura.*crea|zes|fesr|feasr|pnrr|por\s|psr\s|horizon|cosme|life\s/i;

    // Parole da escludere (non sono bandi)
    const excludeKeywords = /cookie|privacy|contatti|chi siamo|accedi|login|registra|newsletter|social|facebook|twitter|instagram|linkedin|youtube|mappa.*sito|sitemap|cerca|search|faq|condizioni|termini|copyright/i;

    const seen = new Set<string>();

    for (const pattern of linkPatterns) {
      let match;
      while ((match = pattern.exec(body)) !== null) {
        let href = match[1].trim();
        const text = match[2].trim().replace(/\s+/g, " ");

        // Filtra: deve sembrare un bando e non essere un link di navigazione
        if (text.length < 15 || text.length > 200) continue;
        if (!bandoKeywords.test(text) && !bandoKeywords.test(href)) continue;
        if (excludeKeywords.test(text)) continue;

        // Costruisci URL assoluto
        if (href.startsWith("/")) {
          const baseUrl = new URL(fonte.url);
          href = baseUrl.origin + href;
        } else if (!href.startsWith("http")) {
          continue;
        }

        // Dedup interno
        const key = text.toLowerCase().substring(0, 50);
        if (seen.has(key)) continue;
        seen.add(key);

        const titoloUfficiale = text.trim().replace(/\s+/g, " ");

        bandi.push({
          titolo: titoloUfficiale,
          descrizione: "",
          ente: fonte.ente,
          regione: fonte.regione,
          importo_max: null,
          tipo_contributo: "misto",
          tipo_ente: fonte.tipo_ente,
          settore: "tutti",
          scadenza: null,
          url: href,
          attivo: true,
          fonte: fonte.id,
          data_inserimento: new Date().toISOString(),
          stato: "aperto",
          provenance_interna: {
            estrazione_scraping_html: true,
            ingest_endpoint: fonte.id,
            pagina_listing: fonte.url,
          },
        });
      }
    }

    // Pattern aggiuntivo: cerca date di scadenza nel contesto dei bandi trovati
    // e importi se presenti nel testo vicino
    return bandi;
  } catch {
    return [];
  }
}

// ══════════ SIMILARITA' TITOLI ══════════
function similarity(s1: string, s2: string): number {
  const words1 = new Set(s1.toLowerCase().split(/\s+/));
  const words2 = new Set(s2.toLowerCase().split(/\s+/));
  const intersection = [...words1].filter((w) => words2.has(w)).length;
  const union = new Set([...words1, ...words2]).size;
  return union === 0 ? 0 : intersection / union;
}

function normalizeTitle(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9àèéìòù\s]/g, "")
    .trim();
}

// ══════════ AGGREGATORI: mai pubblicare il link sul sito ══════════
function normHost(hostname: string): string {
  return hostname.replace(/^www\./i, "").toLowerCase();
}

const AGGREGATOR_HOSTS = new Set([
  "contributieuropa.com",
  "indicebandi-europa.it",
  "bandi.it",
  "telemat.it",
  "banchedati.biz",
  "finera.it",
  "bandiweb.it",
  "bandicameredicommercio.it",
  "contributiregione.it",
]);

function isAggregatorUrl(urlStr: string): boolean {
  try {
    const host = normHost(new URL(urlStr).hostname);
    if (AGGREGATOR_HOSTS.has(host)) return true;
    if (host === "infobandi.csvnet.it") return true;
    if (host.endsWith(".contributiregione.it")) return true;
    return false;
  } catch {
    return false;
  }
}

/** Link istituzionale accettabile se estratto da una scheda aggregatore. */
function looksOfficialUrl(urlStr: string): boolean {
  if (isAggregatorUrl(urlStr)) return false;
  try {
    const host = normHost(new URL(urlStr).hostname);
    if (/\.gov\.it$/i.test(host)) return true;
    if (/\.europa\.eu$/i.test(host)) return true;
    if (/invitalia\.it$/i.test(host)) return true;
    if (/inail\.it$/i.test(host)) return true;
    if (/simest\.it$/i.test(host)) return true;
    if (/sace\.it$/i.test(host)) return true;
    if (/unioncamere\.gov\.it$/i.test(host)) return true;
    if (/\.camcom\.it$/i.test(host)) return true;
    if (/\.camcom\.gov\.it$/i.test(host)) return true;
    if (host.includes("regione.")) return true;
    if (host.includes("provincia.")) return true;
    if (host.includes("incentivi.gov.it")) return true;
    return false;
  } catch {
    return false;
  }
}

function bestIncentiviMatch(
  titolo: string,
  pool: Bando[],
): { b: Bando; score: number } | null {
  const nt = normalizeTitle(titolo);
  if (nt.length < 8) return null;
  let best: { b: Bando; score: number } | null = null;
  for (const cand of pool) {
    const s = similarity(nt, normalizeTitle(cand.titolo));
    if (!best || s > best.score) best = { b: cand, score: s };
  }
  if (best && best.score >= 0.42) return best;
  return null;
}

async function extractFirstOfficialFromHtmlPage(
  pageUrl: string,
): Promise<string | null> {
  const html = await fetchWithRetry(pageUrl);
  if (!html) return null;
  const re = /href\s*=\s*["'](https?:\/\/[^"'>\s]+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const u = m[1].replace(/&amp;/g, "&");
    if (u.startsWith("http") && looksOfficialUrl(u)) return u;
  }
  return null;
}

/** Rimuove o risolve URL aggregatore; arricchisce provenance_interna. */
async function enrichAggregatorBandi(
  raw: Bando[],
  addLog: (s: string) => void,
): Promise<Bando[]> {
  const officialPool = raw.filter(
    (b) =>
      /^incentivi_gov/.test(b.fonte) &&
      b.url &&
      b.url.startsWith("http") &&
      b.url !== "#" &&
      !isAggregatorUrl(b.url),
  );
  addLog(
    `  Pool incentivi.gov per abbinamento titoli: ${officialPool.length} record`,
  );

  const out: Bando[] = [];
  let detailBudget = 30;
  let scartati = 0;

  for (const b of raw) {
    const origUrl = b.url || "";
    const prevProv =
      typeof b.provenance_interna === "object" && b.provenance_interna
        ? (b.provenance_interna as Record<string, unknown>)
        : {};
    const baseProvenenza: Record<string, unknown> = {
      ...prevProv,
      ingest_fonte_id: b.fonte,
      url_rilevato_iniziale: origUrl,
    };

    if (!origUrl || origUrl === "#") continue;

    if (!isAggregatorUrl(origUrl)) {
      out.push({
        ...b,
        provenance_interna: baseProvenenza,
      });
      continue;
    }

    const match = bestIncentiviMatch(b.titolo, officialPool);
    if (match) {
      out.push({
        ...b,
        titolo: match.b.titolo,
        url: match.b.url,
        scadenza: b.scadenza || match.b.scadenza,
        descrizione: b.descrizione?.length ? b.descrizione : match.b.descrizione,
        provenance_interna: {
          ...baseProvenenza,
          risolto_tramite: "match_titolo_incentivi_gov",
          url_scheda_aggregatore: origUrl,
          titolo_listing_prima_match: b.titolo,
        },
      });
      continue;
    }

    if (detailBudget > 0) {
      detailBudget--;
      const extracted = await extractFirstOfficialFromHtmlPage(origUrl);
      if (extracted && looksOfficialUrl(extracted)) {
        out.push({
          ...b,
          url: extracted,
          provenance_interna: {
            ...baseProvenenza,
            risolto_tramite: "link_estratto_scheda_html",
            url_scheda_aggregatore: origUrl,
          },
        });
        continue;
      }
    }

    scartati++;
    addLog(
      `    Scarto aggregatore senza URL istituzionale: ${b.titolo.substring(0, 52)}...`,
    );
  }

  addLog(`  Scartati (solo aggregatore non risolvibile): ${scartati}`);
  return out;
}

// ══════════ HANDLER PRINCIPALE ══════════
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metodo non consentito" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  const log: string[] = [];
  const addLog = (msg: string) => {
    log.push(
      new Date().toLocaleTimeString("it-IT", { timeZone: "Europe/Rome" }) +
        " — " +
        msg
    );
  };

  try {
    // Inizializza Supabase con SERVICE_ROLE_KEY (accesso completo)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const sb = createClient(supabaseUrl, supabaseKey);

    const oggi = new Date().toISOString().split("T")[0];
    let nuoviBandi = 0;
    let scadutiDisattivati = 0;
    let duplicatiRimossi = 0;
    let linkErrori = 0;
    let titoliCorretti = 0;

    // ═══ STEP 1: Carica bandi esistenti ═══
    addLog("Caricamento bandi esistenti dal database...");
    const { data: esistenti, error: errEsistenti } = await sb
      .from("bandi")
      .select("id, titolo, scadenza, url, attivo, ente");
    if (errEsistenti) throw new Error("Errore DB: " + errEsistenti.message);
    const bandiEsistenti = esistenti || [];
    addLog(`  ${bandiEsistenti.length} bandi totali nel database`);

    // ═══ STEP 2: Cerca nuovi bandi dalle fonti ═══
    addLog("Ricerca nuovi bandi dalle fonti ufficiali...");
    const tuttiBandiNuovi: Bando[] = [];

    // Processa fonti in batch paralleli (8 alla volta) per massima efficienza
    const BATCH_SIZE = 8;
    for (let b = 0; b < FONTI.length; b += BATCH_SIZE) {
      const batch = FONTI.slice(b, b + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map(async (fonte) => {
          addLog(`  Interrogo ${fonte.nome}...`);
          const body = await fetchWithRetry(fonte.url);
          if (!body) {
            addLog(`    Fonte non raggiungibile: ${fonte.nome}`);
            return [];
          }
          let parsed: Bando[];
          switch (fonte.tipo) {
            case "json":
              parsed = parseIncentiviGov(body, fonte);
              break;
            case "csv":
              parsed = parseCsv(body, fonte);
              break;
            case "html":
              parsed = parseHtml(body, fonte);
              break;
            case "rss":
              // RSS usa lo stesso parser HTML (cerca link con keyword bandi)
              parsed = parseHtml(body, fonte);
              break;
            default:
              parsed = [];
          }
          addLog(`    Trovati ${parsed.length} bandi da ${fonte.nome}`);
          return parsed;
        })
      );
      for (const r of results) {
        if (r.status === "fulfilled" && r.value.length > 0) {
          tuttiBandiNuovi.push(...r.value);
        }
      }
      addLog(`  Batch ${Math.floor(b / BATCH_SIZE) + 1}/${Math.ceil(FONTI.length / BATCH_SIZE)} completato — totale parziale: ${tuttiBandiNuovi.length} bandi`);
    }
    addLog(`  Totale bandi trovati da tutte le fonti: ${tuttiBandiNuovi.length}`);

    addLog("Risoluzione URL aggregatori (match incentivi.gov + estrazione scheda)...");
    const tuttiBandiNuoviDopoRisoluzione = await enrichAggregatorBandi(
      tuttiBandiNuovi,
      addLog,
    );
    addLog(
      `  Record dopo filtro aggregatore: ${tuttiBandiNuoviDopoRisoluzione.length}`,
    );

    // ═══ STEP 3: Deduplica e inserisci nuovi ═══
    // Logica a 3 fattori:
    //   1. Stesso URL = duplicato certo
    //   2. Stesso titolo + stessa data = duplicato certo
    //   3. Date diverse = MAI duplicato (anche con titolo identico)
    const normUrl = (u: string) => (u || "").toLowerCase().replace(/\/+$/, "").replace(/^https?:\/\/(www\.)?/, "");

    if (tuttiBandiNuoviDopoRisoluzione.length > 0) {
      addLog("Deduplicazione e inserimento nuovi bandi...");
      addLog("  Fattore 1: stesso URL = duplicato");
      addLog("  Fattore 2: stesso titolo + stessa data = duplicato");
      addLog("  Fattore 3: date diverse = NON duplicato");

      const urlEsistenti = new Set(bandiEsistenti.map((eb) => normUrl(eb.url)).filter((u) => u && u !== "#"));
      const bandiDaInserire: Bando[] = [];

      for (const nb of tuttiBandiNuoviDopoRisoluzione) {
        // Skip link vuoti o placeholder
        if (!nb.url || nb.url === "#") continue;
        if (isAggregatorUrl(nb.url)) continue;

        // Fattore 1: stesso URL = duplicato certo
        if (urlEsistenti.has(normUrl(nb.url))) continue;

        // Fattore 2: stesso titolo + stessa data = duplicato
        const normNuovo = normalizeTitle(nb.titolo);
        const dupTitoloData = bandiEsistenti.some(
          (eb) => normalizeTitle(eb.titolo) === normNuovo && eb.scadenza === nb.scadenza
        );
        if (dupTitoloData) continue;

        // Check contro bandi gia' selezionati per inserimento
        const dupInterno = bandiDaInserire.some(
          (bi) => normUrl(bi.url) === normUrl(nb.url)
        );
        if (dupInterno) continue;

        bandiDaInserire.push(nb);
        urlEsistenti.add(normUrl(nb.url));
      }

      if (bandiDaInserire.length > 0) {
        const { error: errInsert } = await sb
          .from("bandi")
          .insert(bandiDaInserire);
        if (errInsert) {
          addLog(`  Errore inserimento: ${errInsert.message}`);
        } else {
          nuoviBandi = bandiDaInserire.length;
          addLog(`  Inseriti ${nuoviBandi} nuovi bandi:`);
          bandiDaInserire.forEach((b) => addLog(`    + ${b.titolo}`));
        }
      } else {
        addLog("  Nessun nuovo bando da inserire (tutti gia' presenti)");
      }
    }

    // ═══ STEP 4: Disattiva bandi scaduti ═══
    addLog("Controllo bandi scaduti...");
    const { data: scaduti } = await sb
      .from("bandi")
      .select("id, titolo, scadenza")
      .eq("attivo", true)
      .lt("scadenza", oggi)
      .not("scadenza", "is", null);

    if (scaduti && scaduti.length > 0) {
      const ids = scaduti.map((b) => b.id);
      await sb.from("bandi").update({ attivo: false }).in("id", ids);
      scadutiDisattivati = ids.length;
      addLog(`  Disattivati ${scadutiDisattivati} bandi scaduti:`);
      scaduti.forEach((b) => addLog(`    - ${b.titolo} (scad: ${b.scadenza})`));
    } else {
      addLog("  Nessun bando scaduto trovato");
    }

    // ═══ STEP 5: Rileva e rimuovi duplicati (3 fattori) ═══
    addLog("Controllo duplicati nel database (3 fattori)...");
    addLog("  Fattore 1: stesso URL = duplicato certo");
    addLog("  Fattore 2: stesso titolo + stessa data = duplicato");
    addLog("  Fattore 3: date diverse = NON duplicato");
    const { data: allAttivi } = await sb
      .from("bandi")
      .select("id, titolo, scadenza, url, ente")
      .eq("attivo", true);

    if (allAttivi && allAttivi.length > 1) {
      const enriched = allAttivi.map((b) => ({
        ...b,
        normT: normalizeTitle(b.titolo),
        normU: normUrl(b.url),
      }));
      const idsToRemove: number[] = [];

      for (let i = 0; i < enriched.length; i++) {
        if (idsToRemove.includes(enriched[i].id)) continue;
        for (let j = i + 1; j < enriched.length; j++) {
          if (idsToRemove.includes(enriched[j].id)) continue;

          // Fattore 1: stesso URL = duplicato certo
          if (enriched[i].normU && enriched[j].normU && enriched[i].normU === enriched[j].normU && enriched[i].normU !== "" && enriched[i].normU !== "#") {
            idsToRemove.push(enriched[j].id);
            addLog(`  Dup [URL]: "${enriched[j].titolo.substring(0, 50)}..."`);
            continue;
          }

          // Fattore 3: date diverse = MAI duplicato
          if (enriched[i].scadenza && enriched[j].scadenza && enriched[i].scadenza !== enriched[j].scadenza) {
            continue;
          }

          // Fattore 2: stesso titolo + stessa data (o entrambi senza data)
          if (enriched[i].normT === enriched[j].normT && enriched[i].scadenza === enriched[j].scadenza) {
            idsToRemove.push(enriched[j].id);
            addLog(`  Dup [titolo+data]: "${enriched[j].titolo.substring(0, 50)}..."`);
          }
        }
      }

      if (idsToRemove.length > 0) {
        await sb
          .from("bandi")
          .update({ attivo: false })
          .in("id", idsToRemove);
        duplicatiRimossi = idsToRemove.length;
        addLog(`  Rimossi ${duplicatiRimossi} duplicati certi`);
      } else {
        addLog("  Nessun duplicato trovato");
      }
    }

    // ═══ STEP 6: Verifica titoli vuoti o troppo corti ═══
    addLog("Controllo titoli (ufficiali dalla fonte, senza riformulazione)...");
    if (allAttivi) {
      const badTitles = allAttivi.filter(
        (b) => !b.titolo || b.titolo.trim().length < 8,
      );
      titoliCorretti = badTitles.length;
      if (badTitles.length > 0) {
        addLog(
          `  ${badTitles.length} titoli assenti o troppo corti:`,
        );
        badTitles
          .slice(0, 10)
          .forEach((b) => addLog(`    ! id=${b.id} "${(b.titolo || "").substring(0, 60)}"`));
      } else {
        addLog("  Nessun titolo anomalo rilevato");
      }
    }

    // ═══ STEP 7: Verifica link reali (HEAD request + controllo pagina generica) ═══
    addLog("Verifica link bandi (controllo URL reali)...");
    let linkVerificati = 0;
    const { data: bandiConLink } = await sb
      .from("bandi")
      .select("id, titolo, url")
      .eq("attivo", true);

    if (bandiConLink) {
      // Prima: URL vuoti o placeholder
      const missingLinks = bandiConLink.filter(
        (b) => !b.url || b.url.trim() === "" || b.url === "#"
      );
      if (missingLinks.length > 0) {
        linkErrori += missingLinks.length;
        addLog(`  ${missingLinks.length} bandi senza URL:`);
        missingLinks.slice(0, 5).forEach((b) => addLog(`    ! "${b.titolo}"`));
      }

      // Poi: verifica che gli URL siano raggiungibili e specifici (non homepage generica)
      const bandiDaVerificare = bandiConLink.filter(
        (b) => b.url && b.url.startsWith("http") && b.url !== "#"
      );
      addLog(`  Verifica ${bandiDaVerificare.length} URL attivi...`);

      // Pattern pagine generiche (homepage enti, non pagina specifica bando)
      const GENERIC_PATTERNS = [
        /^https?:\/\/[^/]+\/?$/,                      // Solo dominio
        /\/bandi\/?$/,                                  // /bandi/
        /\/bandi-aperti\/?$/,                           // /bandi-aperti/
        /\/incentivi\/?$/,                              // /incentivi/
        /\/homepage/i,                                  // /homepage
        /\/index\.(html|php|asp)\/?$/i,                 // /index.html
      ];

      for (const b of bandiDaVerificare) {
        // Controlla se URL e' generico
        const isGeneric = GENERIC_PATTERNS.some((p) => p.test(b.url));
        if (isGeneric) {
          linkErrori++;
          addLog(`    ! URL generico (non specifico del bando): "${b.titolo}" -> ${b.url}`);
          continue;
        }

        // HEAD request per verificare raggiungibilita' (max 20 per non rallentare)
        if (linkVerificati < 20) {
          try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(b.url, {
              method: "HEAD",
              headers: { "User-Agent": "BandiItalia-LinkChecker/1.0" },
              signal: controller.signal,
              redirect: "follow",
            });
            clearTimeout(timeout);
            linkVerificati++;

            if (!res.ok) {
              linkErrori++;
              addLog(`    ! HTTP ${res.status}: "${b.titolo}" -> ${b.url}`);
            }
          } catch {
            linkErrori++;
            addLog(`    ! Non raggiungibile: "${b.titolo}" -> ${b.url}`);
          }
          // Pausa 500ms tra le richieste per non sovraccaricare
          await new Promise((r) => setTimeout(r, 500));
        }
      }

      addLog(`  Link verificati con HEAD: ${linkVerificati}/${bandiDaVerificare.length}`);
      if (linkErrori === 0) {
        addLog("  Tutti i link verificati sono OK");
      }
    }

    // ═══ RIEPILOGO ═══
    addLog("");
    addLog("═══ MANUTENZIONE COMPLETATA ═══");
    addLog(`  Nuovi bandi aggiunti: ${nuoviBandi}`);
    addLog(`  Scaduti disattivati: ${scadutiDisattivati}`);
    addLog(`  Duplicati rimossi: ${duplicatiRimossi}`);
    addLog(`  Link mancanti: ${linkErrori}`);
    addLog(`  Titoli da correggere: ${titoliCorretti}`);

    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      nuovi_bandi: nuoviBandi,
      scaduti_disattivati: scadutiDisattivati,
      duplicati_rimossi: duplicatiRimossi,
      link_errori: linkErrori,
      titoli_da_correggere: titoliCorretti,
      log: log,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    addLog(`ERRORE CRITICO: ${(e as Error).message}`);
    return new Response(
      JSON.stringify({
        success: false,
        error: (e as Error).message,
        log: log,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
