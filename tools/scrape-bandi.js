#!/usr/bin/env node
/**
 * scrape-bandi.js — Scraping bandi da fonti ufficiali
 *
 * Fonti supportate:
 * - incentivi.gov.it (catalogo nazionale)
 * - invitalia.it
 * - mimit.gov.it
 * - contributieuropa.com (aggregatore)
 *
 * Uso: node tools/scrape-bandi.js [--dry-run] [--source=invitalia]
 * Output: Aggiorna data/bandi.json con nuovi bandi trovati
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'data', 'bandi.json');
const DRY_RUN = process.argv.includes('--dry-run');
const SKIP_VERIFY = process.argv.includes('--skip-verify');
const SOURCE_FILTER = process.argv.find(a => a.startsWith('--source='));

// Verifica link con Perplexity (opzionale, richiede API keys)
let verificaLinkBandi = null;
try {
  ({ verificaLinkBandi } = require('./verify-links-perplexity'));
} catch (e) {
  // Modulo non disponibile — la verifica verra' saltata
}

// ══════════ FONTI DI SCRAPING ══════════
const FONTI = [
  {
    id: 'incentivi_gov',
    nome: 'Incentivi.gov.it',
    url: 'https://www.incentivi.gov.it/it/api/incentivi?stato=attivo&limit=50',
    parser: parseIncentiviGov
  },
  {
    id: 'invitalia',
    nome: 'Invitalia',
    url: 'https://www.invitalia.it/incentivi-e-strumenti',
    parser: null // Richiede parsing HTML — placeholder
  },
  {
    id: 'mimit',
    nome: 'MIMIT',
    url: 'https://www.mimit.gov.it/it/incentivi',
    parser: null // Richiede parsing HTML — placeholder
  }
];

// ══════════ HTTP FETCH ══════════
function fetchURL(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const doFetch = (attempt) => {
      const parsedUrl = new URL(url);
      const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'GET',
        headers: {
          'User-Agent': 'BandiItalia-Scraper/1.0',
          'Accept': 'application/json, text/html'
        },
        timeout: 15000
      };

      const req = https.request(options, (res) => {
        // Segui redirect
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return doFetch(attempt); // seguirebbe il redirect
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ status: res.statusCode, body: data, headers: res.headers });
          } else if (attempt < retries) {
            const wait = Math.pow(2, attempt) * 1000;
            console.log(`    Retry ${attempt + 1}/${retries} tra ${wait / 1000}s (HTTP ${res.statusCode})`);
            setTimeout(() => doFetch(attempt + 1), wait);
          } else {
            reject(new Error(`HTTP ${res.statusCode} dopo ${retries} tentativi`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        if (attempt < retries) {
          setTimeout(() => doFetch(attempt + 1), Math.pow(2, attempt) * 1000);
        } else {
          reject(new Error('Timeout dopo ' + retries + ' tentativi'));
        }
      });

      req.on('error', (e) => {
        if (attempt < retries) {
          setTimeout(() => doFetch(attempt + 1), Math.pow(2, attempt) * 1000);
        } else {
          reject(e);
        }
      });

      req.end();
    };
    doFetch(0);
  });
}

// ══════════ PARSERS ══════════
function parseIncentiviGov(body) {
  try {
    const json = JSON.parse(body);
    const items = json.results || json.data || json.incentivi || [];
    return items.map(item => ({
      id: 'gov_' + (item.id || item.slug || Math.random().toString(36).substr(2, 8)),
      titolo: item.titolo || item.title || item.nome || 'Senza titolo',
      ente: item.ente_erogatore || item.ente || 'Governo Italiano',
      tipo_ente: 'ministero',
      regione: item.regione || 'Nazionale',
      provincia: null,
      url_bando: item.url || item.link || null,
      url_domanda: item.url_domanda || item.url || null,
      data_apertura: item.data_apertura || null,
      data_scadenza: item.data_scadenza || null,
      stato: item.stato === 'attivo' ? 'aperto' : (item.stato || 'aperto'),
      dotazione: item.dotazione || null,
      contributo_min: item.contributo_min || null,
      contributo_max: item.contributo_max || item.importo_max || null,
      percentuale: item.percentuale_contributo || null,
      tipo_contributo: item.tipo_contributo || 'misto',
      beneficiari: item.beneficiari || ['imprese'],
      settori: item.settori || ['tutti'],
      finalita: item.finalita || [],
      keywords: [],
      descrizione: item.descrizione || item.abstract || '',
      data_scraping: new Date().toISOString(),
      fonte_scraping: 'incentivi_gov'
    }));
  } catch (e) {
    console.log('    Parsing JSON fallito, potrebbe essere HTML');
    return [];
  }
}

// ══════════ MERGE LOGIC ══════════
function mergeBandi(existing, newBandi) {
  const existingIds = new Set(existing.map(b => b.id));
  const existingTitles = new Set(existing.map(b => b.titolo.toLowerCase()));
  let added = 0;

  for (const nb of newBandi) {
    // Evita duplicati per ID o titolo simile
    if (existingIds.has(nb.id)) continue;
    if (existingTitles.has(nb.titolo.toLowerCase())) continue;

    // Controlla somiglianza titolo
    const isDuplicate = existing.some(eb => {
      const sim = similarity(eb.titolo.toLowerCase(), nb.titolo.toLowerCase());
      return sim > 0.7;
    });
    if (isDuplicate) continue;

    existing.push(nb);
    existingIds.add(nb.id);
    existingTitles.add(nb.titolo.toLowerCase());
    added++;
    console.log(`    [NUOVO] ${nb.titolo}`);
  }

  return added;
}

function similarity(s1, s2) {
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;

  // Semplice Jaccard su parole
  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));
  const intersection = [...words1].filter(w => words2.has(w)).length;
  const union = new Set([...words1, ...words2]).size;
  return intersection / union;
}

// ══════════ MAIN ══════════
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  SCRAPE BANDI — BandiItalia');
  console.log('  ' + new Date().toISOString());
  if (DRY_RUN) console.log('  [DRY RUN - nessuna modifica]');
  console.log('═══════════════════════════════════════════\n');

  // Carica JSON esistente
  const fileData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const bandi = fileData.bandi;
  console.log(`Bandi esistenti: ${bandi.length}\n`);

  let totalNuovi = 0;

  for (const fonte of FONTI) {
    if (SOURCE_FILTER && !SOURCE_FILTER.includes(fonte.id)) continue;
    if (!fonte.parser) {
      console.log(`[${fonte.nome}] Parser non disponibile — skip`);
      console.log('  Fonte richiede parsing HTML, usare aggiornamento manuale\n');
      continue;
    }

    console.log(`[${fonte.nome}] Scraping da ${fonte.url}`);
    try {
      const response = await fetchURL(fonte.url);
      const nuoviBandi = fonte.parser(response.body);
      console.log(`  Trovati: ${nuoviBandi.length} bandi`);

      const aggiunti = mergeBandi(bandi, nuoviBandi);
      totalNuovi += aggiunti;
      console.log(`  Nuovi aggiunti: ${aggiunti}\n`);
    } catch (e) {
      console.log(`  ERRORE: ${e.message}`);
      console.log('  Fonte potrebbe non avere API JSON pubblica\n');
    }
  }

  // Aggiorna scadenze
  const oggi = new Date().toISOString().split('T')[0];
  let scaduti = 0;
  bandi.forEach(b => {
    if (b.data_scadenza && b.data_scadenza < oggi && b.stato !== 'chiuso') {
      b.stato = 'chiuso';
      scaduti++;
    }
  });

  // ══════════ VERIFICA LINK CON PERPLEXITY ══════════
  let linkVerificati = 0;
  let linkAggiornati = 0;
  const hasApiKeys = process.env.ANTHROPIC_API_KEY && process.env.PERPLEXITY_API_KEY;

  if (!SKIP_VERIFY && verificaLinkBandi && hasApiKeys) {
    console.log('\n── VERIFICA LINK (Claude + Perplexity) ──');
    try {
      const risultati = await verificaLinkBandi(bandi, {
        onlyNew: totalNuovi > 0, // Se ci sono nuovi bandi, verifica solo quelli
        maxBandi: totalNuovi > 0 ? totalNuovi : 10,
        verbose: true
      });
      linkVerificati = risultati.verificati;
      linkAggiornati = risultati.aggiornati;
    } catch (e) {
      console.log(`  Verifica link fallita: ${e.message}`);
      console.log('  Il processo continua senza verifica.\n');
    }
  } else if (!SKIP_VERIFY && !hasApiKeys) {
    console.log('\nVerifica link saltata (API keys non configurate)');
    console.log('  Configura ANTHROPIC_API_KEY e PERPLEXITY_API_KEY per abilitare\n');
  }

  // Salva
  if (!DRY_RUN) {
    fileData.metadata.generated_at = new Date().toISOString();
    fileData.metadata.total_bandi = bandi.length;
    if (linkVerificati > 0) {
      fileData.metadata.last_link_verification = new Date().toISOString();
    }
    fs.writeFileSync(JSON_PATH, JSON.stringify(fileData, null, 2), 'utf8');
    console.log('JSON aggiornato e salvato.');
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`  RISULTATO: +${totalNuovi} nuovi, ${scaduti} scaduti`);
  if (linkVerificati > 0) {
    console.log(`  Link verificati: ${linkVerificati}, aggiornati: ${linkAggiornati}`);
  }
  console.log(`  Totale bandi: ${bandi.length}`);
  console.log('═══════════════════════════════════════════\n');

  // Output per GitHub Actions
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `new_bandi=${totalNuovi}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `total_bandi=${bandi.length}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `expired_bandi=${scaduti}\n`);
  }
}

main().catch(e => {
  console.error('ERRORE FATALE:', e);
  process.exit(1);
});
