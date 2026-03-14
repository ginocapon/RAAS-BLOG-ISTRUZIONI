# SKILL UNIFICATA — RaaS Automazioni
## Prompt Operativo Master Consolidato

> **Versione:** 2.1 — 14 Marzo 2026
> **Unica fonte di verita'** per sviluppo, manutenzione, contenuti SEO, strategia GEO e AI Agents.
> **Prossima verifica consigliata:** Giugno 2026

---

## 1. ISTRUZIONI PER CLAUDE

### 1.1 Verifica Aggiornamenti Google (Consigliata ad Ogni Sessione)
Prima di ogni sessione di lavoro SEO, ricercare:
- `"Google Search updates [mese corrente] [anno corrente]"`
- `"Core Web Vitals updates [anno corrente]"`
- `"GEO Generative Engine Optimization updates [anno corrente]"`

Confronta con la sezione "Stato Aggiornamenti Google" e aggiorna questo file se trovi novita'.

### 1.2 Regole Operative
1. **Leggi prima** il file da modificare — mai al buio
2. **Mobile-first** — ogni modifica deve funzionare su mobile
3. **No librerie extra** — il sito e' volutamente leggero (vanilla HTML/CSS/JS)
4. **Commit** chiari e descrittivi in italiano
5. **Aggiorna** sitemap.xml quando aggiungi/rimuovi pagine
6. **Performance** — mai animazioni sull'elemento LCP; usare opacity/transform, mai filter
7. **CTA contrast** — minimo 4.5:1 (WCAG AA)
8. **Prezzi bloccati** — ogni riferimento ai prezzi deve essere coerente: Base 299€/anno, E-commerce 399€/anno + 3% commissione performance
9. **Dati verificati** — ogni dato numerico DEVE avere fonte citata. Se non hai fonte, scrivi "dato non disponibile"
10. **Zero claim inventati** — nessuna percentuale o statistica senza fonte verificabile
11. **Anti-plagio bandi** — i titoli dei bandi in data/bandi.json devono essere parafrasi originali, MAI copiati dal sito ufficiale. Formato: "NomeBando — Descrizione Breve Originale". I link devono corrispondere esattamente alla pagina ufficiale verificata
12. **Link verificati** — ogni url_bando deve essere controllato contro la fonte ufficiale prima dell'inserimento. URL errati danneggiano la credibilita

### 1.3 Stile di Comunicazione
- Rispondi in italiano
- Sii diretto e pratico
- Proponi sempre prima di agire su operazioni irreversibili
- Tono professionale B2B — **ZERO dialetto** (settore web agency)

---

## 2. CONTESTO PROGETTO

### 2.1 Informazioni Generali
| Campo | Valore |
|---|---|
| **Dominio** | raasautomazioni.it / www.raasautomazioni.it |
| **Tech Stack** | HTML statico + CSS custom + JS vanilla |
| **Framework** | Nessuno — zero dipendenze esterne, codice puro |
| **Lingue** | Italiano (principale), Inglese (/en/ — attivo) |
| **Target** | PMI, professionisti, startup — B2B |
| **Mercato** | Italia + UK/USA/Global (bilingue) |
| **Hosting** | GitHub Pages (migrazione da Serverplan in corso) |
| **Garanzia** | PageSpeed 90+ garantito, prezzi bloccati per sempre |

### 2.2 Struttura File Sito (root — GitHub Pages)
```
/
├── CLAUDE.md                   # Istruzioni automatiche per Claude
├── SKILL.md                    # Questo file — unica fonte di verita'
├── .nojekyll                   # Disabilita Jekyll su GitHub Pages
├── index.html                  # Homepage (hero, servizi, prezzi, FAQ, stats)
├── blog.html                   # Pagina blog principale
├── bandi.html                  # Aggregatore bandi (150+ fonti ufficiali)
├── landing.html                # Landing page conversione
├── postapremium.html           # Posta premium
├── brobot.html                 # Chatbot/assistente
├── privacy.html                # Privacy Policy GDPR
├── cookie.html                 # Cookie Policy
├── sitemap.xml                 # 43 URL indicizzate
├── htaccess                    # Regole server (da rinominare .htaccess se serve)
├── talk.txt                    # File testo
├── favicon.ico / .svg / .png   # Icone sito
├── apple-touch-icon.png        # Icona iOS
│
├── css/
│   └── styles.css              # Foglio stile principale
│
├── assets/                     # Risorse statiche (immagini, media, script)
├── data/                       # Dati strutturati (bandi.json)
├── mail-template/              # Template email
│
├── robots.txt                 # Whitelist AI bots (GPTBot, ClaudeBot, etc.)
├── llms.txt                   # Info sito per AI agents (standard llmstxt.org)
├── admin.html                 # Pannello admin (dashboard, bandi, email, analytics)
│
├── en/                         # Versione inglese del sito
│   ├── index.html              # Homepage EN
│   └── blog/articoli/          # Blog articoli EN (4 HTML)
│       ├── geo-generative-engine-optimization-guide-2026.html
│       ├── performance-based-marketing-revenue-share-model-2026.html
│       ├── ai-lead-generation-small-business-2026.html
│       └── website-speed-seo-roi-pure-code-vs-wordpress-2026.html
│
├── blog/articoli/              # Articoli blog IT (7 HTML)
│   ├── 5-automazioni-risparmiare-20-ore-settimana.html
│   ├── lead-generation-50-lead-qualificati-automazione.html
│   ├── pagespeed-95-dati-roi.html
│   ├── sito-vetrina-macchina-business-90-giorni.html
│   ├── codice-puro-vs-wordpress-2026.html
│   ├── lead-generation-30-50-lead-mese-2026.html
│   └── pagespeed-95-guida-ottimizzazione-2026.html
│
├── offerta-creator/            # Tool creazione offerte
├── playzone/                   # Sezione giochi interattivi (20+ pagine)
├── quiz/quale-tiktoker-sei/    # Quiz virale
├── tools/generatore-username/  # Generatore username
└── webstats/                   # Statistiche web
```

### 2.3 Modello di Business — RaaS (Revenue as a Service)
**Il sito e' la porta d'ingresso. Il vero valore e' portare clienti.**

| Componente | Dettaglio |
|---|---|
| **Fee d'ingresso (sito)** | Base 299€/anno, E-commerce 399€/anno |
| **Commissione performance** | 3% sul fatturato totale generato dai nuovi lead/contatti portati |
| **Dashboard trasparenza** | Ogni cliente accede a una pagina per verificare performance, lead, contatti generati |
| **Contratto** | Lock-in con doppia sottoscrizione (Art. 1341 c.c.), penale decrescente, diritto audit |

**Pacchetti sito (fee d'ingresso):**
| Pacchetto | Prezzo/Anno | Incluso |
|---|---|---|
| **Base** | 299€ | Sito vetrina/aziendale, hosting, SSL, PageSpeed 90+, SEO base, chatbot AI |
| **E-commerce** | 399€ | Tutto Base + catalogo prodotti, carrello, pagamenti, gestione ordini |

**Il modello performance (3% commissione):**
- Commissione calcolata sul fatturato totale generato da nuovi contatti/lead portati tramite il sito e le campagne RaaS
- Tracking via UTM, form dedicati, numeri telefono tracciati, CRM integrato
- Riconciliazione trimestrale con dati verificabili
- Dashboard cliente con accesso in tempo reale a tutte le metriche
- Diritto di audit contrattuale per entrambe le parti

**Riferimenti modelli simili nel mondo:**
- Wunderkind (USA): $204.7M fatturato 2024, pioniere "Revenue as a Service"
- Il 3% e' aggressivamente competitivo (mercato: 5-15%)
- Fee d'ingresso 299-399€ molto bassa (mercato: $2.500-$10.000+)

**Clausole contrattuali obbligatorie (legge italiana):**
- Doppia sottoscrizione specifica per clausola lock-in (Art. 1341 c.c.)
- Penale di recesso proporzionale e decrescente (Art. 1384 c.c.)
- Definizione chiara attribuzione lead e meccanismo audit
- Data portability garantita (evitare Art. 9, L.192/1998 — dipendenza economica)
- Durata massima consigliata: 24 mesi

**Claim verificati:**
- 150+ progetti completati
- 98% soddisfazione clienti
- 3.2M€ valore generato nel portfolio
- ROI medio 300% entro 6 mesi (automazioni)

### 2.4 Servizi Core
- Realizzazione siti web in codice puro (no WordPress)
- **Lead generation e acquisizione clienti** (servizio primario)
- Dashboard performance trasparente per ogni cliente
- Garanzia PageSpeed 90+
- Prezzo sito bloccato per sempre (anti-rincaro)
- SEO + GEO (Generative Engine Optimization)
- Aggregatore bandi: monitoraggio 150+ fonti ufficiali
- Automazioni business
- Sito bilingue IT/EN

### 2.5 Messaging Core
**Messaggio primario (IT):** "Ti portiamo clienti. Guadagniamo solo se guadagni tu."
**Messaggio primario (EN):** "We bring you clients. We only earn when you earn."

**Gerarchia messaggi:**
1. Performance-based: portiamo clienti, paghi solo sui risultati
2. Trasparenza: dashboard verificabile, tutto nero su bianco
3. Tecnologia: codice puro, AI, SEO/GEO, PageSpeed 90+
4. Prezzo d'ingresso accessibile: 299-399€/anno per il sito

**NON dire mai:**
- "Vendiamo siti web" (il sito e' il mezzo, non il prodotto)
- "Garantiamo X lead" (senza contratto specifico)
- Percentuali inventate
- Attacchi a concorrenti

### 2.6 Struttura Sito Bilingue
```
/                    → Italiano (default)
/en/                 → English
/en/index.html       → Homepage EN (con newsletter, chatbot link, video+robot)
/en/blog/articoli/   → Blog EN (4 articoli pubblicati)
```
Ogni pagina ha `<link rel="alternate" hreflang="it" href="...">` e `<link rel="alternate" hreflang="en" href="...">`

### 2.7 Design — Colori e Componenti
| Elemento | Valore | Note |
|---|---|---|
| **Colore primario** | #e63946 (rosso acceso) | Tutti i pulsanti CTA, link hover, accenti |
| **Colore primario dark** | #c1121f | Gradienti, hover pulsanti |
| **Accent** | #f4a261 (arancione) | Badge, dettagli secondari |
| **Dark** | #1a2f47 | Background hero, sezioni scure |
| **Video showcase** | Sotto la hero, layout grid: robot 3D (sx) + video (dx) |
| **Robot 3D** | Stile Star Wars, CSS puro, animazione float, braccio che indica il video |
| **Newsletter EN** | Sopra il footer nella pagina /en/, form Formspree |

### 2.8 Sistema Bandi — Verifica Link con AI
Il sistema bandi usa un orchestratore **Claude + Perplexity** per verificare automaticamente che ogni URL corrisponda alla pagina ufficiale del bando.

| Componente | Dettaglio |
|---|---|
| **Scraper** | `tools/scrape-bandi.js` — scraping da fonti ufficiali |
| **Verificatore** | `tools/verify-links-perplexity.js` — Claude + Perplexity sonar-pro |
| **Sync** | `tools/sync-bandi.js` — sincronizzazione con Supabase |
| **Cron** | GitHub Actions ogni lunedi 08:00 UTC |
| **API Keys** | `ANTHROPIC_API_KEY` + `PERPLEXITY_API_KEY` (GitHub Secrets) |

**Flusso verifica:**
1. Lo scraper trova nuovi bandi
2. Per ogni bando, Claude chiede a Perplexity di cercare il link ufficiale
3. Claude valida il risultato e aggiorna `url_bando` se trova un URL migliore
4. Ogni bando ha campo `link_verificato` (boolean) e `data_verifica` (ISO date)

**Flag CLI:**
- `--skip-verify` — salta la verifica Perplexity (utile per test rapidi)
- `--dry-run` — non salva modifiche

---

## 3. STRATEGIA SEO & CONTENUTI BLOG

### 3.1 Executive Summary — Standard Articoli
- 2500+ parole AI-proof strutturate
- 35% transition words naturali
- 28 H2/H3 distribuiti + errori umani casuali (5-8 per articolo)
- SPINTAX 24 varianti social pronte (LinkedIn/Facebook)
- Meta titles 60/160 char + Meta desc 95/200 char
- JSON-LD Article + Organization + FAQSchema
- Emoji Unicode moderati (uso professionale)
- Fonti verificate: IlSole24Ore, Gartner, Google Trends, StatCounter, W3Techs

### 3.2 Ricerca Keywords e Competitors
**SEED:** "{Sito web|Web agency|Realizzazione siti} {professionale|aziendale|vetrina} {prezzo|costo|preventivo} 2026"

**LSI Locali:** "prezzo sito web", "web agency {citta'}", "PageSpeed ottimizzazione", "WordPress vs codice puro", "garanzia anti-rincaro"

**SPINTAX SOCIAL (24 varianti LinkedIn/Facebook):**
```
{siti web|web agency|digital marketing} {prezzi trasparenti|anti-rincaro|bloccati}!
RaaS 249€/anno vs Aruba 9,90€ poi 59,99€ — Confronto reale
PageSpeed 90+ | Codice puro | Zero plugin
Scopri: [link]
#WebAgency2026 #SitiWeb #DigitalMarketing
```

**ISTRUZIONE COMPETITORS:** I competitors menzionati devono avere:
- Preventivi ufficiali richiesti (screenshot/PDF)
- Prezzi pubblici verificabili online
- Dati performance da fonti terze (Trustpilot, Google Reviews)

### 3.3 Meta Titoli e Descrizioni (Template)
**TITLE 60 char:** `Prezzi Web Agency 2026: RaaS vs Aruba [+506%]`
**TITLE 160 char:** `Prezzi Web Agency 2026: RaaS 249€ Fisso vs Aruba 9,90€→59,99€ (+506%). Confronto Trasparente, PageSpeed 90+, Codice Puro vs WordPress. Dati Verificati.`
**META 95 char:** `Prezzi web agency 2026: RaaS 249€ bloccato vs Aruba +506% rincaro. Confronto trasparente verificato.`
**META 200 char:** `Confronto prezzi web agency 2026: RaaS 249€/anno bloccato per sempre vs Aruba 9,90€ poi 59,99€ (+506%). PageSpeed 90+, codice puro, garanzia anti-rincaro. Fonti: preventivi ufficiali, Gartner 2025.`

### 3.4 Linguaggio 92% Umano
**Errori naturali (5-8 casuali, MAI forzati, max 1 ogni 300 parole):**
- "prezzibloccati" (incollato senza spazio)
- "ristrutturazzione" (doppia Z casuale)
- "," mancante: "Infatti Aruba rincarano"
- "202 6" (spazio nel numero)

**EVITARE:**
- Dialetto Veneto (settore professionale B2B)
- Troppi errori consecutivi
- Errori strategici (devono sembrare naturali)

**Transition words 35% (professionali):**
Inoltre, Infatti, Di conseguenza, In particolare, Tuttavia, Pertanto, Nonostante cio', A tal proposito, In sintesi, D'altra parte, Allo stesso modo, Per questo motivo, Infine, Quindi, In conclusione, Dunque

### 3.5 Struttura Articolo 2500 Parole — H2 Obbligatori (28 totali)
1. "Prezzi Web Agency 2026: [DATO_GARTNER] sul Mercato Italiano"
2. "RaaS vs Aruba vs Register: Tabella Comparativa Prezzi Reali"
3. "Il Problema dei Costi Nascosti nelle Web Agency"
4. "Strategia Anti-Rincaro RaaS: Come Funziona"
5. "Codice Puro vs WordPress: Confronto Performance Reale"
6. "Case Study: Risparmio Cliente su 5 Anni"
7. "Garanzia PageSpeed 90+: Cosa Significa Legalmente"
8. "Come Scegliere la Web Agency Giusta: 7 Domande"
9. "Lead Generation Garantita: 30-50 Lead/Mese Realistici?"
10. "Tecnologia 2026: Trend Web Agency (Fonte: Gartner)"
11. "FAQ: 15 Domande Frequenti su Prezzi e Garanzie"
12. "Fonti Ufficiali: Dove Verificare i Dati"

**Ogni sezione: max 200 parole. Ogni dato numerico con [FONTE] citata.**

### 3.6 JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Prezzi Web Agency 2026: RaaS vs Aruba Confronto Trasparente",
  "description": "Analisi completa prezzi web agency con dati verificati",
  "author": {
    "@type": "Organization",
    "name": "RaaS Automazioni"
  },
  "publisher": {
    "@type": "Organization",
    "name": "RaaS Automazioni",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.raasautomazioni.it/logo.png"
    }
  },
  "datePublished": "[DATA_PUBBLICAZIONE]",
  "dateModified": "[DATA_MODIFICA]"
}
```

**FAQ Schema (15 FAQ basate su "People Also Ask" Google):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Quanto costa un sito web professionale nel 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I prezzi variano: RaaS 249€/anno bloccato, Aruba da 9,90€ a 59,99€/anno (+506%), agenzie tradizionali 1.500-5.000€ una tantum + rinnovi. Fonte: preventivi ufficiali gennaio 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Cos'e' la garanzia anti-rincaro?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Clausola contrattuale che blocca il prezzo per sempre. Es: RaaS 249€/anno nel 2026 resta 249€ anche nel 2030."
      }
    }
  ]
}
```

### 3.7 Tabelle Competitive (Solo Dati Verificati)

**PREZZI WEB AGENCY 2026 — Fonte: Preventivi Ufficiali**

| Provider | Anno 1 | Anno 2 | Anno 5 | Totale 5 Anni | Fonte |
|----------|--------|--------|--------|---------------|-------|
| RaaS Business | 249€ | 249€ | 249€ | 1.245€ | Listino pubblico |
| Aruba Hosting | 9,90€ | 59,99€ | 59,99€ | 4.159€* | Preventivo 10/01/26 |
| Register.it | 890€ | 600€ | 600€ | 3.290€ | Preventivo 15/01/26 |
| Keliweb | 1.200€ | 540€ | 540€ | 3.360€ | Preventivo 18/01/26 |

*Include realizzazione sito, hosting, plugin, manutenzione

**CONFRONTO PERFORMANCE — Dati PageSpeed Insights**

| Tecnologia | PSI Mobile | PSI Desktop | Tempo Caricamento | Fonte |
|------------|-----------|-------------|-------------------|-------|
| Codice Puro (RaaS) | 90-98 | 98-100 | 0.2s | Screenshot PSI |
| WordPress (Aruba) | 45-65 | 60-75 | 3.2s | Screenshot PSI |

**REGOLA:** Se dato non disponibile, scrivere "dato non pubblico" o non inserire riga.

### 3.8 Sponsor Block (400 Parole — Claim Verificabili)
**Punti da includere:**
- 249€/anno bloccato per sempre (contratto scritto)
- PageSpeed 90+ garantito (o lavoriamo gratis)
- Zero costi nascosti: hosting, SSL, modifiche incluse anno 1
- Codice proprietario: niente WordPress, niente plugin, niente vulnerabilita'
- Risparmio 5 anni: 1.245€ vs 4.159€ Aruba

**NON SCRIVERE MAI:**
- "Beffiamo concorrenti"
- "30 lead garantiti" (se non contrattualmente vero)
- Percentuali inventate
- Nomi concorrenti in termini denigratori

### 3.9 Performance Stimate (Con Segnalazione)
| Mese | Lead stimati | Traffic organico | NOTA |
|------|--------------|------------------|------|
| 1 | 5-10 | 200-400 | Dipende da settore/zona |
| 3 | 15-25 | 800-1.2K | Dato stimato medio |
| 6 | 30-50 | 3-5K | Dato stimato medio |
| 12 | 60-100 | 10-20K | Dato stimato medio |

**Tutti i numeri sono proiezioni basate su trend medi settore, NON garantiti.**

### 3.10 Template Veloce Articolo
```markdown
# [TITOLO_ARTICOLO]

[INTRO 150 parole - problema del lettore]

## [DATO_VERIFICATO]: Il Problema dei Rincari

[Spiegazione con esempio concreto Aruba 9,90€→59,99€]

## Confronto Trasparente: RaaS vs [COMPETITOR]

[Tabella prezzi 5 anni con fonti]

## [H2_TEMATICO]

[Sviluppo 200 parole max]

...continua per 28 H2/H3...

## FAQ: 15 Domande Frequenti

[Da "People Also Ask" Google]

## Fonti Verificate

- [Link IlSole24Ore]
- [Link Gartner Report]
- [Link preventivi ufficiali]
```

---

## 4. REQUISITI GOOGLE — AGGIORNATI MARZO 2026

### 4.1 Core Web Vitals — Soglie 2026
| Metrica | Buono | Da migliorare | Scarso |
|---|---|---|---|
| **LCP** | < 2.5s (target: <2s) | 2.5s - 4.0s | > 4.0s |
| **INP** | < 200ms | 200ms - 500ms | > 500ms |
| **CLS** | < 0.1 | 0.1 - 0.25 | > 0.25 |

### 4.2 Performance Rules — OBBLIGATORIO
1. **No `filter: blur` su animazioni** — usare `opacity` e `transform` (GPU-accelerated)
2. **No `will-change` permanente** — solo al `:hover` o quando serve
3. **Hero animations ritardate** — nessuna animazione above-the-fold nei primi 3s
4. **Immagini above-fold** — mai `loading="lazy"`, sempre `fetchpriority="high"` se hero
5. **Font** — preload woff2, `font-display: swap`
6. **Iframe** (YouTube etc.) — sempre `loading="lazy"`

### 4.3 E-E-A-T — Segnali 2026 (Aggiornati)
Il 96% delle citazioni AI Overviews proviene da fonti con forti segnali E-E-A-T (fonte: Wellows 2026).
Pagine con 15+ entita' riconosciute hanno 4.8x piu' probabilita' di essere in AI Overviews (fonte: ClickRank).
Siti con segnali di esperienza hanno visto +23% dopo Core Update dicembre 2025 (fonte: BKND).

**Experience (Esperienza diretta):**
- Immagini originali (screenshot lavori, dashboard, foto eventi) — NO stock photo
- Case study con numeri specifici e risultati misurabili
- Video propri che mostrano il lavoro in azione
- Dettagli che solo un insider conosce

**Expertise (Competenza tecnica):**
- Contenuti 2500+ parole approfonditi su argomenti core
- Uso corretto terminologia tecnica con definizioni
- Spiegare il "perche'" oltre al "cosa"
- Person schema con jobTitle, worksFor, qualifiche

**Authoritativeness (Autorita'):**
- Backlink da fonti credibili del settore
- Presenza su directory settoriali
- Recensioni su piattaforme terze (Google Business, Trustpilot)
- NAP consistente (Nome, Indirizzo, Telefono) su tutto il web
- Menzioni su pubblicazioni indipendenti

**Trustworthiness (Affidabilita' — IL PIU' IMPORTANTE):**
- Contatti chiari: indirizzo fisico, telefono, email
- Team con nomi reali, foto, bio, qualifiche
- Prezzi trasparenti e verificabili
- Privacy/Cookie policy presenti, HTTPS
- Recensioni clienti con attribuzione
- Fonti esterne citate per ogni dato numerico

### 4.4 GEO — Generative Engine Optimization
**Dati chiave:**
- Sessioni AI +527% anno su anno (fonte: Averi 2025)
- AI Overviews su 48% delle query tracciate, +58% anno su anno (fonte: almcorp)
- Sovrapposizione Google top link / fonti AI scesa dal 70% al 20% (fonte: Profound)
- Schema markup = 2.5x piu' probabilita' di apparire in risposte AI (fonte: Stackmatix)
- GPT-4 passa dal 16% al 54% di risposte corrette con structured data (fonte: Medium)
- Solo 38% delle citazioni AI Overview proviene da pagine top-10 (fonte: almcorp)

**I 7 Pilastri GEO:**
1. **Crawling AI** — robots.txt con whitelist completa (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, GoogleOther)
2. **Struttura per Sintesi** — Risposta diretta nelle prime 2 righe di ogni sezione, poi approfondimento
3. **Contenuti Citabili** — Dati proprietari, benchmark originali, case study con numeri unici
4. **Prompt-style** — Ottimizzare per domande conversazionali ("Quale web agency italiana ha prezzi fissi?"), non solo keyword
5. **Consenso Multi-Fonte** — Presenza coerente su directory, review, forum, social, pubblicazioni terze
6. **Aggiornamento Costante** — Date "ultimo aggiornamento" visibili, refresh trimestrale contenuti cornerstone
7. **Dominio di Nicchia** — Profondita' tematica su argomenti specifici (le AI premiano chi copre un tema in profondita')

**Come le AI scelgono chi citare:**
| Piattaforma | Fonti citate | Preferenze | Nota |
|-------------|-------------|------------|------|
| ChatGPT | 3-5 | Wikipedia, fonti autorevoli | Usa indice Bing — IndexNow accelera discovery |
| Perplexity | 5-8 | Reddit, forum, fonti dirette | Piu' aperto a siti piccoli con dati unici |
| Google AI Overviews | 2-4 | Distribuite, schema.org | 82% citazioni da earned media |
| Gemini | 3-6 | Dati numerici, bullet points | Gemini 3 (gen 2026) ha sostituito 42% dei domini citati |
| Claude | 3-6 | Documentazione tecnica | Preferisce fonti strutturate |

### 4.5 Schema.org — Priorita' per AI e Motori
Schema.org e' il ponte critico tra siti web e AI agents. Contenuti con schema hanno 2.5x piu' probabilita' di apparire in risposte AI. Google e Microsoft usano Schema Markup per le feature di AI generativa.

**Schema prioritari (JSON-LD — formato obbligatorio):**
| Schema | Dove | Impatto AI | Stato |
|--------|------|-----------|-------|
| Organization | Homepage | CRITICO | FATTO |
| LocalBusiness | Homepage | CRITICO | DA FARE |
| ProfessionalService | Homepage | ALTO | DA FARE |
| FAQPage | Tutte con FAQ | ALTO | PARZIALE |
| Service + Offer | Homepage | ALTO | FATTO |
| AggregateRating | Homepage (testimonial) | ALTO | DA FARE |
| Review | Homepage (testimonial) | ALTO | DA FARE |
| BreadcrumbList | Tutte le pagine | MEDIO | PARZIALE |
| BlogPosting | Blog | MEDIO | DA FARE |
| Person | Blog, Chi Siamo | MEDIO | DA FARE |
| VideoObject | Pagine con video | MEDIO | DA FARE |
| ItemList | Bandi | MEDIO | DA FARE |
| HowTo | Guide/tutorial | MEDIO | DA FARE |
| Dataset | Aggregatore bandi | BASSO | DA FARE |

**Regola d'oro Schema:** I dati nello schema DEVONO corrispondere esattamente a cio' che c'e' sulla pagina E su Google Business Profile. Incoerenze riducono la fiducia AI su TUTTE le pagine.

### 4.6 Aggiornamenti Algoritmo Google — Stato Marzo 2026
- **Gennaio 2026:** Prioritizzata esperienza diretta autentica; siti con riassunti AI penalizzati
- **Febbraio 2026:** Discover Core Update — contenuti locali, in-depth, originali premiati; clickbait ridotto
- **Marzo 2026:** Core Update — helpful content rafforzato, AI content scalato e parasitic SEO penalizzati
- Google fa ~500.000 esperimenti e ~4.500 miglioramenti all'anno
- L'algoritmo e' ora alimentato da Gemini AI con comprensione semantica continua

---

## 5. CHECKLIST AUTOMATICHE

### Per Ogni Nuova Pagina
- [ ] Title tag unico (max 60 char)
- [ ] Meta description unica (max 160 char)
- [ ] H1 unico con keyword conversazionale (prompt-style)
- [ ] Schema.org JSON-LD (BreadcrumbList + tipo specifico)
- [ ] Open Graph tags (og:title, og:description, og:url, og:image, og:type, og:locale)
- [ ] `<meta name="theme-color">`
- [ ] `<link rel="canonical">`
- [ ] Hero image con `fetchpriority="high"`, mai `loading="lazy"` above-fold
- [ ] Font preload woff2
- [ ] CTA primario con contrasto >= 4.5:1
- [ ] Registrato in sitemap.xml
- [ ] Link navbar e footer coerenti con tutte le altre pagine
- [ ] Cookie banner presente
- [ ] Nessun CDN esterno (codice puro)
- [ ] GA4 (G-JFM8JG9C2R) presente
- [ ] Risposta diretta nelle prime 2 righe di ogni sezione H2 (GEO)
- [ ] Contenuto risponde a domande conversazionali

### Per Ogni Nuovo Articolo Blog
- [ ] 2500+ parole strutturate
- [ ] 28 H2/H3 distribuiti
- [ ] 35% transition words professionali
- [ ] Errori umani casuali (5-8, max 1 ogni 300 parole)
- [ ] Meta titles 60/160 char + desc 95/200 char
- [ ] JSON-LD BlogPosting + FAQPage + BreadcrumbList
- [ ] 15 FAQ basate su ricerche reali ("People Also Ask")
- [ ] Tabelle confronto con FONTI CITATE
- [ ] Ogni dato numerico ha [FONTE] verificata
- [ ] Link fonti ufficiali preservati
- [ ] Zero claim inventati
- [ ] Zero attacchi personali a concorrenti
- [ ] SPINTAX social pronto (LinkedIn/Facebook)
- [ ] Tono professionale B2B — zero dialetto
- [ ] Author bio con Person schema
- [ ] Table of Contents con anchor link
- [ ] Data "Ultimo aggiornamento" visibile
- [ ] Pulsanti condivisione social (LinkedIn, X, Facebook)

### Per Ogni Modifica CSS
- [ ] Mobile-first: stili base per mobile, `@media` per desktop
- [ ] No `filter` su animazioni — solo `opacity` e `transform`
- [ ] No `will-change` permanente
- [ ] Contrasto minimo 4.5:1 su CTA

### Per Ogni Modifica JS
- [ ] Vanilla JS — nessun framework, nessuna libreria
- [ ] Performance: nessun blocco rendering
- [ ] Chatbot caricato con delay

### Commit
- [ ] Messaggio in italiano, descrittivo
- [ ] Nessun file sensibile (.env, credenziali)

---

## 6. ISTRUZIONI PUBBLICAZIONE

### Prima di Pubblicare Qualsiasi Contenuto:

1. **VERIFICARE [DATO] su fonte ufficiale:**
   - Prezzi: preventivi ufficiali richiesti (screenshot/PDF)
   - Performance: Google PageSpeed Insights (screenshot)
   - Trend: Google Trends, Gartner, IlSole24Ore

2. **SOSTITUIRE placeholder:**
   - [COMPETITOR] → Nome reale (Aruba, Register, Keliweb)
   - [DATO_FONTE] → Numero + fonte tra parentesi
   - [DATA] → Data pubblicazione reale

3. **AGGIORNARE trimestrale:**
   - Prezzi competitors (verificare rinnovi)
   - Dati PageSpeed (ripetere test)
   - Bonus/agevolazioni statali

4. **CITARE fonte sotto ogni tabella/grafico**

### Regola d'Oro
> "Se non hai fonte verificabile, NON inserire il dato."
> Meglio scrivere "dato non disponibile" che inventare numeri.

---

## 7. TODO — Azioni Future

### Migrazione GitHub
- [x] Copiare file sito nel repo (71 file)
- [x] Spostare da public_html/ a root per GitHub Pages
- [x] Aggiungere .nojekyll
- [ ] Attivare GitHub Pages nelle impostazioni repo (branch main, root /)
- [ ] Aggiungere custom domain raasautomazioni.it
- [ ] Aggiornare DNS su Serverplan: puntare a GitHub Pages
- [ ] Verificare HTTPS con certificato GitHub
- [ ] Verificare che tutte le 43 pagine funzionino
- [ ] Testare PageSpeed post-migrazione

### Contenuti
- [x] Convertire articoli .txt in .html (3 articoli convertiti)
- [ ] Creare nuovi articoli blog seguendo template Sezione 3
- [ ] Aggiornare dati competitors con preventivi Q1 2026

### SEO & Visibilita'
- [x] Registrare/aggiornare Google Business Profile
- [x] Schema.org su tutte le pagine
- [x] Open Graph tags su tutte le pagine
- [x] Verificare robots.txt permissivo per AI bots

### Tecnico
- [ ] Collegare form contatti a backend email
- [ ] Implementare `prefers-reduced-motion` per accessibilita'
- [ ] Critical CSS inline per LCP <2s
- [ ] Verificare HTTPS su GitHub Pages

### GEO & AI Agents
- [x] Creare robots.txt con whitelist AI bots (7 bot configurati)
- [x] Creare llms.txt (standard llmstxt.org)
- [ ] Creare llms-full.txt (contenuto completo pagine in Markdown)
- [ ] Creare ai.json (permessi AI — standard ai-visibility.org.uk)
- [ ] Creare /.well-known/agent.json (discovery A2A — standard Google/Linux Foundation)
- [ ] Creare /.well-known/mcp.json (discovery MCP — standard Anthropic/Linux Foundation)
- [ ] Aggiungere AggregateRating schema su testimonial homepage
- [ ] Aggiungere LocalBusiness schema su homepage
- [ ] Aggiungere Person schema per fondatore e team
- [ ] Aggiungere author bio su articoli blog
- [ ] Aggiungere Table of Contents su articoli blog
- [ ] Aggiungere date "Ultimo aggiornamento" visibili su blog
- [ ] Usare BlogPosting invece di Article su blog
- [ ] Aggiungere ItemList schema su bandi.html
- [ ] Embed video YouTube su pagine chiave (youtube-nocookie.com per GDPR)
- [ ] Creare VideoObject schema per video
- [ ] Aggiungere pulsanti share social su blog
- [ ] Creare humans.txt
- [ ] Creare .well-known/security.txt
- [ ] Creare manifest.json PWA base
- [ ] Implementare IndexNow per Bing (ChatGPT usa indice Bing)
- [ ] Monitoring citazioni AI (Otterly.AI o Peec AI) — settimanale
- [ ] Registrarsi su directory settoriali italiane
- [ ] Ottimizzare Google Business Profile (post 2x/settimana)

---

## 8. STRATEGIA GEO, AI AGENTS & PREVISIONI 2026-2028

### 8.1 File Speciali per AI Agents
| File | Posizione | Scopo | Stato |
|------|-----------|-------|-------|
| `robots.txt` | `/robots.txt` | Whitelist crawler AI (7 bot) | FATTO |
| `llms.txt` | `/llms.txt` | Info sito leggibile da AI (standard llmstxt.org, 600+ siti lo usano) | FATTO |
| `llms-full.txt` | `/llms-full.txt` | Contenuto completo in Markdown | DA FARE |
| `ai.json` | `/ai.json` | Permessi AI — allow/deny per tipo uso (v1.1.0, ai-visibility.org.uk) | DA FARE |
| `agent.json` | `/.well-known/agent.json` | Discovery A2A — Google/Linux Foundation, descrive servizi per agenti | DA FARE |
| `mcp.json` | `/.well-known/mcp.json` | Discovery MCP — Anthropic/Linux Foundation (97M+ download SDK/mese) | DA FARE |
| `humans.txt` | `/humans.txt` | Crediti team, trasparenza | DA FARE |
| `security.txt` | `/.well-known/security.txt` | Policy sicurezza | DA FARE |
| `manifest.json` | `/manifest.json` | PWA base | DA FARE |

**Nota su llms.txt:** 844.000+ siti lo implementano (Anthropic, Stripe, Cloudflare). Nessuna AI ha confermato ufficialmente di leggerlo, ma e' una scommessa a basso costo con potenziale futuro.

### 8.2 Standard Emergenti per AI Agents

**NLWeb (Natural Language Web) — Microsoft:**
Protocollo open-source (MIT) creato da R.V. Guha (inventore di RSS, RDF e Schema.org). Trasforma siti web in endpoint conversazionali per AI agents. Funziona consumando il markup Schema.org esistente. Ogni istanza NLWeb e' anche un server MCP. Chiamato "l'HTML della generazione AI."
- **Azione:** Avere Schema.org completo e' gia' la base per NLWeb.
- Fonte: searchengineland.com, github.com/microsoft/NLWeb

**MCP (Model Context Protocol) — Anthropic:**
Donato alla Linux Foundation (dic 2025). Co-fondato da Anthropic, Block, OpenAI. Supportato da Google, Microsoft, AWS, Cloudflare. 97M+ download SDK/mese. Permette agli AI agents di interagire con servizi strutturati.
- **Azione:** Preparare `/.well-known/mcp.json` come endpoint di discovery.
- Fonte: modelcontextprotocol.io, anthropic.com

**A2A (Agent-to-Agent) — Google:**
Protocollo sotto Linux Foundation. Usa `/.well-known/agent.json` per discovery tra agenti. Complementare a MCP.
- **Azione:** Preparare agent card con descrizione servizi.
- Fonte: a2aprotocol.ai

**WebMCP — Chrome 145+ (feb 2026):**
Permette ai siti di esporre form e strumenti come tool dichiarativi per AI agents nel browser.
- **Azione:** Monitorare — quando si stabilizza, i form contatto/preventivo diventano tool AI.
- Fonte: dev.to/czmilo

**NIST AI Agent Standards Initiative (feb 2026):**
Standard per ecosistemi di agenti AI interoperabili e sicuri.
- **Azione:** Monitorare per compliance futura.
- Fonte: nist.gov

**IndexNow — Bing:**
80M+ siti, 5B+ submission/giorno. 22% dei click Bing proviene da URL IndexNow. Google NON lo supporta, ma ChatGPT usa l'indice Bing → indicizzazione Bing piu' rapida = discovery ChatGPT piu' rapida.
- **Azione:** Implementare per contenuti blog (semplice script al deploy).
- Fonte: bing.com/indexnow

### 8.3 Zero-Click Search — Numeri e Strategia
**Stato 2026:**
- 60% delle ricerche Google finisce senza click (fonte: Bain & Company). Su mobile: 77%
- Query con AI Overviews: 83% zero-click. AI Mode: 93% zero-click
- AI Overviews riducono i click del 58% (fonte: Ahrefs, feb 2026)
- MA: il traffico AI converte **23x meglio** del tradizionale organico, con valore economico **4.4x superiore** (fonte: click-vision.com)
- I brand sono **6.5x piu' probabili** di essere citati tramite fonti terze

**Strategia anti-zero-click:**
1. Shift KPI da traffico a **visibilita'**: citazioni AI, brand mentions, snippet appearances
2. Ottimizzare per inclusione nelle risposte: formato Q&A, definizioni concise, dati strutturati
3. Costruire presenza su siti autorevoli esterni (i brand citati tramite terze parti hanno 6.5x piu' citazioni)
4. Ottimizzare conversione del traffico che arriva (qualita' molto piu' alta)

**Previsione 2027:** 75% delle query informazionali risolte direttamente nelle interfacce di ricerca
**Previsione 2028:** Zero-click diventa il default. Solo query transazionali e ricerca complessa generano click

### 8.4 Google AI Overviews & AI Mode — Evoluzione
**Stato 2026:**
- AI Overviews su **48% delle query** tracciate (+58% anno su anno)
- Gemini 3 e' il modello di default (gen 2026)
- Penetrazione per settore: Sanita' 88%, Education 83%, B2B Tech 82%, Ristoranti 78%
- Gli utenti possono fare domande di follow-up direttamente da AI Overviews
- Google ha lanciato Universal Commerce Protocol (UCP) — checkout diretto dentro AI Mode

**Previsione 2027:** AI Overviews su >60% delle query. Risposte personalizzate basate su cronologia
**Previsione 2028:** AI Overviews diventano l'esperienza predefinita. SERP tradizionale (10 link blu) limitata a query di nicchia

### 8.5 Voice Search & Assistenti AI
**Stato 2026:**
- 8.4 miliardi di assistenti vocali in uso globale (fonte: DemandSage)
- 65%+ ricerche locali via voce. 71% utenti preferisce voce a digitazione
- Europa: 25% del mercato globale voice assistant
- Voice commerce: $80 miliardi nel 2026
- Mercato voice assistant: da $7.35B (2024) a $33.74B (2030), CAGR 26.5%

**Azioni per sito statico italiano:**
- Ottimizzare per query conversazionali in italiano ("Quanto costa un sito web per un ristorante a Milano?")
- Implementare FAQ schema e markup speakable
- Google Business Profile completo — gli assistenti vocali attingono pesantemente da GBP
- Ottimizzazione voice in italiano = vantaggio competitivo (quasi nessuno lo fa)

**Previsione 2027:** AI conversazionale domina 70% interazioni cliente. Voice ads a $19B
**Previsione 2028:** Voice search diventa "agentica" — non solo cerca info ma prenota, confronta, acquista

### 8.6 Multimodal Search (Testo + Immagine + Video + Voce)
**Stato 2026:**
- Google Lens: >12 miliardi di ricerche visive/mese
- Ricerca multimodale e' il nuovo standard Google: foto + domanda vocale = query unica
- Short-form video (Shorts, Reels, TikTok) e' il formato contenuto piu' universale 2026
- Google AI "legge" trascrizioni video e "guarda" frame per trovare risposte

**Azioni per sito statico:**
- Immagini di qualita' con alt text descrittivo + ImageObject schema
- Video brevi (case study, demo servizi) con VideoObject schema
- Trascrizioni testuali sotto ogni video (doppio contenuto per AI)
- Embed YouTube con `youtube-nocookie.com` per GDPR, `loading="lazy"` su iframe

**Previsione 2027:** Vector-based retrieval sostituisce keyword matching. Silos contenuto (testo/immagine/video) si dissolvono
**Previsione 2028:** App multimodali AI mostrano +45% conversioni in Europa. Voice search +20-35% featured snippets

### 8.7 AI Agents & Commercio Agentico — La Rivoluzione 2026-2028
**Stato 2026:**
- Traffico da AI agents cresciuto **+1.300%** in 9 mesi (fonte: McKinsey)
- OpenAI + Walmart: acquisti dentro ChatGPT. PayPal: Agentic Toolkit. Visa/Mastercard: tool pagamento agenti
- Google: Universal Commerce Protocol (UCP) per commercio agentico in AI Mode
- Linux Foundation: Agentic AI Foundation (Anthropic, Google, Microsoft, OpenAI, Block)

**Le 3 fasi del commercio agentico:**
| Fase | Periodo | Descrizione |
|------|---------|-------------|
| 1 | 2025-2026 | AI ricerca e consiglia, umano decide e compra |
| 2 | 2027 | AI compra autonomamente con approvazione umana |
| 3 | 2028+ | Negoziazione agent-to-agent su scala |

**Previsione 2027:** Gartner: agenti AI tagliano gap costo-valore nei contratti di servizi di almeno 50%
**Previsione 2028:** Gartner: agenti AI intermedieranno >$15 trilioni in spesa B2B. 90% acquisti B2B gestiti da AI. 33% software enterprise con AI agentica integrata

**CRITICO per RaaS:** Se catalogo servizi, prezzi e proposta di valore non sono machine-readable (Schema.org), gli AI agents **non ti troveranno**. Implementare Service, Offer, Organization, PriceSpecification completi.

### 8.8 SEO Tradizionale vs GEO — Evoluzione
**Stato 2026:**
- Mercato SEO: da $75B (2023) a $88.9B (2024), CAGR 18.3%
- SEO non muore, si trasforma. La pratica diventa "strategia di visibilita'"
- Traffico da LLM/AI search supererà l'organico tradizionale entro 2028 (fonte: Semrush)
- Servono entrambe le strategie: SEO tradizionale + GEO

**Cosa sostituisce il SEO puro:**
1. **GEO** — ottimizzazione per risposte AI (ChatGPT, Perplexity, Claude, Gemini)
2. **Search Experience Optimization** — ottimizzare l'esperienza, non il motore
3. **Multi-platform search** — Google, YouTube, TikTok, Instagram, Reddit sono tutti motori di ricerca

**Previsione 2027:** Mercato SEO proiettato a $170B entro 2028 (CAGR 17.6%). SEO + GEO diventa strategia obbligatoria
**Previsione 2028:** Traffico AI supera organico tradizionale. Professionisti SEO diventano "strateghi di visibilita'"

### 8.9 Local SEO Italia — Trend PMI
**Stato 2026:**
- 26.7% delle PMI italiane ha adottato almeno una soluzione AI (in accelerazione)
- 56% del traffico web italiano da smartphone
- Google Business Profile e' ora l'hub locale AI-powered primario (Maps, local pack, AI Overviews)
- Recensioni anonime Google lanciate — piu' recensioni attese, incluse negative
- Social media (Instagram, TikTok, Facebook) funzionano come motori di ricerca locali

**Azioni specifiche per PMI italiana:**
1. Google Business Profile: post 2x/settimana, foto/video regolari, rispondere a TUTTE le recensioni
2. LocalBusiness + Service schema con NAP (Nome, Indirizzo, Telefono) completo
3. Query conversazionali italiane ("miglior agenzia web vicino a me")
4. Presenza su social come motori di ricerca (Instagram, TikTok per discovery locale)
5. Strategia gestione recensioni anonime

**Previsione 2027:** AI-driven local discovery domina. Aziende con AI nel marketing: +25-35% conversioni, -30% costi operativi
**Previsione 2028:** AI agents scoprono e raccomandano business locali autonomamente. Senza dati machine-readable = invisibili

### 8.10 Previsioni Algoritmo Google 2027-2028
**2027:**
- Integrazione completa AI generativa nel ranking core
- Contenuti valutati per significato contestuale, non keyword matching
- Machine learning rileva pattern comportamentali utente e anticipa esigenze
- Topical authority diventa il segnale dominante — Google valuta quanto bene un sito copre un intero argomento

**2028:**
- Segnali tradizionali (backlink, keyword density) significativamente deprecati
- Entity-based understanding, segnali autore, verifica autenticita' contenuti dominano
- Aggiornamenti algoritmo diventano continui (non piu' "eventi")
- Potenziali nuove metriche CWV per responsivita' AI-interaction, voice-query readiness, caricamento multimodale

### 8.11 Video — Strategia Completa
Video embedded prova "Experience" (la prima E di E-E-A-T) a Google. Aumenta tempo sulla pagina = segnale qualita'. YouTube e' il secondo motore di ricerca al mondo. Le AI analizzano trascrizioni e frame video per risposte.

**Checklist implementazione:**
- [ ] Embed YouTube su pagine chiave (servizi, chi siamo, case study)
- [ ] Usare `youtube-nocookie.com` per GDPR
- [ ] `loading="lazy"` su iframe
- [ ] Schema VideoObject per ogni video
- [ ] Titoli/descrizioni video ottimizzati in italiano
- [ ] Trascrizione testuale sotto il video
- [ ] Thumbnail personalizzata
- [ ] Cross-link: video YouTube → sito, sito → canale YouTube

**5 idee video ad alto impatto:**
1. "Ecco come costruiamo un sito in codice puro" — 3-5 min, screencast reale
2. "PageSpeed: il nostro sito vs WordPress" — confronto live con dati
3. "Testimonianza cliente" — intervista breve con risultati
4. "Come trovare bandi per la tua azienda" — tutorial aggregatore
5. "Perche' prezzo bloccato?" — spiegazione trasparente business model

### 8.12 Monitoring AI Visibility & Citation Tracking
**Gartner: traffico da ricerca tradizionale calera' del 25% entro fine 2026.** Servono nuove metriche.

**Prompt di test settimanali:**
- ChatGPT: "Quale web agency italiana ha prezzi fissi?"
- Perplexity: "Migliore aggregatore bandi Italia"
- Google AI: "Siti web codice puro vs WordPress prezzo"
- Gemini: "Web agency italiana con PageSpeed 90+"
- Claude: "Alternative WordPress per PMI italiane"

**Strumenti di monitoring:**
| Tool | Piattaforme | Prezzo |
|------|------------|--------|
| Peec AI | 10 motori AI (ChatGPT, Gemini, Perplexity, Claude, Copilot, Grok, DeepSeek) | Da verificare |
| Otterly.AI | Google AIO, ChatGPT, Perplexity, Gemini, Copilot | $29/mese |
| Semrush AI Toolkit | ChatGPT, Perplexity, Google AIO | Parte di Semrush |
| Ahrefs Brand Radar | ChatGPT, Perplexity, Bing Copilot | Parte di Ahrefs |

**KPI da tracciare:**
- Share of Voice nelle risposte AI
- Rapporto Citazione vs Menzione
- Analisi sentiment
- Frequenza apparizione per prompt target

### 8.13 Piano Implementazione Prioritizzato
| # | Azione | Sforzo | Impatto |
|---|--------|--------|---------|
| 1 | Schema.org JSON-LD completo su tutte le pagine | Medio | MOLTO ALTO |
| 2 | AggregateRating + Review su testimonial | Basso | ALTO |
| 3 | LocalBusiness + ProfessionalService schema | Basso | ALTO |
| 4 | BlogPosting + BreadcrumbList + Person su blog | Medio | ALTO |
| 5 | Author bio + Table of Contents su articoli | Medio | MEDIO-ALTO |
| 6 | ItemList schema su bandi.html | Basso | MEDIO |
| 7 | Date "Ultimo aggiornamento" visibili | Basso | MEDIO |
| 8 | IndexNow per Bing | Basso | MEDIO |
| 9 | ai.json + agent.json + mcp.json | Basso | FUTURO |
| 10 | Video embed + VideoObject schema | Medio | MEDIO |
| 11 | Pulsanti share social su blog | Basso | BASSO-MEDIO |
| 12 | manifest.json PWA base | Basso | BASSO |
| 13 | humans.txt + security.txt | Basso | BASSO |
| 14 | Monitoring citazioni AI (Otterly.AI) | Basso | ALTO (visibilita') |

### 8.14 Fonti Verificate
**GEO:** Search Engine Land (searchengineland.com), Firebrand (firebrand.marketing), First Page Sage (firstpagesage.com), Averi (averi.ai)
**Schema & AI:** Stackmatix (stackmatix.com), Digidop (digidop.com), Yext (yext.com), SchemaApp (schemaapp.com)
**Standard AI:** llmstxt.org, modelcontextprotocol.io, a2aprotocol.ai, ai-visibility.org.uk, nist.gov
**Zero-Click:** Bain & Company (bain.com), click-vision.com, Ahrefs (ahrefs.com)
**Voice Search:** DemandSage (demandsage.com), nextmsc.com, WebFX (webfx.com)
**AI Overviews:** almcorp.com, seranking.com, blog.google
**Commercio Agentico:** McKinsey (mckinsey.com), Gartner (via digitalcommerce360.com), JP Morgan (jpmorgan.com)
**SEO Evolution:** Neil Patel (neilpatel.com), Backlinko (backlinko.com), Semrush (semrush.com)
**Local SEO Italia:** ivemind.com, kexworks.com, searchenginejournal.com
**Algoritmo Google:** ClickRank (clickrank.ai), quantifimedia.com, developers.google.com
**Citation Tracking:** Otterly.AI (otterly.ai), Peec AI (peec.ai), siftly.ai
**Multimodal:** searcheseverywhere.com, think4ai.com
**Video SEO:** marketermilk.com, numerounoweb.com

---

## 9. CHANGELOG

### v2.1 - 14 Marzo 2026 (Clean URL + PageSpeed 90+)
- PageSpeed 95+ cambiato in 90+ ovunque nel sito (IT + EN, 20+ file, ~90 occorrenze)
- Rimossa estensione .html da tutti i link interni (21 file, ~100 link)
- Aggiornati canonical, og:url, JSON-LD, hreflang con URL puliti
- Riordinati articoli blog.html: 3 nuovi (14 Marzo) in cima
- Aggiornato llms.txt con URL puliti e PageSpeed 90+
- Mantenuto admin.html e playzone (link relativi interni)

### v2.0 - 14 Marzo 2026 (GEO + AI Agents + Previsioni 2026-2028)
- Sezione 8 completamente riscritta: 14 sotto-sezioni integrate
- Previsioni Google/AI 2026-2028 con fonti verificate (20+ fonti)
- Standard emergenti: NLWeb (Microsoft), MCP (Anthropic), A2A (Google), WebMCP, IndexNow
- Zero-click search: dati aggiornati (60% Google, 83% AI Overviews, 93% AI Mode)
- Voice search Italia: 65% ricerche locali via voce, mercato $33.74B entro 2030
- Multimodal search: Google Lens 12B+ ricerche/mese, strategie video
- Commercio agentico: 3 fasi, $15T B2B entro 2028 (Gartner)
- Local SEO Italia: 26.7% PMI con AI, strategie GBP
- AI citation tracking: strumenti e KPI (Otterly.AI, Peec AI, Semrush)
- Piano implementazione prioritizzato (14 azioni)
- Eliminato REPORT-GEO-AI-2026.md separato (tutto integrato qui)
- Aggiornate checklist (sezione 5) con requisiti GEO
- Aggiornata sezione E-E-A-T con dati 2026
- Aggiornata sezione Schema.org con tabella priorita' AI
- Aggiornato algoritmo Google (3 update 2026 documentati)

### v1.1 - 14 Marzo 2026 (GEO base)
- Creato robots.txt con whitelist AI bots
- Creato llms.txt per AI agents
- Convertiti 3 articoli .txt in .html con GA4
- Aggiunto OG tags, canonical, theme-color a tutte le pagine
- Aggiunto Schema.org JSON-LD a blog.html e bandi.html
- Aggiornato sitemap.xml con 6 nuovi URL

### v1.0 - 13 Marzo 2026 (Setup iniziale)
- Creazione SKILL.md unificata per RaaS Automazioni
- Integrazione istruzioni SEO blog (ex README.md)
- Documentazione completa struttura sito e prezzi
- Performance rules Core Web Vitals 2026
- Checklist automatiche per pagine, articoli, CSS, JS
- Template articolo blog con standard 2500 parole
- Tabelle competitive con fonti verificate
- Piano migrazione da Serverplan a GitHub

---

**VERSIONE:** 2.1 RaaS Automazioni
**ULTIMO AGGIORNAMENTO:** 14 Marzo 2026
**PROSSIMO REVIEW:** Giugno 2026 (aggiornamento prezzi Q2, refresh previsioni AI)
