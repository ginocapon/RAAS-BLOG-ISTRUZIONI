#!/usr/bin/env node
/**
 * Calcola termini e bigrammi ricorrenti dai bandi (per regione e tipo_ente) e scrive un JSON statico
 * per suggerimenti ricerca su bandi.html. Nessun modello ML — solo frequenze su testo.
 *
 * Fonti dati (prima che vince):
 *   --source=auto     (default) prova Supabase REST con anon key, se fallisce usa data/bandi.json
 *   --source=supabase solo Supabase (attivo=true)
 *   --source=json     solo file locale
 *
 * Env (opzionale): SUPABASE_URL, SUPABASE_ANON_KEY — altrimenti stessi default di validate-bandi-supabase.js
 *
 * Uso:
 *   node tools/build-bandi-keyword-stats.js
 *   node tools/build-bandi-keyword-stats.js --out=data/bandi-keyword-stats.json --top=50
 *
 * Eseguibile anche in CI (GitHub Actions) con secret anon: genera file committabile o artifact.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEFAULT_JSON = path.join(ROOT, 'data', 'bandi.json');
const DEFAULT_OUT = path.join(ROOT, 'data', 'bandi-keyword-stats.json');

const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://ieeriszlalrsbfsnarih.supabase.co';
const PUBLIC_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZXJpc3psYWxyc2Jmc25hcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNjEyNjAsImV4cCI6MjA4MzczNzI2MH0.Sjwu1620mMTAAoKVHgXHQ1cA-m3hFXqtCtqjAQNErQo';

function getKey() {
  return (
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    PUBLIC_ANON
  );
}

const STOP = new Set(
  `a ad al allo ai agli alla alle anche avere essere stato stati stata state
  il lo la i gli le un una uno un di da in con su per tra fra come cosa questo questa
  quello quella chi che cui quale quali dove quando mentre non ne più meno molto molta
  tutti tutte tutto tutta ogni sia sono era erano essere stato fare fatto dall dall del
  degli delle dei dello dei degli delle dell nell sul sulle sui verso tra fra solo sola
  solo proprio propria alcuni alcune altro altra altri altre essere stato essere
  bando bandi avviso misura contributo finanziamento incentivo agevolazione programma
  imprese impresa pmi delle degli delle dell dello dalla dalle dai dagli national
  italia italiana italiane regione regionali nazionale nazionali ente enti sono stato
  stato stata stati state essere per il la le lo gli una uno un del della dei delle
  all alle ai agli dal dalla dallo dagli nel nella negli nei sul sulla sui sulle
  tra fra o e ed è si se ne mi ti ci vi lo gli ha ho hai hanno possono deve devono
  solo anche già ancora qui qua così come cosi puo può potere fino euro`.split(
    /\s+/
  ).filter(Boolean)
);

function argVal(name, def) {
  const a = process.argv.find((x) => x.startsWith(name + '='));
  if (!a) return def;
  return a.slice(name.length + 1).trim() || def;
}

const SOURCE = argVal('--source', 'auto');
const OUT = path.resolve(ROOT, argVal('--out', 'data/bandi-keyword-stats.json'));
const TOP_PER_BUCKET = Math.max(10, parseInt(argVal('--top', '45'), 10) || 45);
const TOP_GLOBAL = Math.max(20, parseInt(argVal('--top-global', '80'), 10) || 80);

function restGet(pathAndQuery, apiKey) {
  return new Promise((resolve, reject) => {
    const u = new URL(pathAndQuery, SUPABASE_URL);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'GET',
      headers: {
        apikey: apiKey,
        Authorization: 'Bearer ' + apiKey,
        Accept: 'application/json',
      },
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('JSON parse: ' + e.message));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 400)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
    req.end();
  });
}

function normalizeSettoreField(b) {
  if (Array.isArray(b.settori)) {
    return b.settori.filter(Boolean).join(' ');
  }
  if (typeof b.settori === 'string' && b.settori.trim()) {
    return b.settori.trim();
  }
  return typeof b.settore === 'string' ? b.settore : '';
}

async function fetchAllFromSupabase(apiKey) {
  // Colonna reale su public.bandi: settori (json/array); "settore" non esiste → HTTP 400 se richiesto in select.
  const cols =
    'titolo,descrizione,ente,regione,tipo_ente,settori,tipo_contributo,attivo,stato';
  const all = [];
  let offset = 0;
  const pageSize = 1000;
  while (true) {
    const rows = await restGet(
      `/rest/v1/bandi?select=${encodeURIComponent(cols)}&attivo=eq.true&order=id.asc&limit=${pageSize}&offset=${offset}`,
      apiKey
    );
    if (!rows.length) break;
    for (const r of rows) {
      all.push({
        ...r,
        settore: normalizeSettoreField(r),
      });
    }
    if (rows.length < pageSize) break;
    offset += pageSize;
  }
  return all;
}

function loadLocalJson() {
  const raw = fs.readFileSync(DEFAULT_JSON, 'utf8');
  const data = JSON.parse(raw);
  const bandi = data.bandi || [];
  return bandi
    .filter((b) => b.stato === 'aperto' || b.stato === 'in_arrivo')
    .map((b) => ({
      titolo: b.titolo,
      descrizione: b.descrizione,
      ente: b.ente,
      regione: b.regione,
      tipo_ente: b.tipo_ente,
      settore: Array.isArray(b.settori) ? b.settori.join(' ') : b.settore,
      tipo_contributo: b.tipo_contributo,
      keywords: b.keywords,
    }));
}

function normalizeWord(w) {
  return w
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function wordsFromString(s) {
  if (!s || typeof s !== 'string') return [];
  return s
    .toLowerCase()
    .replace(/['']/g, ' ')
    .split(/[^a-zàèéìòù0-9]+/i)
    .map(normalizeWord)
    .filter((w) => w.length >= 4 && !STOP.has(w) && !/^\d+$/.test(w));
}

function textBlob(b) {
  const parts = [
    b.titolo,
    b.descrizione,
    b.settore,
    b.ente,
    b.tipo_contributo,
    b.regione,
  ].filter(Boolean);
  if (b.keywords) {
    if (Array.isArray(b.keywords)) parts.push(...b.keywords.map(String));
    else parts.push(String(b.keywords));
  }
  return parts.join(' ').slice(0, 2500);
}

function titoloWords(b) {
  return wordsFromString(b.titolo || '');
}

function addCounts(map, tokens) {
  for (const t of tokens) {
    if (!t || t.length < 4) continue;
    map.set(t, (map.get(t) || 0) + 1);
  }
}

function addBigrams(map, tokens) {
  for (let i = 0; i < tokens.length - 1; i++) {
    const a = tokens[i];
    const b = tokens[i + 1];
    if (a.length < 3 || b.length < 3) continue;
    const bg = `${a} ${b}`;
    if (bg.length > 40) continue;
    map.set(bg, (map.get(bg) || 0) + 1);
  }
}

function topFromMap(map, n) {
  return [...map.entries()]
    .sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0]))
    .slice(0, n)
    .map(([term, count]) => ({ term, count }));
}

function accumulateBandi(bandi) {
  const global = new Map();
  const byRegione = new Map();
  const byTipoEnte = new Map();

  for (const b of bandi) {
    const blob = textBlob(b);
    const tokens = wordsFromString(blob);
    const titTok = titoloWords(b);

    addCounts(global, tokens);
    addBigrams(global, titTok);

    const reg = (b.regione && String(b.regione).trim()) || 'Nazionale';
    const tipo = (b.tipo_ente && String(b.tipo_ente).trim()) || 'altro';

    if (!byRegione.has(reg)) byRegione.set(reg, new Map());
    if (!byTipoEnte.has(tipo)) byTipoEnte.set(tipo, new Map());

    addCounts(byRegione.get(reg), tokens);
    addBigrams(byRegione.get(reg), titTok);
    addCounts(byTipoEnte.get(tipo), tokens);
    addBigrams(byTipoEnte.get(tipo), titTok);
  }

  const outReg = {};
  for (const [k, m] of byRegione) {
    outReg[k] = topFromMap(m, TOP_PER_BUCKET);
  }
  const outTipo = {};
  for (const [k, m] of byTipoEnte) {
    outTipo[k] = topFromMap(m, TOP_PER_BUCKET);
  }

  return {
    global: topFromMap(global, TOP_GLOBAL),
    by_regione: outReg,
    by_tipo_ente: outTipo,
  };
}

function writeOutput(payload) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log('Scritto', OUT, '— bandi:', payload.record_count, 'fonte:', payload.source);
}

async function main() {
  let bandi = [];
  let source = 'local_json';

  if (SOURCE === 'json') {
    bandi = loadLocalJson();
  } else if (SOURCE === 'supabase') {
    bandi = await fetchAllFromSupabase(getKey());
    source = 'supabase';
  } else {
    try {
      bandi = await fetchAllFromSupabase(getKey());
      source = 'supabase';
    } catch (e) {
      console.warn('Supabase non disponibile, uso data/bandi.json:', e.message || e);
      bandi = loadLocalJson();
      source = 'local_json';
    }
  }

  const { global, by_regione, by_tipo_ente } = accumulateBandi(bandi);

  const payload = {
    version: 1,
    generated_at: new Date().toISOString(),
    source,
    record_count: bandi.length,
    top_per_bucket: TOP_PER_BUCKET,
    top_global: TOP_GLOBAL,
    global,
    by_regione,
    by_tipo_ente,
  };

  writeOutput(payload);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
