# CLAUDE.md — RaaS Automazioni

## Istruzione Primaria
**USA sempre `context-map.json` per sapere quale skill caricare.**
Carica SOLO i file necessari per il task — vedi tabella sotto.

| Task | File da caricare |
|---|---|
| Qualsiasi operazione | `skill-essentials.md` (SEMPRE) |
| Nuova pagina / SEO / audit | + `skill-seo.md` |
| Articolo blog / contenuti | + `skill-content.md` |
| Architettura / business / bandi | + `skill-context.md` |

`SKILL.md` = file master originale (riferimento completo se necessario).

## Regole Automatiche

### Prima di ogni modifica:
1. Leggi il file da modificare — mai al buio
2. Verifica coerenza con SKILL.md (prezzi, claim, struttura)
3. Mobile-first — ogni modifica deve funzionare su mobile

### Codice:
- Solo HTML/CSS/JS vanilla — zero framework, zero librerie esterne
- No `filter: blur` su animazioni — solo `opacity` e `transform`
- No `will-change` permanente (solo su `:hover`)
- CTA contrasto minimo 4.5:1 (WCAG AA)
- TUTTE le `<img>` con `width` + `height` espliciti (prevenzione CLS)
- `og:image` obbligatorio su ogni pagina
- Skip navigation link + `*:focus-visible` su ogni pagina
- Font-Awesome e CSS non critici in defer con media swap
- `<link rel="preconnect">` per tutti i domini esterni
- Animazioni hero con `animation-play-state: paused` (attivare dopo render)
- Regole complete in `skill-seo.md` (performance, CWV, visual saliency)

### Contenuti Blog:
- Seguire template e checklist in `skill-content.md`
- 2500+ parole, 15+ H2/H3, 35% transition words
- OGNI dato numerico DEVE avere fonte verificata
- Zero claim inventati, zero dialetto, tono B2B professionale
- Prezzi: Base 399€/anno, E-commerce 599€/anno + 3% commissione performance (bloccati)

### Dopo ogni modifica:
- Aggiornare sitemap.xml se pagine aggiunte/rimosse
- Commit in italiano, descrittivo
- Verificare checklist in `skill-essentials.md` §5-6

### Cronolog Audit Automatico:
- **Ogni venerdi ore 07:00 CET** — audit automatico
- GitHub Actions workflow `.github/workflows/weekly-audit.yml`
- Rapporto creato come GitHub Issue con label `audit-settimanale`
- Il rapporto include anche **validazione link** su `data/bandi.json` (`url_bando`) tramite `tools/validate-bandi-links-free.js`
- **Bandi Supabase (PostgreSQL):** colonna URL canonica **`url`** su `public.bandi` (vedi `.cursor/rules/bandi-supabase.mdc`); prompt operativo in `tools/PROMPT-AGENT-BANDI-SUPABASE.txt`; nuove fonti / conteggi: skill `.cursor/skills/bandi-nuove-fonti/SKILL.md` e task `nuove-fonti-bandi` in `context-map.json`
- **Bonifica link aggregatore (es. europainnovazione.com):** in pubblicazione solo URL istituzionali. Esecuzione locale con `export SUPABASE_SERVICE_ROLE_KEY=…` poi `bash tools/run-resolve-europainnovazione.sh` (batch da 100, sostituisce o disattiva); residui: `tools/sql/deactivate-europainnovazione-remaining.sql`. Dettaglio: skill `bandi-nuove-fonti`, sezione «Pulizia europainnovazione».
- Autorizzazione **permanente** — attivo fino a revoca esplicita
- Riferimento regole: `skill-seo.md` (19 controlli automatizzati) + sezione bandi sopra

### Pubblicazione:
- Regola d'oro: "Se non hai fonte verificabile, NON inserire il dato"
- Sostituire TUTTI i placeholder [DATO], [COMPETITOR], [FONTE] prima di pubblicare

### Dopo rimozione di directory indicizzate (es. `/playzone/`)
1. **Google Search Console** (proprietà `https://www.raasautomazioni.it/`): **Rimozioni** → **Nuova richiesta** → **Rimozione temporanea** → prefisso URL `https://www.raasautomazioni.it/playzone/` — accelera la caduta dalle SERP (effetto temporaneo, ~6 mesi; utile subito dopo il deploy).
2. **In alternativa o in aggiunta**: nessuna azione — le URL non sono più in `sitemap.xml` e restano **404**; Google le rimuove dopo i crawl successivi.
3. **Hosting**: il sito su GitHub Pages **non** applica `htaccess`; eventuali redirect lato server vanno configurati sul CDN/DNS se in futuro si migrasse da Pages.

**Nota:** esiste `playzone/index.html` solo come **reindirizzamento istantaneo alla home** per chi apre ancora `/playzone/`; le sottopagine storiche restano 404 finché non vengono de-indicizzate.
