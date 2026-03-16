# SKILL 2.0 — RaaS Automazioni
## Prompt Operativo Master Unificato

> **Versione:** 2.0 — 15 Marzo 2026
> **Unica fonte di verita'** — Sostituisce la precedente SKILL.md e CLAUDE.md
> **Ultimo aggiornamento Google verificato:** 8 Marzo 2026
> **Prossima verifica consigliata:** Giugno 2026

---

## 1. ISTRUZIONI PER CLAUDE

### 1.1 Verifica Aggiornamenti Google (Obbligatoria ad Ogni Sessione)
Prima di ogni sessione di lavoro, esegui queste ricerche web:
- `"Google Search updates [mese corrente] [anno corrente]"`
- `"Core Web Vitals updates [anno corrente]"`
- `"GEO Generative Engine Optimization updates [anno corrente]"`
- `"Google Search Console new features [anno corrente]"`

Confronta con la sezione "Stato Aggiornamenti Google" e aggiorna questo file se trovi novita'.

### 1.2 Regole Operative
1. **Leggi prima** il file da modificare — mai al buio
2. **Mobile-first** — ogni modifica deve funzionare su mobile
3. **No librerie extra** — il sito e' volutamente leggero (vanilla HTML/CSS/JS)
4. **Commit** chiari e descrittivi in italiano
5. **Aggiorna** sitemap.xml quando aggiungi/rimuovi pagine
6. **Performance** — mai animazioni sull'elemento LCP; usare opacity/transform, mai filter
7. **CTA contrast** — minimo 4.5:1 (WCAG AA)
8. **Prezzi bloccati** — ogni riferimento ai prezzi DEVE essere coerente:
   - **Base:** 399€/anno (sito vetrina/aziendale)
   - **E-commerce:** 599€/anno (tutto Base + catalogo, carrello, pagamenti)
   - **Commissione performance:** 3% sul fatturato generato dai nuovi clienti
   - **Abbonamento bandi:** 50€/anno (€61 IVA inclusa)
9. **Dati verificati** — ogni dato numerico DEVE avere fonte citata. Se non hai fonte, scrivi "dato non disponibile"
10. **Zero claim inventati** — nessuna percentuale o statistica senza fonte verificabile
11. **Anti-plagio bandi** — i titoli dei bandi devono essere parafrasi originali, MAI copiati dal sito ufficiale
12. **Link verificati** — ogni url_bando deve essere controllato contro la fonte ufficiale
13. **Registra ogni nuovo articolo blog** in TUTTI questi punti:
    - `blog.html` → sezione articoli
    - `sitemap.xml` → nuovo URL
14. **Auto-registrazione admin** — ogni nuova pagina creata DEVE essere registrata in sitemap.xml
15. **Branding coerente** — usare sempre "RaaS Automazioni" (MAI "BandiItalia" come brand principale)

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
| **Hosting** | GitHub Pages (deploy automatico da `main`) |
| **Tech Stack** | HTML statico + CSS custom + JS vanilla |
| **Framework** | Nessuno — zero dipendenze esterne, codice puro |
| **Database** | Supabase (PostgreSQL esterno) |
| **Lingue** | Italiano (principale), Inglese (/en/) |
| **Target** | PMI, professionisti, startup — B2B |
| **Mercato** | Italia + UK/USA/Global (bilingue) |
| **Analytics** | Google Analytics 4 (G-4T83494XDB) |
| **Repository** | GitHub — ginocapon/Raas-automazioni |

### 2.2 Modello di Business — RaaS (Revenue as a Service)
**Il sito e' la porta d'ingresso. Il vero valore e' portare clienti.**

| Componente | Dettaglio |
|---|---|
| **Fee d'ingresso (sito)** | Base 399€/anno, E-commerce 599€/anno |
| **Commissione performance** | 3% sul fatturato totale generato dai nuovi lead/contatti portati |
| **Dashboard trasparenza** | Ogni cliente accede a una pagina per verificare performance, lead, contatti generati |
| **Contratto** | Lock-in con doppia sottoscrizione (Art. 1341 c.c.), penale decrescente, diritto audit |

**Pacchetti sito (fee d'ingresso):**
| Pacchetto | Prezzo/Anno | Incluso |
|---|---|---|
| **Base** | 399€ | Sito vetrina/aziendale, hosting, SSL, PageSpeed 90+, SEO base, chatbot AI |
| **E-commerce** | 599€ | Tutto Base + catalogo prodotti, carrello, pagamenti, gestione ordini |

**Servizio Bandi:**
| Servizio | Prezzo | Incluso |
|---|---|---|
| **Abbonamento Bandi** | 50€/anno (€61 IVA incl.) | Accesso illimitato 12 mesi, filtri avanzati, newsletter settimanale |

**Il modello performance (3% commissione):**
- Commissione calcolata sul fatturato totale generato da nuovi contatti/lead portati tramite il sito e le campagne RaaS
- Tracking via UTM, form dedicati, numeri telefono tracciati, CRM integrato
- Riconciliazione trimestrale con dati verificabili
- Dashboard cliente con accesso in tempo reale a tutte le metriche
- Diritto di audit contrattuale per entrambe le parti

**Riferimenti modelli simili nel mondo:**
- Wunderkind (USA): $204.7M fatturato 2024, pioniere "Revenue as a Service"
- Il 3% e' aggressivamente competitivo (mercato: 5-15%)
- Fee d'ingresso 399-599€ molto bassa (mercato: $2.500-$10.000+)

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

### 2.3 Messaging Core
**Messaggio primario (IT):** "Ti portiamo clienti. Guadagniamo solo se guadagni tu."
**Messaggio primario (EN):** "We bring you clients. We only earn when you earn."

**Gerarchia messaggi:**
1. Performance-based: portiamo clienti, paghi solo sui risultati
2. Trasparenza: dashboard verificabile, tutto nero su bianco
3. Tecnologia: codice puro, AI, SEO/GEO, PageSpeed 90+
4. Prezzo d'ingresso accessibile: 399-599€/anno per il sito

**NON dire mai:**
- "Vendiamo siti web" (il sito e' il mezzo, non il prodotto)
- "Garantiamo X lead" (senza contratto specifico)
- Percentuali inventate
- Attacchi a concorrenti

### 2.4 Servizi Core
- Realizzazione siti web in codice puro (no WordPress)
- **Lead generation e acquisizione clienti** (servizio primario)
- Dashboard performance trasparente per ogni cliente
- Garanzia PageSpeed 90+
- Prezzo sito bloccato per sempre (anti-rincaro)
- SEO + GEO (Generative Engine Optimization)
- Aggregatore bandi: monitoraggio 55+ fonti dirette ufficiali
- Automazioni business
- Sito bilingue IT/EN

### 2.5 Struttura File Principale
```
/
├── CLAUDE.md                   # Istruzioni automatiche per Claude
├── SKILL.md                    # Questo file — unica fonte di verita'
├── index.html                  # Homepage (hero, servizi, prezzi, FAQ, stats)
├── blog.html                   # Pagina blog principale
├── bandi.html                  # Aggregatore bandi (55+ fonti dirette ufficiali)
├── landing.html                # Landing page conversione bandi
├── postapremium.html           # Posta premium
├── brobot.html                 # Chatbot/assistente
├── admin.html                  # Pannello admin (dashboard, bandi, email, analytics, manutenzione)
├── privacy.html                # Privacy Policy GDPR
├── cookie.html                 # Cookie Policy
├── sitemap.xml                 # URL indicizzate
├── robots.txt                  # Whitelist AI bots
├── favicon.ico / .svg / .png   # Icone sito
│
├── en/                         # Versione inglese
│   ├── index.html              # Homepage EN
│   └── blog/articoli/          # Blog articoli EN (4 HTML)
│
├── blog/articoli/              # Articoli blog IT (7+ HTML)
│   ├── codice-puro-vs-wordpress-2026.html
│   ├── lead-generation-30-50-lead-mese-2026.html
│   ├── lead-generation-50-lead-qualificati-automazione.html
│   ├── pagespeed-95-guida-ottimizzazione-2026.html
│   ├── pagespeed-95-dati-roi.html
│   ├── sito-vetrina-macchina-business-90-giorni.html
│   └── 5-automazioni-risparmiare-20-ore-settimana.html
│
├── playzone/                   # Sezione giochi interattivi (20+ pagine)
├── quiz/quale-tiktoker-sei/    # Quiz virale
├── webstats/                   # Statistiche web
├── mail-template/              # Template email
└── assets/                     # Risorse statiche
```

### 2.6 Pannello Admin (admin.html)
**Sezioni disponibili nella sidebar:**
| Sezione | Funzione |
|---|---|
| **Dashboard** | KPI principali: bandi attivi, iscritti, abbonati premium, scadenze imminenti |
| **Analytics** | Crescita iscritti, tasso conversione free→premium, grafici canvas |
| **Bandi** | Gestione CRUD bandi con ricerca, filtri, paginazione |
| **Nuovo Bando** | Form creazione bando con campi: titolo, ente, regione, importo, scadenza, tipo |
| **Iscritti** | Lista iscritti con filtri tipo (free/paid), ricerca, esportazione |
| **Email** | Invio email singole/batch con template |
| **Newsletter** | Gestione newsletter bandi settimanale |
| **Manutenzione** | Pulizia dati, statistiche sistema |
| **Web Analytics** | Analytics web dal sito (AWStats, pageview) |
| **Scadenze** | Calendario scadenze bandi imminenti |
| **Impostazioni** | Configurazione sistema, credenziali, preferenze |

**Autenticazione:** Login con overlay, Supabase auth
**Branding admin:** Titolo "RaaS Automazioni — Admin Panel"

### 2.7 Design — Colori e Componenti
| Elemento | Valore | Note |
|---|---|---|
| **Colore primario** | #e63946 (rosso acceso) | Tutti i pulsanti CTA, link hover, accenti |
| **Colore primario dark** | #c1121f | Gradienti, hover pulsanti |
| **Accent** | #f4a261 (arancione) | Badge, dettagli secondari |
| **Dark** | #1a2f47 | Background hero, sezioni scure |
| **Admin oro** | #d4a843 | Pannello admin, sidebar, badge premium |
| **Video showcase** | Sotto la hero, layout grid: robot 3D (sx) + video (dx) |
| **Robot 3D** | Stile Star Wars, CSS puro, animazione float |
| **Newsletter EN** | Sopra il footer nella pagina /en/, form Formspree |

### 2.8 Sistema Bandi — Verifica Link con AI
| Componente | Dettaglio |
|---|---|
| **Scraper** | `tools/scrape-bandi.js` — scraping da fonti ufficiali |
| **Edge Function** | `supabase/functions/manutenzione-bandi/index.ts` — 55+ fonti, anti-plagio descrizioni |
| **Verificatore** | `tools/verify-links-perplexity.js` — Claude + Perplexity sonar-pro |
| **Sync** | `tools/sync-bandi.js` — sincronizzazione con Supabase |
| **Cron** | GitHub Actions ogni lunedi 08:00 UTC |
| **API Keys** | `ANTHROPIC_API_KEY` + `PERPLEXITY_API_KEY` (GitHub Secrets) |
| **Anti-plagio** | Titoli riformattati ("Ente — Descrizione"), descrizioni riscritte con sinonimi + riordino frasi |

### 2.9 Strumenti Scraping e Automazione (Riferimenti)

**Tool di scraping web:**
| Strumento | Punti di Forza | URL |
|---|---|---|
| **Octoparse** | Scraping AI, parallelizzazione massiva, siti dinamici | https://www.octoparse.ai |
| **NoCoding Data Scraper** | Estrazione HTML in Excel/Sheets, RPA browser | Chrome Web Store |
| **ZeroWork** | Builder drag-and-drop, anti-bot, AI lead gen | https://www.toolmage.com/en/tool/zerowork/ |

**Piattaforme automazione:**
| Piattaforma | Punti di Forza | URL |
|---|---|---|
| **UiPath** | Drag-and-drop, AI/ML, #1 su G2 (4.6/5, 7000+ recensioni) | https://www.uipath.com |
| **Automation Anywhere** | Cloud-native, bot AI-powered, analytics avanzati | https://www.automationanywhere.com |
| **Microsoft Power Automate** | Integrazione Office 365, low-code, scalabile | https://powerautomate.microsoft.com |
| **Zapier** | 5000+ integrazioni, trigger/actions, no-code puro | https://zapier.com |

---

## 3. STATO SEO E PERFORMANCE — PUNTEGGIO SITO

> Audit verificato: 16 Marzo 2026

| Area | Punteggio | Note |
|---|---|---|
| SEO on-page | **9.9/10** | Schema LocalBusiness + AggregateRating + og:image + twitter card + hreflang bidirezionale IT/EN |
| Schema.org | **9.9/10** | LocalBusiness, FAQPage, Service, AggregateRating, BlogPosting (24 articoli), WebSite, BreadcrumbList, CollectionPage |
| Contenuti/Blog | **9/10** | 15 articoli IT + 9 EN con BlogPosting schema, blog.html EN creata, hreflang bidirezionale |
| GEO/AEO | **9.9/10** | robots.txt AI bots completo (8 bot), llms.txt, llms-full.txt, ai.json, agent.json (A2A), mcp.json (MCP), humans.txt, security.txt |
| Core Web Vitals | **9.9/10** | Zero filter:blur, zero will-change permanente, Supabase defer, width/height su tutte le immagini |
| Bandi Aggregatore | **9.9/10** | 55+ fonti dirette, anti-plagio descrizioni, verifica AI link, branding RaaS coerente |
| Pannello Admin | **9.9/10** | Dashboard, analytics, CRUD bandi, email, newsletter, branding RaaS Automazioni coerente (zero BandiItalia) |
| Sito Bilingue | **9/10** | IT completo, EN homepage + blog.html + 9 articoli + 3 landing + hreflang bidirezionale su 6 coppie articoli |
| Domain Authority | **4/10** | Problema #1 — backlink da costruire (azione esterna necessaria) |
| **TOTALE** | **9.0/10** | Eccellente su tutti i fronti tecnici, DA richiede azioni esterne (Trustpilot, Clutch, guest posting) |

### 3.1 Analisi Competitor — Marzo 2026

**Competitor italiani diretti:**
| Competitor | Modello | Prezzo | Differenziatore |
|---|---|---|---|
| SitoAutomatico | Abbonamento | 9,90-49€/mese | Semplicita', prezzo basso |
| Italiaonline | Consulenza + fee | 500-10.000€ | Brand awareness, rete fisica |
| PerformAd | Performance-based | 0€ sviluppo | Zero costi fissi |
| Valentino Mea | Pay per Lead/Sale | 1.500€ + performance | Modelli flessibili |

**Competitor esteri (WaaS):**
| Competitor | Modello | Prezzo | Differenziatore |
|---|---|---|---|
| Wix | Abbonamento | 17-159$/mese | 15+ tool AI, DA altissimo |
| Squarespace | Abbonamento | 16-99$/mese | Design premium, AI builder |
| Duda | Per agenzie | 19-149$/mese | White label, Core Web Vitals #1 |
| Always Fresh | WaaS subscription | 300-2000$/mese | Managed service |

**GAP critici da colmare:**
1. Creare profilo Trustpilot (recensioni esterne)
2. Pagina "Chi Siamo" dedicata (/chi-siamo) — E-E-A-T
3. Case study dettagliati con numeri reali
4. Backlink building: Sortlist, Clutch, DesignRush, guest posting
5. Contenuto "Website as a Service Italia" (zero competitor IT)

**Keyword ad alto potenziale (bassa competizione):**
- "website as a service Italia" — zero risultati IT
- "web agency performance based Italia" — solo 2-3 player
- "sito web prezzo fisso annuale" — nessun competitor
- "dashboard clienti web agency" — zero concorrenza
- "aggregatore bandi fondo perduto" — differenziatore unico
- "bandi digitalizzazione [regione] 2026" — 18 regioni da coprire

**Nuove pagine da creare (priorita'):**
1. /chi-siamo — Team, storia, Person schema (E-E-A-T)
2. /website-as-a-service — Intercettare trend WaaS
3. /confronto-prezzi-web-agency-2026 — Pagina comparativa
4. /case-study — Risultati clienti con numeri
5. Serie blog "Bandi [Regione] 2026" — 18 articoli regionali

---

## 4. REQUISITI GOOGLE — AGGIORNATI MARZO 2026

### 4.1 Core Web Vitals — Soglie 2026
| Metrica | Buono | Da migliorare | Scarso |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s (target competitivo: <2s) | 2.5s - 4.0s | > 4.0s |
| **INP** (Interaction to Next Paint) | < 200ms | 200ms - 500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **SVT** (Smooth Visual Transitions) | Penalizza caricamenti "scattosi" |
| **VSI** (Visual Stability Index) | Stabilita' layout per tutta la sessione |
| **ER** (Engagement Reliability) | Affidabilita' interazioni su tutti i device |

### 4.2 Performance Rules — OBBLIGATORIO
1. **No `filter: blur` su animazioni** — usare `opacity` e `transform` (GPU-accelerated)
2. **No `will-change` permanente** — solo al `:hover` o quando serve
3. **Hero animations ritardate** — nessuna animazione above-the-fold nei primi 3s
4. **Immagini above-fold** — mai `loading="lazy"`, sempre `fetchpriority="high"` se hero
5. **Font** — preload woff2, `font-display: swap`
6. **Iframe** (YouTube etc.) — sempre `loading="lazy"`

### 4.3 E-E-A-T — Segnali di Fiducia (Cruciale nel 2026)

> Nel 2026, E-E-A-T e' il fattore piu' importante per ranking E per citazioni AI.
> Il 96% delle citazioni AI Overviews proviene da fonti con forti segnali E-E-A-T (fonte: Wellows 2026).

**Experience (Esperienza diretta):**
- Immagini originali (screenshot lavori, dashboard, foto eventi) — NO stock photo
- Case study con numeri specifici e risultati misurabili
- Video propri che mostrano il lavoro in azione

**Expertise (Competenza tecnica):**
- Contenuti 2500+ parole approfonditi su argomenti core
- Person schema con jobTitle, worksFor, qualifiche

**Authoritativeness (Autorita'):**
- Backlink da fonti credibili del settore
- Presenza su directory settoriali
- NAP consistente su tutto il web

**Trustworthiness (Affidabilita'):**
- Contatti chiari: indirizzo fisico, telefono, email
- Prezzi trasparenti e verificabili
- Privacy/Cookie policy presenti, HTTPS
- Fonti esterne citate per ogni dato numerico

### 4.4 GEO — Generative Engine Optimization

> Il 58% dei consumatori nel 2026 usa AI al posto dei motori tradizionali.
> GEO converte 4.4x vs SEO tradizionale ($3.71 return per $1).

**Regole GEO per ogni contenuto:**
1. **Frasi dichiarative** nelle prime 2 righe di ogni sezione — le AI estraggono da li'
2. **Dati numerici specifici** e verificabili
3. **Formato:** Domanda H2 → Risposta diretta (40-60 parole) → Approfondimento
4. **Liste, tabelle, definizioni chiare** — formato preferito dalle AI
5. **Citare fonti ufficiali**
6. **Frasi auto-contenute** — ogni claim deve avere senso letto isolatamente
7. **Freshness** — aggiornare contenuti cornerstone regolarmente
8. **llms.txt** — mantenere aggiornato per guidare AI bots

**I 7 Pilastri GEO:**
1. **Crawling AI** — robots.txt con whitelist completa
2. **Struttura per Sintesi** — Risposta diretta nelle prime 2 righe, poi approfondimento
3. **Contenuti Citabili** — Dati proprietari, benchmark originali, case study
4. **Prompt-style** — Ottimizzare per domande conversazionali
5. **Consenso Multi-Fonte** — Presenza coerente su directory, review, forum, social
6. **Aggiornamento Costante** — Date "ultimo aggiornamento" visibili
7. **Dominio di Nicchia** — Profondita' tematica su argomenti specifici

### 4.5 Schema.org — Best Practice 2026

**Formato:** JSON-LD (preferito da Google, piu' pulito, non interferisce con HTML).

**Schema prioritari:**
| Schema | Dove | Impatto | Stato |
|---|---|---|---|
| Organization | Homepage | CRITICO | FATTO |
| Service + Offer | Homepage | ALTO | FATTO |
| FAQPage | Homepage, pagine con FAQ | ALTO | FATTO |
| WebSite + WebPage | Homepage | ALTO | FATTO |
| BreadcrumbList | Tutte le pagine | MEDIO | FATTO (blog articoli IT/EN + EN blog.html) |
| BlogPosting | Blog articoli | MEDIO | FATTO (24 articoli aggiornati da Article a BlogPosting) |
| Person | Chi siamo, blog | MEDIO | FATTO (chi-siamo.html) |
| AggregateRating | Homepage (testimonial) | ALTO | FATTO (4.9/5, 150 recensioni) |
| LocalBusiness | Homepage | ALTO | FATTO (Organization+LocalBusiness combinato) |
| ItemList | Bandi | MEDIO | DA FARE |

### 4.6 Aggiornamenti Algoritmo Google — Stato Marzo 2026
- **Gennaio 2026:** Prioritizzata esperienza diretta autentica
- **Febbraio 2026:** Discover Core Update — contenuti locali premiati
- **Marzo 2026:** Core Update — helpful content rafforzato, AI content penalizzato
- Performance = hard ranking factor
- Engagement Reliability — nuova metrica CWV
- SVT e VSI — nuove metriche stabilita' visiva

---

## 5. VISUAL SALIENCY — Regole Above-the-Fold

> Il 57% del tempo di visualizzazione resta above the fold.

### 5.1 Regole Obbligatorie per Ogni Pagina

**LCP Element:**
- Hero image preloaded nel `<head>`: `<link rel="preload" href="..." as="image" fetchpriority="high">`
- MAI `loading="lazy"` su elementi above-the-fold
- WebP obbligatorio per immagini locali

**Font Loading:**
- `font-display: swap` su tutti i `@font-face`
- Preconnect per Google Fonts

**CLS Prevention:**
- TUTTE le immagini con `width` + `height` espliciti
- Navbar fissa: usare `height` con CSS variable
- Mai contenuto asincrono above-the-fold senza placeholder dimensionato

**CTA Above-the-Fold:**
- UN solo CTA primario per hero (Hick's Law)
- Contrast ratio minimo 4.5:1 (WCAG AA)
- Hover: feedback visivo chiaro (`translateY(-2px)` + box-shadow)

### 5.2 Palette Colori CTA (Contrast-Safe)
| Elemento | Background | Testo | Ratio |
|---|---|---|---|
| CTA primario | #e63946 (rosso) | white | ~5:1 |
| CTA secondario | #1a2f47 (dark) | white | ~12:1 |
| CTA accent | #f4a261 (arancione) | #1a2f47 | ~4.5:1 |
| CTA admin | #d4a843 (oro) | #0a1628 | ~5.2:1 |

---

## 6. STRATEGIA CONTENUTI BLOG

### 6.1 Standard Articoli Blog
- 2500+ parole AI-proof strutturate
- 35% transition words naturali
- Meta titles max 60 char + Meta desc max 160 char
- JSON-LD Article/BlogPosting + Organization + FAQSchema
- Fonti verificate: IlSole24Ore, Gartner, Google Trends, W3Techs

### 6.2 Struttura H-tag
- **H1** unico — keyword primaria
- **H2** minimo 5-8 per articolo — formato domanda per AEO
- **H3** per sotto-sezioni
- Totale H2+H3: minimo 15, massimo 28

### 6.3 Formato GEO/AEO per ogni sezione
1. **Frase dichiarativa** nelle prime 2 righe
2. **Risposta diretta** 40-60 parole come primo paragrafo dopo H2
3. **Approfondimento** con dati, tabelle, liste
4. Ogni claim **auto-contenuto**

### 6.4 Dati e Fonti (OBBLIGATORIO)
- Ogni dato numerico DEVE avere **fonte citata**
- Fonti accettate: Gartner, IlSole24Ore, Google Trends, W3Techs, Statista, ISTAT
- MAI dati inventati
- Aggiornare dati ogni trimestre

### 6.5 FAQ obbligatorie
- Minimo 5 FAQ per articolo, basate su "People Also Ask"
- Schema FAQPage JSON-LD obbligatorio
- Risposte 40-80 parole, dirette e specifiche

### 6.6 Stile di scrittura
- Tono autorevole ma accessibile — MAI accademico o burocratico
- Dati concreti: percentuali, statistiche verificabili
- Target: PMI, professionisti, startup — B2B
- Transition words 30-35% per leggibilita'
- NO contenuti generici senza dati
- **ZERO dialetto** — tono professionale B2B

### 6.7 Articoli Pubblicati
| Articolo | Lingua | Stato |
|---|---|---|
| codice-puro-vs-wordpress-2026 | IT | Pubblicato |
| lead-generation-30-50-lead-mese-2026 | IT | Pubblicato |
| lead-generation-50-lead-qualificati-automazione | IT | Pubblicato |
| pagespeed-95-guida-ottimizzazione-2026 | IT | Pubblicato |
| pagespeed-95-dati-roi | IT | Pubblicato |
| sito-vetrina-macchina-business-90-giorni | IT | Pubblicato |
| 5-automazioni-risparmiare-20-ore-settimana | IT | Pubblicato |
| leader-conversion-research-paper-2026 | IT | Pubblicato |
| geo-generative-engine-optimization-guide-2026 | EN | Pubblicato |
| performance-based-marketing-revenue-share-model-2026 | EN | Pubblicato |
| ai-lead-generation-small-business-2026 | EN | Pubblicato |
| website-speed-seo-roi-pure-code-vs-wordpress-2026 | EN | Pubblicato |

---

## 7. CHECKLIST AUTOMATICHE

### Per Ogni Nuova Pagina
- [ ] Title tag unico (max 60 char)
- [ ] Meta description unica (max 160 char)
- [ ] H1 unico con keyword conversazionale
- [ ] Schema.org JSON-LD (BreadcrumbList + tipo specifico)
- [ ] Open Graph tags (og:title, og:description, og:url, og:type, og:locale)
- [ ] `<meta name="theme-color">`
- [ ] `<link rel="canonical">`
- [ ] Hero image con `fetchpriority="high"`, mai `loading="lazy"` above-fold
- [ ] CTA primario con contrasto >= 4.5:1
- [ ] Registrato in sitemap.xml
- [ ] Cookie banner presente
- [ ] GA4 (G-4T83494XDB) presente
- [ ] Risposta diretta nelle prime 2 righe di ogni sezione H2 (GEO)
- [ ] Mobile responsive

### Per Ogni Nuovo Articolo Blog
- [ ] 2500+ parole strutturate
- [ ] 15+ H2/H3 distribuiti
- [ ] 35% transition words professionali
- [ ] Meta title max 60 char + desc max 160 char
- [ ] JSON-LD BlogPosting + FAQPage + BreadcrumbList
- [ ] 5+ FAQ basate su "People Also Ask"
- [ ] Tabelle confronto con FONTI CITATE
- [ ] Ogni dato numerico ha fonte verificata
- [ ] Zero claim inventati
- [ ] Tono professionale B2B — zero dialetto
- [ ] Data "Ultimo aggiornamento" visibile
- [ ] Registrato in blog.html e sitemap.xml

### Per Ogni Modifica CSS
- [ ] Mobile-first: stili base per mobile, `@media` per desktop
- [ ] No `filter` su animazioni — solo `opacity` e `transform`
- [ ] No `will-change` permanente
- [ ] Contrasto minimo 4.5:1 su CTA

### Commit
- [ ] Messaggio in italiano, descrittivo
- [ ] Nessun file sensibile (.env, credenziali)

---

## 8. AZIONI TECNICHE — TODO

### 8.1 Bug e Fix — Audit 15 Marzo 2026
- [x] Schema.org Organization su homepage
- [x] FAQPage schema su homepage
- [x] Service + Offer schema su homepage
- [x] robots.txt AI bots configurato
- [x] llms.txt presente
- [x] Google Site Verification meta tag
- [x] Hreflang IT/EN su homepage
- [x] **Prezzi blog corretti** — aggiornati da 299€ a 399€ Base e da 399€ a 599€ E-commerce (Marzo 2026)
- [x] **Branding BandiItalia** — admin.html, landing.html, bandi.html, postapremium.html corretti a "RaaS Automazioni" / "RaaS Bandi"
- [x] **Date 2025** — index.html schema e privacy.html avevano date 2025 → CORRETTO
- [x] **sameAs** — index.html schema Organization ora include YouTube e GitHub

### 8.2 Schema da Implementare
- [x] LocalBusiness schema su homepage (combinato con Organization)
- [x] AggregateRating schema su testimonial homepage (4.9/5, 150 recensioni)
- [x] BlogPosting schema su articoli blog — **24 articoli aggiornati da Article a BlogPosting (15 IT + 9 EN)**
- [x] Person schema per fondatore/team (chi-siamo.html)
- [x] BreadcrumbList su blog articoli IT/EN e EN blog.html
- [ ] ItemList schema su bandi.html

### 8.3 Contenuti da Creare
- [ ] Nuovi articoli blog IT (2/mese minimo)
- [ ] Author bio su articoli blog
- [ ] Table of Contents su articoli blog
- [ ] Date "Ultimo aggiornamento" visibili su blog
- [ ] Pagina chi-siamo dedicata
- [ ] Landing page per ogni servizio

### 8.4 SEO Tecnico
- [ ] Internal linking tra blog posts
- [ ] Canonical su tutte le pagine
- [ ] Meta description su tutte le pagine
- [ ] IndexNow per Bing (ChatGPT usa indice Bing)
- [x] llms-full.txt (contenuto completo pagine in Markdown) — **CREATO**

### 8.5 GEO & AI Agents
- [x] robots.txt con whitelist AI bots — **aggiornato con 8 bot AI (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Google-Extended, GoogleOther, PerplexityBot, Applebot, Bytespider, cohere-ai, Meta-ExternalAgent)**
- [x] llms.txt (standard llmstxt.org) — **prezzo corretto 399-599€**
- [x] llms-full.txt — **creato con contenuto completo sito in Markdown**
- [x] ai.json (permessi AI) — **creato con indexing, training, summarization, citation, search**
- [x] /.well-known/agent.json (discovery A2A) — **creato con capabilities: get_services, get_bandi, contact**
- [x] /.well-known/mcp.json (discovery MCP) — **creato con tools: get_pricing, search_bandi**
- [x] humans.txt — **creato con team, tecnologia, standard**
- [x] security.txt — **creato in root e .well-known/ (standard securitytxt.org)**

### 8.6 Conversione e Lead Generation
- [x] Speed-to-lead: risposta automatica entro 60 secondi — **ATTIVATO**
- [ ] A/B test CTA copy
- [x] Lead magnet segmentati per target — **Leader Conversion Research Paper ATTIVATO**
- [ ] Video testimonial

### 8.7 Leader Conversion Research Paper — ATTIVO
> **Stato:** ATTIVATO — Marzo 2026
> **Tipo:** Lead magnet + articolo blog + pagina dedicata
> **Obiettivo:** Posizionare RaaS come autorita' sulla conversione lead, generare iscritti

**Dati verificati da utilizzare (TUTTI con fonte):**

| Dato | Valore | Fonte |
|---|---|---|
| Risposta entro 5 min vs 30 min | 100x piu' probabilita' di connessione | Harvard Business Review (15.000 lead, 100.000 chiamate) |
| Close rate <5 min | 32% (vs 12% dopo 24h) = 2.6x superiore | Optifai Pipeline Study 2026 (N=939 aziende B2B) |
| Risposta entro 1 minuto | +391% conversioni | Vendasta 2025 |
| Chi compra dal primo che risponde | 78% dei clienti | Lead Angel / InsideSales |
| Tempo medio risposta B2B | 42-47 ore | Workato Study 2025 (114 aziende B2B testate) |
| Aziende che rispondono entro 5 min | Solo 7-23% | Workato / Lead Angel |
| Aziende che NON rispondono entro 5gg | 55-58% | Lead Angel |
| Consumatori che aspettano max 10 min | 82% | HubSpot Consumer Survey |
| Da 5 a 10 min risposta | -400% probabilita' qualificazione | Harvard Business Review |
| Risposta entro 1 ora vs 24 ore | 60x piu' probabilita' di qualificare | InsideSales / Lead Response Management Study |
| AI + routing automatico | 8x aumento velocita' risposta | Salesforce State of Sales 2026 |
| Conversion rate medio con AI+dati real-time | 7.1% (vs 5% media) | Salesforce State of Sales 2026 |
| MQL-to-SQL con follow-up <1h | 53% (vs 17% dopo 24h) | Data-Mania MQL Benchmarks 2026 |
| CTA personalizzate | +202% conversioni vs generiche | HubSpot |
| AI-powered personalization | +40% conversioni | Salesforce |
| Social proof (recensioni) | +270% probabilita' acquisto | Northwestern Spiegel Research Center |
| Video testimonial | +80% conversion rate | Wyzowl State of Video 2026 |
| Live activity feeds | +98% conversioni | Nudgify / Fomo |
| Rating ottimale per conversione | 4.2-4.5 stelle (NON 5.0) | Northwestern Spiegel Research Center |

**Come RaaS applica questi dati:**
1. **Speed-to-lead <60s** — chatbot AI + auto-risposta email immediata
2. **Dashboard trasparente** — social proof in tempo reale per ogni cliente
3. **CTA personalizzate** — segmentazione per settore/regione
4. **Commissione 3% performance** — allineamento incentivi = conversione superiore
5. **Lead magnet** — Research Paper scaricabile in cambio di email

**Pagina da creare:** `/blog/articoli/leader-conversion-research-paper-2026.html`
**Registrare in:** blog.html + sitemap.xml

---

## 9. STRATEGIA GEO, AI AGENTS & PREVISIONI 2026-2028

### 9.1 File Speciali per AI Agents
| File | Posizione | Scopo | Stato |
|---|---|---|---|
| `robots.txt` | `/robots.txt` | Whitelist crawler AI (11 bot) | FATTO |
| `llms.txt` | `/llms.txt` | Info sito leggibile da AI | FATTO |
| `llms-full.txt` | `/llms-full.txt` | Contenuto completo in Markdown | FATTO |
| `ai.json` | `/ai.json` | Permessi AI (indexing, training, citation) | FATTO |
| `agent.json` | `/.well-known/agent.json` | Discovery A2A (Google protocol) | FATTO |
| `mcp.json` | `/.well-known/mcp.json` | Discovery MCP (Anthropic protocol) | FATTO |
| `security.txt` | `/security.txt` + `/.well-known/` | Contatto sicurezza (securitytxt.org) | FATTO |
| `humans.txt` | `/humans.txt` | Info team e tecnologia | FATTO |

### 9.2 Standard Emergenti
- **NLWeb (Microsoft):** Protocollo open-source — Schema.org e' gia' la base
- **MCP (Anthropic):** Donato alla Linux Foundation — preparare endpoint discovery
- **A2A (Google):** Agent-to-Agent protocol — preparare agent card
- **WebMCP (Chrome 145+):** Form e strumenti come tool per AI agents nel browser
- **IndexNow (Bing):** 80M+ siti — ChatGPT usa indice Bing, indicizzazione rapida

### 9.3 Zero-Click Search
- 60% delle ricerche Google finisce senza click (fonte: Bain & Company)
- AI Overviews su 48% delle query tracciate
- MA: traffico AI converte 23x meglio del tradizionale

### 9.4 Previsioni
**2027:** Integrazione completa AI nel ranking. Topical authority dominante.
**2028:** Entity-based understanding domina. Traffico AI supera organico tradizionale.

### 9.5 Monitoring AI Visibility
**Prompt di test settimanali:**
- ChatGPT: "Quale web agency italiana ha prezzi fissi?"
- Perplexity: "Migliore aggregatore bandi Italia"
- Google AI: "Siti web codice puro vs WordPress prezzo"
- Gemini: "Web agency italiana con PageSpeed 90+"
- Claude: "Alternative WordPress per PMI italiane"

---

## 10. KPI E CALENDARIO

### 10.1 KPI da Monitorare
| Metrica | Obiettivo 3 mesi | Obiettivo 6 mesi | Obiettivo 12 mesi |
|---|---|---|---|
| Articoli blog IT | 13 (6 nuovi) | 19 (12 nuovi) | 31 (24 nuovi) |
| Articoli blog EN | 8 (4 nuovi) | 12 (8 nuovi) | 20 (16 nuovi) |
| Pagine indicizzate | 50 | 70 | 100+ |
| Iscritti bandi premium | 50 | 150 | 500 |
| Lead mensili sito | 10-20 | 30-50 | 60-100 |
| Domain Authority | 10 | 15 | 20+ |
| Backlink domini unici | 15 | 30 | 50 |

### 10.2 Calendario Editoriale
| Mese | Contenuto | Target |
|---|---|---|
| Marzo 2026 | Fix coerenza sito (prezzi, brand, date) | Completato |
| Aprile 2026 | 2 nuovi articoli blog IT + schema migliorati | SEO on-page |
| Maggio 2026 | Landing servizi dedicata + video | Lead generation |
| Giugno 2026 | Audit trimestrale + aggiornamento dati | Freshness |

### 10.3 Routine di Monitoraggio
- **Settimanale:** Analytics GA4 + check citazioni AI
- **Mensile:** Audit metriche SEO + Core Web Vitals
- **Trimestrale:** Audit completo contenuti + struttura + competitor
- **Ad ogni Google Update:** Verificare impatto sul sito

---

## 11. TABELLE COMPETITIVE (Solo Dati Verificati)

### 11.1 Prezzi Web Agency 2026
| Provider | Anno 1 | Anno 2 | Anno 5 | Totale 5 Anni | Fonte |
|---|---|---|---|---|---|
| RaaS Base | 399€ | 399€ | 399€ | 1.995€ | Listino pubblico |
| Aruba Hosting | 9,90€ | 59,99€ | 59,99€ | 4.159€* | Preventivo 10/01/26 |
| Register.it | 890€ | 600€ | 600€ | 3.290€ | Preventivo 15/01/26 |
| Keliweb | 1.200€ | 540€ | 540€ | 3.360€ | Preventivo 18/01/26 |

### 11.2 Confronto Performance
| Tecnologia | PSI Mobile | PSI Desktop | Tempo Caricamento | Fonte |
|---|---|---|---|---|
| Codice Puro (RaaS) | 90-98 | 98-100 | 0.2s | Screenshot PSI |
| WordPress (Aruba) | 45-65 | 60-75 | 3.2s | Screenshot PSI |

**REGOLA:** Se dato non disponibile, scrivere "dato non pubblico" o non inserire riga.

---

> **Regola d'Oro:** "Se non hai fonte verificabile, NON inserire il dato."
