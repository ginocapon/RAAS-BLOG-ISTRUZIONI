# Ricerca bandi: fonti ufficiali, verifica e parole chiave

Guida operativa per discovery e validazione (allineata al progetto RaaS: URL istituzionali, no claim inventati).  
Skill Cursor correlata: `.cursor/skills/bandi-nuove-fonti/SKILL.md`.

---

## 1. Verifica delle fonti

### Cosa considerare “ufficiale”

| Livello | Esempi di ambito | Indizi di autenticità |
|--------|-------------------|------------------------|
| **UE** | Programmi quadro, gare, progetti | Domini `europa.eu`, `ec.europa.eu`; [Funding & Tenders Portal](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home) |
| **Italia** | Ministeri, agenzie, PNRR | `gov.it`, siti ministeriali (es. [MIMIT](https://www.mimit.gov.it/), MASE, MiC, MUR), [incentivi.gov.it](https://www.incentivi.gov.it/), Invitalia, enti nazionali |
| **Regioni / Province / Comuni** | Bandi territoriali | Domini `.gov.it`, portali `regione.*`, `provincia.*`, comuni su domini istituzionali |
| **CCIAA** | Voucher, PID, bandi camera | `*.camcom.it`, [Unioncamere](https://www.unioncamere.gov.it/), PID collegati |

**Nota nomenclatura:** le funzioni un tempo ricollegate al **MISE** sono oggi in gran parte di competenza del **MIMIT** (Ministero delle Imprese e del Made in Italy). Verificare sempre l’ente firmatario sull’avviso.

### Portale nazionale (riferimento verificabile)

- **[incentivi.gov.it](https://www.incentivi.gov.it/)** — portale nazionale per incentivi e agevolazioni della PA; in comunicazione istituzionale è associato al **MIMIT** (es. [notizie su incentivi.gov.it](https://www.mimit.gov.it/it/notizie-stampa/portale-incentivi-gov-it-oltre-1000-gli-incentivi-pubblicati-e-374-le-amministrazioni-coinvolte)). I numeri di bandi/amministrazioni **cambiano nel tempo**: non copiarli in contenuti pubblici senza averli ricontrollati sul sito.

### Controlli incrociati (autenticità)

1. **Stesso provvedimento** ripetuto sul sito dell’**ente erogatore** (non solo aggregatore).
2. Presenza di **riferimenti normativi** (DGR, DM, avviso regionale, CUP/CIG se gara PA).
3. **Contatti istituzionali** (PEC o area trasparenza dello stesso ente).
4. **Red flag:** unica fonte su dominio non istituzionale; landing “lascia email”; testo generico senza allegati ufficiali.

#### Allineamento con filtri pubblici e campi Supabase (`bandi.html` / `public.bandi`)

Il motore di discovery e l’ingest devono produrre record **compatibili** con ciò che l’utente filtra sul sito e con ciò che il datalist suggerisce (vedi `tools/build-bandi-keyword-stats.js`).

| Campo DB / JSON | Uso nel sito | Valori attesi / note |
|-----------------|--------------|----------------------|
| **`regione`** | Select “Regione” + ordinamento | `Nazionale` oppure nome regione esatto (es. `Veneto`). Macro **Sud Italia** nel filtro = Abruzzo, Basilicata, Calabria, Campania, Molise, Puglia, Sardegna, Sicilia (il valore sul record resta la regione singola). |
| **`tipo_ente`** | Select “Tipo Ente” | `ministero`, `ente_nazionale`, `regione`, `cciaa`, **`ue`** (bandi/programmi UE diretti, es. Horizon), `altro`. In `FONTI`, usare lo stesso valore che deve comparire nel filtro (es. Commissione europea → `ue`). |
| **`tipo_contributo`** | Select “Tipo Contributo” | `fondo_perduto`, `tasso_agevolato`, `misto`, `credito_imposta`. Se la fonte non espone il dato, l’ingest spesso mette `misto`: in audit manuale si può affinare. |
| **`stato`** | Select “Stato” | `aperto`, `in_arrivo`, `chiuso`. |
| **`settore`** | **Non** ha select dedicata: entra nella **ricerca testuale** (insieme a titolo, descrizione, ecc.) | Testo libero coerente con il corpus (es. `Digitalizzazione`, `Turismo`). Utile per intersezione semantica in UI. |
| **`ente`** | Visualizzato in scheda; ricerca full-text | Nome erogatore riconoscibile (stesso brand del sito istituzionale quando possibile). |

**Suggerimenti datalist:** `by_regione` e `by_tipo_ente` nel JSON keyword sono chiavi esatte. Per `Sud Italia` il front-end unisce i bucket delle otto regioni meridionali; in ingest non si scrive `regione: "Sud Italia"` sul record.

---

## 2. Parole chiave specifiche (template)

Sostituisci `[settore]`, `[Regione]`, `[Provincia]`, `[Comune]`, `[ente]`.

### Nazionale

- `bando [settore] site:gov.it`
- `avviso pubblico [ente] fondo perduto`
- `contributi imprese site:incentivi.gov.it`
- `PNRR [misura] avviso site:gov.it` / `site:mimit.gov.it`

### Regionale

- `bando [settore] [Regione]`
- `avviso pubblico regione [nome] imprese`
- `contributi fondo perduto [Regione]`
- `DGR [Regione] contributi` (dove le regioni pubblicano su delibere)

### Provinciale / Città metropolitana

- `avviso pubblico provincia [nome]`
- `bandi imprese città metropolitana [nome]`

### Comunale

- `avviso pubblico comune [nome]`
- `regolamento contributi comune [nome]`
- `bando imprese comune [nome]`

### Attenzione semantica

- **“Gara d’appalto”** ≠ sempre incentivo a fondo perduto: filtrare con **contributi**, **agevolazioni**, **voucher**, **fondo perduto** se l’obiettivo è finanziamento alle imprese, non solo appalti.

---

## 3. Strategie di ricerca

### Portali istituzionali

- Cercare sezioni: **Bandi e finanziamenti**, **Imprese**, **Sviluppo economico**, **Trasparenza → Bandi di concorso**.
- Usare **filtri per beneficiario** (PMI, startup, terzo settore) e **calendario scadenze** dove presenti.

### Motori di ricerca

- Operatori: virgolette per frasi esatte, `site:dominio.it`, combinazioni `AND` / `OR`.
- **Google Alerts** (o equivalenti) con query strette, es.: `"avviso pubblico" AND "fondo perduto" AND "Veneto"` per ridurre rumore.

### Workflow interno al repo

- Estrarre keyword dal corpus: `npm run build-bandi-keywords` → `data/bandi-keyword-stats.json` (`by_regione`, `by_tipo_ente`, `global`).
- Aggiungere solo **URL verificati** in `FONTI` dentro `supabase/functions/manutenzione-bandi/index.ts`, poi deploy function.

---

## 4. Esempi pratici (query + dove approfondire)

| Ambito | Esempi di query | Dove approfondire (tipo) |
|--------|------------------|----------------------------|
| **Lombardia** | `bandi imprese Lombardia fondo perduto`, `avviso pubblico Regione Lombardia` | Portale bandi regionale, delibere Giunta |
| **Veneto** | `contributi Veneto PMI`, `bandi digitalizzazione Veneto` | Portale regione Veneto / bandi regionali |
| **Area Bologna / Emilia-Romagna** | `bandi Camera Commercio Bologna`, `avviso metropolitana Bologna imprese` | CCIAA Bologna, Città metropolitana, Regione Emilia-Romagna |
| **Nazionale / innovazione** | `smart start invitalia`, `incentivi.gov.it startup` | Invitalia, incentivi.gov.it, MIMIT |

---

## 5. Aggiornamenti e monitoraggio

### Affidabili

- Newsletter degli **enti erogatori** (Regioni, CCIAA, Invitalia, ministeri).
- **RSS/Atom** dei portali che li espongono (se presenti).
- **Manutenzione programmata** (Edge Function `manutenzione-bandi`, admin RaaS).

### Con cautela

- **Social / Telegram / gruppi Facebook**: utili come **radar**, mai come prova di ufficialità senza link al sito istituzionale.
- **Aggregatori commerciali** (es. BandiOnline, Eurodesk, CeSPI, ANCI come punti di ingresso): usare per **discovery**, poi **obbligo** di risalire alla pagina ufficiale dell’ente (coerente con `tools/bandi-link-policy.js`).

---

## 6. Checklist tipologie di fonti (non esaustiva)

### Bandi europei

- [Funding & Tenders Portal (UE)](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home)
- CORDIS (progetti e risultati)
- Programmi: Horizon Europe, Erasmus+, COSME, Interreg, LIFE, Europa creativa (sempre da siti UE ufficiali)

### Bandi nazionali (Italia)

- Governo / Presidenza del Consiglio (dove pubblicati provvedimenti trasversali)
- Ministeri (MIMIT, MASE, MiC, MUR, … secondo materia)
- [incentivi.gov.it](https://www.incentivi.gov.it/)
- Invitalia, SIMEST, INAIL, SACE, CDP (secondo misura)
- Italia Domani / PNRR (collegamenti da fonti istituzionali)

### Bandi regionali e locali

- Portale di **ogni Regione** (e Province autonome)
- **Province / Città metropolitane / Comuni** (trasparenza e area economica)
- Query tipo: `bandi provincia [nome]`, `bandi comune [nome]` + verifica dominio istituzionale nei risultati

### Camere di Commercio

- Unioncamere, singole CCIAA, PID

---

## 7. Matrice ecosistema enti e punti di intersezione

Obiettivo: massimizzare le **sovrapposizioni** tra canali (stessa misura vista da incentivi.gov, da sito ministeriale, da regione, da CCIAA) senza duplicare URL in pubblicazione.

### Livello UE

| Ruolo | Dove cercare | Incrocio tipico |
|-------|----------------|-----------------|
| Programmi diretti | [Funding & Tenders](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/home), siti di programma (Horizon, LIFE, Digital Europe, Creative Europe, Interreg) | Scheda UE + pagina nazionale “info day” / ufficio progetti (MUR, MIMIT, regioni) |
| Politiche di coesione | Open Data progetti, siti regioni (FESR/FSE+), [incentivi.gov.it](https://www.incentivi.gov.it/) | Stesso CUP / stesso titolo programma in più portali |

### Livello Stato e agenzie

| Tipologia | Esempi di enti / aree | Query e sezioni sito |
|-----------|------------------------|----------------------|
| Ministeri economici / impresa | MIMIT, MASAF, MASE, MUR, MiC, MiTE, Ministero Turismo | `site:*.gov.it` + “avviso”, “contributi”, “bando”, “decreto”; aree “Imprese”, “Incentivi”, “Trasparenza” |
| Agenzie strumentali | Invitalia, SIMEST, SACE, CDP (dove pertinente), ICE, GSE, INAIL, ISPRA (bandi settoriali) | Pagine “cosa facciamo”, “bandi”, “finanziamenti” |
| Coesione / PNRR | Agenzia per la coesione, Italia Domani, siti missione/ministero | Collegare sempre alla **scheda incentivi.gov** o al DM/DPCM di riferimento |
| Enti vigilati / partecipati | GSE, Terna (bandi territoriali), enti consortili | Filtrare “sovvenzioni” vs “gare” in trasparenza |

### Livello sub-statale

| Tipologia | Dove | Intersezione |
|-----------|------|----------------|
| Regioni e province autonome | Portali bandi dedicati, BUR, sportelli (es. Lazio Innova, Sistema Puglia) | CCIAA e unioni di comuni spesso **rimandano** alle stesse misure: utile per discovery, link finale = regione |
| Città metropolitane, province, unioni di comuni | Trasparenza, “Sviluppo economico” | `avviso pubblico` + nome ente + `site:.gov.it` |
| Comuni | Regolamenti contributi, bandi negozi/centro storico | Molto frammentato: priorità per capoluoghi e comuni >50k ab. se obiettivo è copertura |
| **GAL / FLAG / LAG** (sviluppo locale LEADER) | Siti GAL, regione (PSR), Rete Rurale | Spesso dominio **non** `.gov.it`: usare per discovery, poi scheda su `regione.*` / BUR se esiste |
| Camere di commercio | `*.camcom.it`, PID | Voucher e digitalizzazione; sovrapposizione con misure regionali |
| Fondazioni (caritative, bancarie, territoriali) | Solo se **avviso pubblico** con link a delibera / convenzione | Trattare come `altro` o `ente_nazionale` a seconda dello statuto; verificare policy link in `tools/bandi-link-policy.js` |
| Università / IRCCS / hub innovazione | Bandi spin-off, brevetti, PNRR | Incrocio con MUR e regioni (R&S, FESR) |

### Semantica “chi pubblica cosa”

- **Erogatore** (chi firma il contributo) ≠ **Gestore** (Invitalia, banca, regione) ≠ **Piattaforma** (incentivi.gov). In discovery conviene cercare tutti e tre i ruoli per non perdere varianti di URL.
- **Gare e appalti** PA compaiono spesso accanto ai contributi: separare con keyword *imprese*, *PMI*, *voucher*, *fondo perduto*.

---

## 8. Tipologie di misura (oltre la parola “bando”)

Per intercettare tutti gli enti che “si occupano” di agevolazioni, includere nelle ricerche anche:

| Forma | Esempi di parole chiave |
|-------|-------------------------|
| Avviso / manifestazione di interesse | `manifestazione di interesse`, `MIS`, `preinformazione` |
| Decreto / DM / DPCM | `decreto ministeriale`, `riparto fondi`, `graduatoria` |
| Credito d’imposta / decontribuzione | spesso **non** sono “bandi”: restano utili in corpus se il sito le classifica come opportunità (tipo contributo `credito_imposta`) |
| Prestiti / garanzie | MCC, Confidi, accordi bancari — verificare se sono nel perimetro prodotto o solo informativi |
| Regimi di aiuto | RNA, de minimis — utile per **contesto** e verifica compatibilità, raramente come listing HTML scrape |

---

## 9. Workflow: massimizzare le intersezioni (senza rumore)

1. **Baseline corpus** — `npm run build-bandi-keywords`: leggere `by_regione` e `by_tipo_ente` per vedere dove il DB è scarso (poche occorrenze o assenza di chiavi).
2. **Hub nazionale** — Per ogni nuova misura su incentivi.gov, annotare ente gestore e cercare la **pagina dedicata** sul sito dell’ente (secondo URL per `provenance_interna` / coerenza titoli).
3. **Espansione geografica** — Per ogni regione sotto-rappresentata: portale regionale + 1–2 CCIAA capoluogo + Città metropolitana se esiste.
4. **Espansione tipologica** — Per ogni `tipo_ente` scarso: aggiungere fonti che riempiano quel bucket (es. più `ue` se mancano call europee strutturate).
5. **Verifica filtri** — Dopo ingest, campionare record e provare filtri su `bandi.html` (reg macro Sud, tipo UE, tipo contributo).
6. **Dedup** — Stesso provvedimento su più siti: un solo `url` pubblico preferibilmente quello dell’ente erogatore o della scheda incentivi.gov se canonica.

---

## 10. Prompt riutilizzabile (per agente o team)

```
Per ogni bando in lista:
1) Indica la fonte ufficiale (URL istituzionale) e un controllo incrociato (secondo sito .gov o ente erogatore).
2) Propone 5–10 keyword di ricerca per trovare misure simili a livello regionale/provinciale/nazionale.
3) Suggerisci una strategia (portale + alert) senza inventare URL non verificati.
```

---

*Ultimo aggiornamento struttura documento: aprile 2026 (filtri sito, matrice enti, workflow intersezioni). Aggiornare link e numeri solo dopo verifica sulle fonti citate.*
