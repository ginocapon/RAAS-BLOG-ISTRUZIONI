#!/usr/bin/env node
/**
 * verify-links-perplexity.js — Verifica URL bandi con Claude + Perplexity
 *
 * Usa un orchestratore Claude → Perplexity per verificare che ogni bando
 * abbia il link ufficiale corretto. Riduce errori tra titolo bando e URL fonte.
 *
 * Richiede:
 * - ANTHROPIC_API_KEY (Claude API)
 * - PERPLEXITY_API_KEY (Perplexity sonar-pro)
 *
 * Uso standalone: node tools/verify-links-perplexity.js [--dry-run]
 * Uso come modulo: const { verificaLinkBandi } = require('./verify-links-perplexity');
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'data', 'bandi.json');
const DRY_RUN = process.argv.includes('--dry-run');
const MAX_TOOL_ITERATIONS = 5;

// ══════════ PERPLEXITY API ══════════
function queryPerplexity(query) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) return reject(new Error('PERPLEXITY_API_KEY non configurata'));

    const payload = JSON.stringify({
      model: 'sonar-pro',
      messages: [
        {
          role: 'system',
          content: 'Sei un assistente specializzato nella ricerca di bandi e incentivi pubblici italiani. Rispondi sempre con URL ufficiali verificati e citazioni precise.'
        },
        { role: 'user', content: query }
      ],
      return_citations: true,
      max_tokens: 1024
    });

    const options = {
      hostname: 'api.perplexity.ai',
      path: '/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const content = json.choices?.[0]?.message?.content || '';
            const citations = json.citations || [];
            resolve({ content, citations });
          } else {
            reject(new Error(`Perplexity API ${res.statusCode}: ${json.error?.message || data}`));
          }
        } catch (e) {
          reject(new Error('Perplexity risposta non valida: ' + e.message));
        }
      });
    });

    req.on('timeout', () => { req.destroy(); reject(new Error('Perplexity timeout')); });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ══════════ CLAUDE API (con tool use) ══════════
function callClaude(messages, tools) {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) return reject(new Error('ANTHROPIC_API_KEY non configurata'));

    const payload = JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      system: `Sei un verificatore di link per bandi pubblici italiani. Il tuo compito e' trovare il link ufficiale corretto per ogni bando.

Regole:
1. Usa lo strumento cerca_informazioni per cercare il bando su internet
2. Confronta il titolo del bando con i risultati trovati
3. Restituisci SOLO link da domini ufficiali (.gov.it, .europa.eu, invitalia.it, simest.it, sace.it, ecc.)
4. Se non trovi un link affidabile, rispondi con "NON_VERIFICATO"
5. Preferisci sempre la pagina specifica del bando, non la homepage del sito`,
      messages,
      tools
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 60000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(`Claude API ${res.statusCode}: ${json.error?.message || data}`));
          }
        } catch (e) {
          reject(new Error('Claude risposta non valida: ' + e.message));
        }
      });
    });

    req.on('timeout', () => { req.destroy(); reject(new Error('Claude timeout')); });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ══════════ ORCHESTRATORE CLAUDE + PERPLEXITY ══════════
async function verificaLink(bando) {
  const tools = [
    {
      name: 'cerca_informazioni',
      description: 'Cerca informazioni aggiornate su internet usando Perplexity AI. Usa per trovare link ufficiali di bandi, incentivi, agevolazioni.',
      input_schema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'La query di ricerca. Includi il nome esatto del bando e l\'ente erogatore.'
          }
        },
        required: ['query']
      }
    }
  ];

  const messages = [
    {
      role: 'user',
      content: `Trova il link ufficiale corretto per questo bando:

Titolo: ${bando.titolo}
Ente: ${bando.ente || 'Non specificato'}
Link attuale: ${bando.url_bando || 'Nessuno'}
Descrizione: ${bando.descrizione || 'Non disponibile'}

Cerca il link ufficiale della pagina specifica del bando (non la homepage dell'ente).
Rispondi con il formato:
URL_VERIFICATO: <url>
oppure
NON_VERIFICATO: <motivo>`
    }
  ];

  let iterations = 0;

  while (iterations < MAX_TOOL_ITERATIONS) {
    iterations++;
    const response = await callClaude(messages, tools);

    // Controlla se Claude vuole usare un tool
    const toolUseBlocks = (response.content || []).filter(b => b.type === 'tool_use');
    const textBlocks = (response.content || []).filter(b => b.type === 'text');

    if (response.stop_reason === 'end_turn' || toolUseBlocks.length === 0) {
      // Risposta finale
      const testo = textBlocks.map(b => b.text).join('\n');
      return parseRisultato(testo, bando);
    }

    // Esegui le chiamate Perplexity
    const toolResults = [];
    for (const toolBlock of toolUseBlocks) {
      if (toolBlock.name === 'cerca_informazioni') {
        try {
          const result = await queryPerplexity(toolBlock.input.query);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolBlock.id,
            content: `Risultato ricerca:\n${result.content}\n\nFonti:\n${result.citations.map((c, i) => `[${i + 1}] ${c}`).join('\n')}`
          });
        } catch (e) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolBlock.id,
            content: `Errore nella ricerca: ${e.message}`,
            is_error: true
          });
        }
      }
    }

    // Aggiungi la risposta dell'assistente e i risultati dei tool
    messages.push({ role: 'assistant', content: response.content });
    messages.push({ role: 'user', content: toolResults });
  }

  return { verificato: false, url: bando.url_bando, motivo: 'Troppe iterazioni' };
}

function parseRisultato(testo, bando) {
  const urlMatch = testo.match(/URL_VERIFICATO:\s*(https?:\/\/[^\s]+)/i);
  if (urlMatch) {
    return {
      verificato: true,
      url: urlMatch[1].replace(/[.,;)>]+$/, ''), // Rimuovi punteggiatura finale
      motivo: 'Verificato tramite Perplexity'
    };
  }

  const nonMatch = testo.match(/NON_VERIFICATO:\s*(.+)/i);
  if (nonMatch) {
    return {
      verificato: false,
      url: bando.url_bando,
      motivo: nonMatch[1].trim()
    };
  }

  // Cerca URL nel testo come fallback
  const anyUrl = testo.match(/https?:\/\/[^\s"'<>]+\.gov\.it[^\s"'<>]*/i)
    || testo.match(/https?:\/\/[^\s"'<>]+invitalia\.it[^\s"'<>]*/i)
    || testo.match(/https?:\/\/[^\s"'<>]+\.europa\.eu[^\s"'<>]*/i);

  if (anyUrl) {
    return {
      verificato: true,
      url: anyUrl[0].replace(/[.,;)>]+$/, ''),
      motivo: 'URL estratto dalla risposta'
    };
  }

  return { verificato: false, url: bando.url_bando, motivo: 'Risposta non interpretabile' };
}

// ══════════ VERIFICA BATCH ══════════
async function verificaLinkBandi(bandi, options = {}) {
  const { onlyNew = false, maxBandi = 10, verbose = true } = options;
  const risultati = { verificati: 0, nonVerificati: 0, aggiornati: 0, errori: 0 };

  // Filtra bandi da verificare
  let daVerificare = bandi;
  if (onlyNew) {
    daVerificare = bandi.filter(b => !b.link_verificato);
  }
  daVerificare = daVerificare.slice(0, maxBandi);

  if (verbose) {
    console.log(`\n  Verifica link per ${daVerificare.length} bandi (max ${maxBandi})...`);
  }

  for (const bando of daVerificare) {
    try {
      if (verbose) console.log(`\n  [VERIFICA] ${bando.titolo.substring(0, 60)}...`);

      const result = await verificaLink(bando);

      if (result.verificato) {
        risultati.verificati++;
        if (result.url !== bando.url_bando) {
          if (verbose) {
            console.log(`    AGGIORNATO: ${bando.url_bando || '(vuoto)'}`);
            console.log(`            -> ${result.url}`);
          }
          bando.url_bando = result.url;
          bando.url_domanda = bando.url_domanda || result.url;
          risultati.aggiornati++;
        } else {
          if (verbose) console.log(`    OK: link confermato`);
        }
        bando.link_verificato = true;
        bando.data_verifica = new Date().toISOString();
      } else {
        risultati.nonVerificati++;
        if (verbose) console.log(`    NON VERIFICATO: ${result.motivo}`);
        bando.link_verificato = false;
      }

      // Rate limiting: 1 secondo tra le richieste
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      risultati.errori++;
      if (verbose) console.log(`    ERRORE: ${e.message}`);
    }
  }

  return risultati;
}

// ══════════ MAIN (standalone) ══════════
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  VERIFICA LINK BANDI — Perplexity + Claude');
  console.log('  ' + new Date().toISOString());
  if (DRY_RUN) console.log('  [DRY RUN - nessuna modifica]');
  console.log('═══════════════════════════════════════════');

  if (!process.env.ANTHROPIC_API_KEY || !process.env.PERPLEXITY_API_KEY) {
    console.error('\n  ERRORE: Servono ANTHROPIC_API_KEY e PERPLEXITY_API_KEY');
    console.error('  Esempio: ANTHROPIC_API_KEY=sk-... PERPLEXITY_API_KEY=pplx-... node tools/verify-links-perplexity.js');
    process.exit(1);
  }

  const fileData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const bandi = fileData.bandi;
  console.log(`\n  Bandi totali: ${bandi.length}`);

  const risultati = await verificaLinkBandi(bandi, {
    onlyNew: false,
    maxBandi: 15,
    verbose: true
  });

  if (!DRY_RUN) {
    fileData.metadata.last_link_verification = new Date().toISOString();
    fs.writeFileSync(JSON_PATH, JSON.stringify(fileData, null, 2), 'utf8');
    console.log('\n  JSON aggiornato e salvato.');
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(`  RISULTATO VERIFICA:`);
  console.log(`    Verificati: ${risultati.verificati}`);
  console.log(`    Aggiornati: ${risultati.aggiornati}`);
  console.log(`    Non verificati: ${risultati.nonVerificati}`);
  console.log(`    Errori: ${risultati.errori}`);
  console.log('═══════════════════════════════════════════\n');

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `verified_links=${risultati.verificati}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `updated_links=${risultati.aggiornati}\n`);
  }
}

// Esporta per uso come modulo
module.exports = { verificaLinkBandi, verificaLink, queryPerplexity };

// Esegui se chiamato direttamente
if (require.main === module) {
  main().catch(e => {
    console.error('ERRORE FATALE:', e);
    process.exit(1);
  });
}
