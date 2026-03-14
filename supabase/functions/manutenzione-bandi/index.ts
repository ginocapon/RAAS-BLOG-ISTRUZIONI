// Supabase Edge Function — Manutenzione completa bandi
// Deploy: supabase functions deploy manutenzione-bandi
// Env vars richieste: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (automatiche in Supabase)
//
// Ciclo completo:
// 1. Cerca nuovi bandi da incentivi.gov.it API
// 2. Deduplica contro DB esistente
// 3. Inserisce nuovi bandi
// 4. Disattiva bandi scaduti
// 5. Rimuove duplicati
// 6. Verifica formato titoli

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ══════════ FONTI BANDI ══════════
const FONTI = [
  {
    id: "incentivi_gov",
    nome: "Incentivi.gov.it",
    url: "https://www.incentivi.gov.it/it/api/incentivi?stato=attivo&limit=50",
  },
  {
    id: "incentivi_gov_2",
    nome: "Incentivi.gov.it (imprese)",
    url: "https://www.incentivi.gov.it/it/api/incentivi?beneficiari=imprese&stato=attivo&limit=30",
  },
];

// ══════════ FETCH CON RETRY ══════════
async function fetchWithRetry(
  url: string,
  retries = 3
): Promise<string | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "BandiItalia-Aggregator/2.0",
          Accept: "application/json, text/html",
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

// ══════════ PARSER INCENTIVI.GOV.IT ══════════
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
  settore: string;
  scadenza: string | null;
  link: string;
  attivo: boolean;
  fonte: string;
  data_inserimento: string;
}

function parseIncentiviGov(body: string, fonte: string): Bando[] {
  try {
    const json = JSON.parse(body);
    const items: BandoRaw[] =
      json.results || json.data || json.incentivi || [];
    return items.map((item) => {
      const titolo = item.titolo || item.title || item.nome || "Senza titolo";
      // Formato anti-plagio: "NomeBando — Descrizione Breve"
      const titoloFormattato = titolo.includes("—")
        ? titolo
        : titolo.includes(" - ")
          ? titolo.replace(" - ", " — ")
          : titolo;

      return {
        titolo: titoloFormattato,
        descrizione: item.descrizione || item.abstract || "",
        ente: item.ente_erogatore || item.ente || "Governo Italiano",
        regione: item.regione || "Nazionale",
        importo_max: item.contributo_max || item.importo_max || null,
        tipo_contributo: item.tipo_contributo || "misto",
        settore: Array.isArray(item.settori)
          ? item.settori[0] || "tutti"
          : "tutti",
        scadenza: item.data_scadenza || null,
        link: item.url || item.link || "#",
        attivo: true,
        fonte: fonte,
        data_inserimento: new Date().toISOString(),
      };
    });
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
      .select("id, titolo, scadenza, link, attivo");
    if (errEsistenti) throw new Error("Errore DB: " + errEsistenti.message);
    const bandiEsistenti = esistenti || [];
    addLog(`  ${bandiEsistenti.length} bandi totali nel database`);

    // ═══ STEP 2: Cerca nuovi bandi dalle fonti ═══
    addLog("Ricerca nuovi bandi dalle fonti ufficiali...");
    const tuttiBandiNuovi: Bando[] = [];

    for (const fonte of FONTI) {
      addLog(`  Interrogo ${fonte.nome}...`);
      const body = await fetchWithRetry(fonte.url);
      if (body) {
        const parsed = parseIncentiviGov(body, fonte.id);
        addLog(`    Trovati ${parsed.length} bandi da ${fonte.nome}`);
        tuttiBandiNuovi.push(...parsed);
      } else {
        addLog(`    Fonte non raggiungibile: ${fonte.nome}`);
      }
    }

    // ═══ STEP 3: Deduplica e inserisci nuovi ═══
    if (tuttiBandiNuovi.length > 0) {
      addLog("Deduplicazione e inserimento nuovi bandi...");
      const titoliEsistenti = bandiEsistenti.map((b) =>
        normalizeTitle(b.titolo)
      );

      const bandiDaInserire: Bando[] = [];
      for (const nb of tuttiBandiNuovi) {
        const normNuovo = normalizeTitle(nb.titolo);

        // Skip se titolo identico normalizzato
        if (titoliEsistenti.includes(normNuovo)) continue;

        // Skip se similarita' > 70%
        const isDuplicate = titoliEsistenti.some(
          (t) => similarity(t, normNuovo) > 0.7
        );
        if (isDuplicate) continue;

        // Skip link vuoti o placeholder
        if (!nb.link || nb.link === "#") continue;

        bandiDaInserire.push(nb);
        titoliEsistenti.push(normNuovo); // Evita duplicati interni
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

    // ═══ STEP 5: Rileva e rimuovi duplicati ═══
    addLog("Controllo duplicati nel database...");
    const { data: allAttivi } = await sb
      .from("bandi")
      .select("id, titolo")
      .eq("attivo", true);

    if (allAttivi && allAttivi.length > 1) {
      const norm = allAttivi.map((b) => ({
        ...b,
        norm: normalizeTitle(b.titolo),
      }));
      const idsToRemove: number[] = [];

      for (let i = 0; i < norm.length; i++) {
        if (idsToRemove.includes(norm[i].id)) continue;
        for (let j = i + 1; j < norm.length; j++) {
          if (idsToRemove.includes(norm[j].id)) continue;
          if (
            norm[i].norm === norm[j].norm ||
            similarity(norm[i].norm, norm[j].norm) > 0.85
          ) {
            // Rimuovi il secondo (il piu' recente, cioe' il duplicato)
            idsToRemove.push(norm[j].id);
            addLog(
              `  Duplicato trovato: "${norm[j].titolo}" (simile a "${norm[i].titolo}")`
            );
          }
        }
      }

      if (idsToRemove.length > 0) {
        await sb
          .from("bandi")
          .update({ attivo: false })
          .in("id", idsToRemove);
        duplicatiRimossi = idsToRemove.length;
        addLog(`  Disattivati ${duplicatiRimossi} bandi duplicati`);
      } else {
        addLog("  Nessun duplicato trovato");
      }
    }

    // ═══ STEP 6: Verifica formato titoli ═══
    addLog("Controllo formato titoli anti-plagio...");
    if (allAttivi) {
      const badTitles = allAttivi.filter(
        (b) => !b.titolo.includes("—") && !b.titolo.includes(" - ")
      );
      titoliCorretti = badTitles.length;
      if (badTitles.length > 0) {
        addLog(
          `  ${badTitles.length} titoli senza formato anti-plagio (NomeBando — Descrizione):`
        );
        badTitles
          .slice(0, 10)
          .forEach((b) => addLog(`    ! "${b.titolo}"`));
      } else {
        addLog("  Tutti i titoli rispettano il formato anti-plagio");
      }
    }

    // ═══ STEP 7: Verifica link vuoti ═══
    addLog("Controllo link bandi...");
    const { data: noLink } = await sb
      .from("bandi")
      .select("id, titolo, link")
      .eq("attivo", true);

    if (noLink) {
      const missingLinks = noLink.filter(
        (b) => !b.link || b.link.trim() === "" || b.link === "#"
      );
      linkErrori = missingLinks.length;
      if (missingLinks.length > 0) {
        addLog(`  ${linkErrori} bandi senza link valido:`);
        missingLinks
          .slice(0, 10)
          .forEach((b) => addLog(`    ! "${b.titolo}"`));
      } else {
        addLog("  Tutti i bandi hanno un link valido");
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
