# SKILL UNIFICATA — RaaS Automazioni
## Prompt Operativo Master Consolidato

> **Versione:** 1.0 — 13 Marzo 2026
> **Unica fonte di verita'** per lo sviluppo, manutenzione e contenuti SEO del sito.
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
8. **Prezzi bloccati** — ogni riferimento ai prezzi deve essere coerente: Essential 199€/anno, Business 249€/anno, Professional 299€/anno
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
| **Lingue** | Italiano (principale), Inglese (in sviluppo) |
| **Target** | PMI, professionisti, startup — B2B |
| **Mercato** | Italia, focus locale + nazionale |
| **Hosting** | GitHub Pages (migrazione da Serverplan in corso) |
| **Garanzia** | PageSpeed 95+ garantito, prezzi bloccati per sempre |

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
├── blog/articoli/              # Articoli blog (4 HTML + 3 TXT da convertire)
│   ├── 5-automazioni-risparmiare-20-ore-settimana.html
│   ├── lead-generation-50-lead-qualificati-automazione.html
│   ├── pagespeed-95-dati-roi.html
│   ├── sito-vetrina-macchina-business-90-giorni.html
│   ├── codice-puro-vs-wordpress-2026.txt
│   ├── lead-generation-30-50-lead-mese-2026.txt
│   └── pagespeed-95-guida-ottimizzazione-2026.txt
│
├── offerta-creator/            # Tool creazione offerte
├── playzone/                   # Sezione giochi interattivi (20+ pagine)
├── quiz/quale-tiktoker-sei/    # Quiz virale
├── tools/generatore-username/  # Generatore username
└── webstats/                   # Statistiche web
```

### 2.3 Pacchetti e Prezzi (UFFICIALI)
| Pacchetto | Prezzo/Anno | Target |
|---|---|---|
| **Essential** | 199€ | Sito vetrina base |
| **Business** | 249€ | Sito aziendale completo |
| **Professional** | 299€ | Sito avanzato con automazioni |

**Claim verificati:**
- 150+ progetti completati
- 98% soddisfazione clienti
- 3.2M€ valore generato nel portfolio
- ROI medio 300% entro 6 mesi (automazioni)

### 2.4 Servizi Core
- Realizzazione siti web in codice puro (no WordPress)
- Garanzia PageSpeed 95+
- Prezzo bloccato per sempre (anti-rincaro)
- Aggregatore bandi: monitoraggio 150+ fonti ufficiali
- Automazioni business
- Lead generation

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
PageSpeed 95+ | Codice puro | Zero plugin
Scopri: [link]
#WebAgency2026 #SitiWeb #DigitalMarketing
```

**ISTRUZIONE COMPETITORS:** I competitors menzionati devono avere:
- Preventivi ufficiali richiesti (screenshot/PDF)
- Prezzi pubblici verificabili online
- Dati performance da fonti terze (Trustpilot, Google Reviews)

### 3.3 Meta Titoli e Descrizioni (Template)
**TITLE 60 char:** `Prezzi Web Agency 2026: RaaS vs Aruba [+506%]`
**TITLE 160 char:** `Prezzi Web Agency 2026: RaaS 249€ Fisso vs Aruba 9,90€→59,99€ (+506%). Confronto Trasparente, PageSpeed 95+, Codice Puro vs WordPress. Dati Verificati.`
**META 95 char:** `Prezzi web agency 2026: RaaS 249€ bloccato vs Aruba +506% rincaro. Confronto trasparente verificato.`
**META 200 char:** `Confronto prezzi web agency 2026: RaaS 249€/anno bloccato per sempre vs Aruba 9,90€ poi 59,99€ (+506%). PageSpeed 95+, codice puro, garanzia anti-rincaro. Fonti: preventivi ufficiali, Gartner 2025.`

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
| Codice Puro (RaaS) | 95-98 | 98-100 | 0.2s | Screenshot PSI |
| WordPress (Aruba) | 45-65 | 60-75 | 3.2s | Screenshot PSI |

**REGOLA:** Se dato non disponibile, scrivere "dato non pubblico" o non inserire riga.

### 3.8 Sponsor Block (400 Parole — Claim Verificabili)
**Punti da includere:**
- 249€/anno bloccato per sempre (contratto scritto)
- PageSpeed 95+ garantito (o lavoriamo gratis)
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

### 4.3 E-E-A-T
- Pagine autore con bio, qualifiche, foto
- Author bio su articoli blog
- Person schema con jobTitle, worksFor
- Chi siamo dettagliato con storia, team, competenze
- Coerenza brand cross-platform

### 4.4 GEO — Generative Engine Optimization
1. **Frasi dichiarative** nelle prime 2 righe di ogni sezione
2. **Dati numerici specifici** e verificabili
3. **Formato:** Domanda H2 → Risposta diretta (40-60 parole) → Approfondimento
4. **Liste, tabelle, definizioni chiare**
5. **robots.txt** permissivo per AI bots (GPTBot, ClaudeBot, Google-Extended, PerplexityBot)

### 4.5 Schema.org — Best Practice
- `ProfessionalService` + `WebDesign` — su homepage
- `BreadcrumbList` — su tutte le pagine interne
- `FAQPage` — su pagine con FAQ
- `Offer` — su pagine prezzi con priceCurrency EUR

---

## 5. CHECKLIST AUTOMATICHE

### Per Ogni Nuova Pagina
- [ ] Title tag unico (max 60 char)
- [ ] Meta description unica (max 160 char)
- [ ] H1 unico con keyword
- [ ] Schema.org JSON-LD (BreadcrumbList + tipo specifico)
- [ ] Open Graph tags (og:title, og:description, og:url, og:image)
- [ ] `<meta name="theme-color">`
- [ ] `<link rel="canonical">`
- [ ] Hero image con `fetchpriority="high"`, mai `loading="lazy"` above-fold
- [ ] Font preload woff2
- [ ] CTA primario con contrasto >= 4.5:1
- [ ] Registrato in sitemap.xml
- [ ] Link navbar e footer coerenti con tutte le altre pagine
- [ ] Cookie banner presente
- [ ] Nessun CDN esterno (codice puro)

### Per Ogni Nuovo Articolo Blog
- [ ] 2500+ parole strutturate
- [ ] 28 H2/H3 distribuiti
- [ ] 35% transition words professionali
- [ ] Errori umani casuali (5-8, max 1 ogni 300 parole)
- [ ] Meta titles 60/160 char + desc 95/200 char
- [ ] JSON-LD Article + FAQPage
- [ ] 15 FAQ basate su ricerche reali ("People Also Ask")
- [ ] Tabelle confronto con FONTI CITATE
- [ ] Ogni dato numerico ha [FONTE] verificata
- [ ] Link fonti ufficiali preservati
- [ ] Zero claim inventati
- [ ] Zero attacchi personali a concorrenti
- [ ] SPINTAX social pronto (LinkedIn/Facebook)
- [ ] Tono professionale B2B — zero dialetto

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
- [ ] Convertire articoli .txt in .html (3 articoli da convertire)
- [ ] Creare nuovi articoli blog seguendo template Sezione 3
- [ ] Aggiornare dati competitors con preventivi Q1 2026

### SEO & Visibilita'
- [ ] Registrare/aggiornare Google Business Profile
- [ ] Schema.org su tutte le pagine
- [ ] Open Graph tags su tutte le pagine
- [ ] Verificare robots.txt permissivo per AI bots

### Tecnico
- [ ] Collegare form contatti a backend email
- [ ] Implementare `prefers-reduced-motion` per accessibilita'
- [ ] Critical CSS inline per LCP <2s
- [ ] Verificare HTTPS su GitHub Pages

---

## 8. CHANGELOG

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

**VERSIONE:** 1.0 RaaS Automazioni
**ULTIMO AGGIORNAMENTO:** Marzo 2026
**PROSSIMO REVIEW:** Giugno 2026 (aggiornamento prezzi Q2)
