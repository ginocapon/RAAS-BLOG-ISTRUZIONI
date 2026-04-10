---
name: bandi-nuove-fonti
description: >-
  Estende e verifica le fonti bandi (array FONTI, ingest Supabase, conteggi hero).
  Usa quando l'utente chiede nuove fonti, allargare il monitoraggio, validare il numero
  "fonti" sul sito, loop di discovery, keyword per regione/ente, o deploy della Edge Function manutenzione-bandi.
---

# Skill — Nuove fonti bandi e conteggio

## Il numero sul sito è corretto?

- **Fonti nel dataset (es. 65)** = valori **distinti** della colonna `fonte` su `public.bandi` con `attivo = true`. È scritto in `data/bandi-live-stats.json` (`fonti_distinte`) e rigenerato a ogni deploy da `tools/write-bandi-live-stats.js`.
- **Endpoint configurati** = lunghezza dell’array `FONTI` in `supabase/functions/manutenzione-bandi/index.ts` (verificare con il comando sotto). In condizioni normali **DB distinti ≈ endpoint** (ogni riga ingest usa `fonte: fonte.id`).
- Verifica rapida in repo:
  - `grep -c '{ id:' supabase/functions/manutenzione-bandi/index.ts` (blocco `FONTI`)
  - `npm run write-bandi-live-stats` poi leggere `data/bandi-live-stats.json`.

Se `fonti_distinte` < numero di voci in `FONTI`, alcuni endpoint non producono bandi o usano `fonte` diversa da `fonte.id` (anomalia da correggere nel parser).

## Schema di lavoro (come discusso: keyword → ricerca → dedup)

1. **Corpus** — Da DB o da `data/bandi.json`: estrarre termini ricorrenti (titolo, descrizione, keywords, settore). Script: `npm run build-bandi-keywords` → `data/bandi-keyword-stats.json` (`by_regione`, `by_tipo_ente`, `global`).
2. **Discovery** — Per ogni regione/ente sotto-rappresentato, cercare **nuovi portali ufficiali** (.gov.it, regione.*, camcom.it, incentivi.gov.it) che pubblicano avvisi. **Non** inventare URL: solo fonti verificabili.
3. **Implementazione** — Aggiungere una voce in `FONTI` con `id`, `nome`, `url`, `tipo` (`json`|`html`|`csv`|`rss`), `regione`, `ente`, `tipo_ente`. **`tipo_ente` deve coincidere con i valori del filtro su `bandi.html`** (`ministero`, `ente_nazionale`, `regione`, `cciaa`, `ue`, `altro`). Dettaglio campi e macro “Sud Italia”: `tools/BANDI-RICERCA-FONTI-KEYWORDS.md` (sotto “Verifica delle fonti”, allineamento filtri). Seguire i parser in `index.ts` (`parseHtml`, `parseIncentiviGov`, …).
4. **Deduplica** — Stesso URL normalizzato o stesso titolo+scadenza → logica già in manutenzione admin; dopo ingest verificare duplicati in dashboard.
5. **Deploy** — `supabase functions deploy manutenzione-bandi` (o pipeline del team). Poi eseguire manutenzione da admin o cron.
6. **Aggiorna conteggi statici** — `npm run write-bandi-live-stats` e commit se si aggiorna il file per il sito; il deploy CI lo rigenera comunque.

## “10 loop” e autorigenerazione

L’agente **non** può eseguire da solo 10 cicli continui di crawling sul web senza che tu (o la CI) lanciate comandi o sessioni. Per automatizzare:

| Obiettivo | Cosa serve |
|-----------|------------|
| Ripetere ingest | Pulsante **Manutenzione** in `admin.html` o chiamata HTTP alla Edge Function con auth di progetto |
| Batch verifica link | `bash tools/run-validate-bandi-supabase-batches.sh` |
| Batch coerenza titoli | `bash tools/run-audit-coherence-bandi-supabase-batches.sh` |
| Loop shell (es. 10 giri) | `for i in $(seq 1 10); do node tools/…; sleep 60; done` (solo dove ha senso, rispettando rate limit) |
| Aggiornare solo i contatori | `npm run write-bandi-live-stats` |
| Keyword per suggerimenti UI | `npm run build-bandi-keywords` |

Chiedi all’agente: *“Applica la skill bandi-nuove-fonti: aggiungi FONTI per [regione X] con URL verificati”* — un turno = una o più voci + review, non dieci crawl notturni autonomi.

## Comandi di riferimento (copiabili)

```bash
# Conteggi DB → JSON per il sito (stesso dominio)
npm run write-bandi-live-stats

# Keyword da corpus (Supabase o JSON locale)
npm run build-bandi-keywords

# Lettura anon pubblica
npm run verify-bandi-public-read

# Quante fonti in codice
sed -n '41,120p' supabase/functions/manutenzione-bandi/index.ts | grep -c '{ id:'
```

## Ricerca fonti, keyword e verifica (lettura consigliata)

- **`tools/BANDI-RICERCA-FONTI-KEYWORDS.md`** — verifica ufficialità, template keyword per Regione/Provincia/Comune/nazionale, strategie, monitoraggio, checklist UE/IT, link a incentivi.gov.it / MIMIT / Funding & Tenders.

## File chiave

- `supabase/functions/manutenzione-bandi/index.ts` — array `FONTI`, parser, dedup.
- `tools/write-bandi-live-stats.js` — `attivi_count`, `fonti_distinte`.
- `tools/build-bandi-keyword-stats.js` — statistiche per suggerimenti / priorità discovery.
- `tools/PROMPT-AGENT-BANDI-SUPABASE.txt` — prompt operativo completo.
- `.cursor/rules/bandi-supabase.mdc` — schema URL, RLS, audit.

## Etica

Nessun URL o ente inventato. Se non verificabile: segnare **NON VERIFICABILE** e non inserire in `FONTI`.
