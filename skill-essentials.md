# SKILL-ESSENTIALS — RaaS Automazioni
## Regole Operative Core (caricare SEMPRE)

> **Versione:** 2.2 — Marzo 2026
> **Quando caricare:** SEMPRE, per qualsiasi task
> **Dimensione target:** piccolo — solo regole operative essenziali
> **Fonte completa:** SKILL.md §1, §2.7, §7 (checklist base)

---

## 1. REGOLE OPERATIVE (Obbligatorie)

1. **Leggi prima** il file da modificare — mai al buio
2. **Mobile-first** — ogni modifica deve funzionare su mobile
3. **No librerie extra** — vanilla HTML/CSS/JS (zero framework)
4. **Commit** chiari e descrittivi in italiano
5. **Aggiorna** sitemap.xml quando aggiungi/rimuovi pagine
6. **No `filter: blur`** su animazioni — usare `opacity` e `transform`
7. **No `will-change` permanente** — solo su `:hover`
8. **CTA contrast** minimo 4.5:1 (WCAG AA)
9. **Prezzi bloccati** — ogni riferimento DEVE essere coerente (vedi tabella sotto)
10. **Dati verificati** — ogni dato numerico DEVE avere fonte citata
11. **Zero claim inventati** — nessuna percentuale senza fonte verificabile
12. **Anti-plagio bandi** — titoli bandi: parafrasi originali, MAI copiati dal sito ufficiale
13. **Link verificati** — ogni url_bando controllato contro fonte ufficiale
14. **Blog registrato** in blog.html + sitemap.xml per ogni nuovo articolo
15. **Branding coerente** — "RaaS Automazioni" sempre (MAI "BandiItalia")
16. **og:image obbligatorio** — ogni pagina DEVE avere `<meta property="og:image">`
17. **Skip navigation** — ogni pagina DEVE avere link skip-nav
18. **Focus visible** — ogni pagina DEVE avere `*:focus-visible` su elementi interattivi
19. **Preconnect** — `<link rel="preconnect">` per tutti i domini esterni
20. **Font-Awesome defer** — `as="style" onload="this.onload=null;this.rel='stylesheet'"`
21. **Immagini width/height** — TUTTE le `<img>` con attributi espliciti (prevenzione CLS)
22. **Sitemap auto-registrazione** — ogni nuova pagina DEVE essere in sitemap.xml
23. **Canonical = URL reale** — `canonical`, `og:url`, JSON-LD `@id` / `mainEntityOfPage` DEVONO coincidere con il path del file servito (es. articoli blog sotto `/blog/articoli/` e `/en/blog/articoli/`); hreflang EN/IT reciprocità su coppie equivalenti

---

## 2. PREZZI BLOCCATI (Riferimento rapido)

| Pacchetto | Prezzo | Incluso |
|---|---|---|
| **Base** | 399€ + IVA/anno | Sito vetrina, hosting, SSL, PageSpeed 90+, SEO, chatbot AI |
| **E-commerce** | 599€ + IVA/anno | Tutto Base + catalogo, carrello, pagamenti, ordini |
| **Commissione performance** | 3% fatturato | Solo su nuovi clienti portati tramite RaaS |
| **Abbonamento Bandi** | 50€/anno (61€ IVA incl.) | Accesso illimitato 12 mesi, newsletter settimanale |

---

## 3. DESIGN — COLORI E COMPONENTI (Riferimento rapido)

| Elemento | Valore | Uso |
|---|---|---|
| **Primario** | `#e63946` | CTA, link hover, accenti |
| **Primario dark** | `#c1121f` | Gradienti, hover pulsanti |
| **Accent** | `#f4a261` | Badge, dettagli secondari |
| **Dark** | `#1a2f47` | Background hero, sezioni scure |
| **Dark light** | `#2a4a6f` | Variante hero |
| **Text** | `#2b3d52` | Testo corpo |
| **Admin oro** | `#d4a843` | Pannello admin, badge premium |

**Palette CTA (contrast-safe):**
| CTA | Background | Testo | Ratio |
|---|---|---|---|
| Primario | `#e63946` | white | ~5:1 |
| Secondario | `#1a2f47` | white | ~12:1 |
| Accent | `#f4a261` | `#1a2f47` | ~4.5:1 |
| Admin | `#d4a843` | `#0a1628` | ~5.2:1 |

---

## 4. STILE DI COMUNICAZIONE

- Rispondi in italiano
- Sii diretto e pratico
- Proponi sempre prima di agire su operazioni irreversibili
- Tono professionale B2B — **ZERO dialetto**
- MAI dire "Vendiamo siti web" (il sito è il mezzo, non il prodotto)
- MAI "Garantiamo X lead" senza contratto specifico

---

## 5. CHECKLIST RAPIDA — NUOVA PAGINA

- [ ] Title unico (max 60 char) + Meta desc (max 160 char)
- [ ] H1 unico con keyword
- [ ] Schema.org JSON-LD (BreadcrumbList + tipo specifico)
- [ ] og:title, og:description, og:url, og:type, og:locale, **og:image**
- [ ] `<meta name="theme-color">`
- [ ] `<link rel="canonical">`
- [ ] Hero image: `fetchpriority="high"`, mai `loading="lazy"` above-fold
- [ ] Tutte le `<img>` con `width` + `height` espliciti
- [ ] CTA primario contrasto >= 4.5:1
- [ ] Registrata in sitemap.xml
- [ ] Cookie banner + GA4 (G-4T83494XDB)
- [ ] Mobile responsive
- [ ] Skip navigation link
- [ ] `*:focus-visible` styles
- [ ] Preconnect domini esterni + Font-Awesome defer

---

## 6. CHECKLIST — OGNI COMMIT

- [ ] Messaggio in italiano, descrittivo
- [ ] Nessun file sensibile (.env, credenziali)
- [ ] Prezzi coerenti (399€/599€/3%)
- [ ] Branding "RaaS Automazioni" (mai "BandiItalia")
- [ ] sitemap.xml aggiornata se pagine aggiunte/rimosse

---

> **Per regole complete:** caricare skill-seo.md (SEO/pagine), skill-content.md (blog), skill-context.md (architettura/business)
