#!/usr/bin/env node
/**
 * Scrive data/bandi-live-stats.json con conteggio bandi attivi e fonti distinte,
 * leggendo Supabase via REST (chiave anon). Stesso dominio del sito → niente blocco
 * cross-origin in Firefox / tracker blocking.
 *
 * Uso: node tools/write-bandi-live-stats.js
 * Env: SUPABASE_URL, SUPABASE_ANON_KEY (opzionali — default come altri tool)
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'data', 'bandi-live-stats.json');
const SUPABASE_URL =
  process.env.SUPABASE_URL || 'https://ieeriszlalrsbfsnarih.supabase.co';
const ANON =
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZXJpc3psYWxyc2Jmc25hcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNjEyNjAsImV4cCI6MjA4MzczNzI2MH0.Sjwu1620mMTAAoKVHgXHQ1cA-m3hFXqtCtqjAQNErQo';

function parseTotalFromRange(cr) {
  if (!cr) return null;
  const parts = String(cr).split('/');
  if (parts.length !== 2) return null;
  const n = parseInt(parts[1], 10);
  return Number.isFinite(n) ? n : null;
}

async function fetchPage(pathWithQuery, withCountExact) {
  const u = new URL(pathWithQuery, SUPABASE_URL);
  const headers = {
    apikey: ANON,
    Authorization: 'Bearer ' + ANON,
    Accept: 'application/json',
  };
  if (withCountExact) headers.Prefer = 'count=exact';
  const r = await fetch(u, { headers });
  const text = await r.text();
  if (!r.ok) throw new Error(`HTTP ${r.status}: ${text.slice(0, 300)}`);
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new Error('JSON: ' + e.message);
  }
  return {
    json: data,
    contentRange: r.headers.get('content-range') || '',
  };
}

async function main() {
  const base = '/rest/v1/bandi';
  const qCount =
    base +
    '?select=id&attivo=eq.true&limit=1&offset=0';
  const first = await fetchPage(qCount, true);
  const attiviCount = parseTotalFromRange(first.contentRange);
  if (attiviCount == null || attiviCount < 0) {
    throw new Error('Content-Range non valido: ' + first.contentRange);
  }

  const fonti = new Set();
  let offset = 0;
  const page = 1000;
  while (true) {
    const q =
      base +
      '?select=fonte&attivo=eq.true&limit=' +
      page +
      '&offset=' +
      offset;
    const { json } = await fetchPage(q, false);
    if (!Array.isArray(json) || json.length === 0) break;
    for (const row of json) {
      const f = row.fonte;
      if (f != null && String(f).trim()) fonti.add(String(f).trim());
    }
    if (json.length < page) break;
    offset += page;
  }

  const payload = {
    version: 1,
    generated_at: new Date().toISOString(),
    attivi_count: attiviCount,
    fonti_distinte: fonti.size,
  };

  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log('Scritto', OUT, payload);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
