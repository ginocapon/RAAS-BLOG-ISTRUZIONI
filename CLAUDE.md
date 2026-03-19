# CLAUDE.md — RaaS Automazioni

## Istruzione Primaria
**LEGGI SEMPRE `SKILL.md` prima di qualsiasi operazione.**
SKILL.md (versione 2.0) e' l'unica fonte di verita' per questo progetto.

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
- Seguire WEB-PERFORMANCE-RULES.md per regole complete

### Contenuti Blog:
- Seguire template e checklist in SKILL.md Sezione 6 e 7
- 2500+ parole, 15+ H2/H3, 35% transition words
- OGNI dato numerico DEVE avere fonte verificata
- Zero claim inventati, zero dialetto, tono B2B professionale
- Prezzi: Base 399€/anno, E-commerce 599€/anno + 3% commissione performance (bloccati)

### Dopo ogni modifica:
- Aggiornare sitemap.xml se pagine aggiunte/rimosse
- Commit in italiano, descrittivo
- Verificare checklist automatiche in SKILL.md Sezione 7

### Cronolog Audit Automatico:
- **Ogni venerdi ore 07:00 CET** — audit automatico conformita' SKILL.md
- GitHub Actions workflow `.github/workflows/weekly-audit.yml`
- Rapporto creato come GitHub Issue con label `audit-settimanale`
- Autorizzazione **permanente** — attivo fino a revoca esplicita
- Riferimento regole: SKILL.md §10.4

### Pubblicazione:
- Regola d'oro: "Se non hai fonte verificabile, NON inserire il dato"
- Sostituire TUTTI i placeholder [DATO], [COMPETITOR], [FONTE] prima di pubblicare
