# Import bandi da lista aggregatore — lavorazione a gruppi da 10

**Progressione:** Gruppi **1–5** importati in `data/bandi.json` (commit cumulativo gruppi 3–5: 30 `id` prefissi `imp26g03…` `imp26g04…` `imp26g05…`). Per Gruppo 6 scrivi **continua**.

**Regola:** titoli pubblici parafrasati; `url_bando` solo fonti istituzionali. Verificare ogni URL prima del merge in `bandi.json`.

**Legenda:** `ok` = URL plausibile da ricerca web | `verificare` = aprire pagina e confermare misura/edizione | `hub` = pagina indice (utile finché non c’è il link scheda)

**Dedup vs `data/bandi.json` (già noto):** non duplicare `laz001donneimpresa` (Donne/Lazio), `mimit001sabatini` (Nuova Sabatini), né due edizioni “Nuova Impresa Lombardia” (`lom001` chiuso / `lom003` attivo) senza unificare la scheda.

---

## Gruppo 1 (voci 1–10)

| # | Titolo (parafraso) | Link istituzionale | Stato |
|---|-------------------|---------------------|-------|
| 1 | FESR ER 1.3.1 — Certificazioni processo, servizio, gestione | `https://fesr.regione.emilia-romagna.it/opportunita/opportunita-di-finanziamento/2026/rafforzamento-della-competitivita-delle-imprese-e-delle-filiere-tramite-lottenimento-di-sistemi-di-certificazione-di-processo-servizio-gestione-aziendale` | ok |
| 2 | FESR Lombardia — Tessile/moda (scheda “Next Fashion”, verificare nome “TERTIUM”) | `https://www.bandi.regione.lombardia.it/servizi/servizio/bandi/dettaglio/ricerca-innovazione/ricerca-sviluppo-innovazione/next-fashion-RLP12025046223` | verificare |
| 3 | Lazio — Donne e Impresa / PMI femminili (FESR) | `https://www.regione.lazio.it/notizie/bando-Donne-Imprese-sostegno-imprese-femminili` | ok |
| 4 | OCM Vino — Ristrutturazione vigneti (Umbria) | `https://www.regione.umbria.it/-/programma-nazionale-di-sostegno-del-settore-vino-p-n-s-` (hub PNS; scheda campagna su BUR/notizie regione) | verificare |
| 5 | Unioncamere Veneto — Contributi progetti sviluppo economico 2026 | `https://www.unioncamereveneto.it/bando-2026-per-la-concessione-di-contributi-a-sostegno-di-progetti-di-soggetti-pubblici-e-privati-per-lo-sviluppo-economico-regionale/` | verificare policy host* |
| 6 | Veneto — CSR SRA28 (imboschimento / arboricoltura) | `https://www.regione.veneto.it/web/agricoltura-e-foreste/bandi-finanziamenti` (hub) + DGR/documenti su `regione.veneto.it` per SRA28 | verificare |
| 7 | FESR ER 1.1.1 — Progetti R&S e inserimento nuovi talenti | `https://www.regione.emilia-romagna.it/talenti/le-azioni-e-i-risultati/bandi` (hub “Talenti”; scheda 2026 su FESR/notizie) | verificare |
| 8 | ER L.R. 2/2024 — Contrasto abbandono sportivo giovanile | `https://www.regione.emilia-romagna.it/sport/bandi/2024/avviso-per-la-concessione-di-contributi-per-progetti-di-contrasto-allabbandono-sportivo-giovanile` | ok |
| 9 | Piemonte L.R. 34/2004 — Oneri emissione obbligazioni PMI | `https://bandi.regione.piemonte.it/contributifinanziamenti/abbattimento-degli-oneri-connessi-allemissione-di-obbligazioni-da-parte-di` | ok |
|10 | Marche L.R. 19/2021 Misura 1 — Artigianato artistico, laboratori | `https://www.regione.marche.it/Entra-in-Regione/Artigianato-artistico/Bandi` | hub |

\* `unioncamereveneto.it` non è in `bandi-link-policy.js` come `unioncamere.it`; valutare se usare equivalente su `regione.veneto.it` / camera o estendere policy.

---

## Gruppo 2 (voci 11–20)

| # | Titolo (parafraso) | Link istituzionale | Stato |
|---|-------------------|---------------------|-------|
| 11 | Marche L.R. 19/2021 Misura 2 — Commercializzazione artigianato | `https://www.regione.marche.it/Entra-in-Regione/Artigianato-artistico/Bandi` | hub |
| 12 | GAL Ducato (ER) — SRD09 servizi base popolazione rurale | `https://galdelducato.it/aperto-lavviso-pubblico-azione-ordinaria-srd09-a-investimenti-non-produttivi-nelle-aree-rurali/` | verificare policy host* |
| 13 | ER L.R. 24/2003 — Innovazione e polizia locale | Cercare avviso 2026 su `regione.emilia-romagna.it` / BUR (DGR contributi art. 15 L.R. 24/2003) | da cercare |
| 14 | ER L.R. 23/2000 — Itinerari enogastronomici | `https://agricoltura.regione.emilia-romagna.it/dop-igp/strade-dei-vini-e-dei-sapori/norme-e-atti/legge-regionale-7-aprile-2000-n-23-disciplina-degli-itinerari-turistici-enogastronomici-dellemilia-romagna` (norma; bando annuale su BUR) | hub |
| 15 | Ministero Turismo — Staff House Titolo II (case lavoratori turismo) | `https://www.ministeroturismo.gov.it/staff-house-titolo-ii-fissazione-dei-termini-di-presentazione-delle-domande/` | ok |
| 16 | FSE+ ER — Transizione scuola-lavoro giovani con disabilità | `https://formazionelavoro.regione.emilia-romagna.it/leggi-atti-bandi/bandi-regionali/bandi-per-annualita/2025/orientamento-e-formazione-a-sostegno-della-transizione-scuola-lavoro-dei-giovani-con-disabilita-a-f-2025-2026` | ok |
| 17 | FSE+ ER — Summer camp e seminari orientativi 2026 | `https://formazionelavoro.regione.emilia-romagna.it/leggi-atti-bandi/bandi-regionali/bandi-per-annualita/2026/summer-camp-e-seminari-orientativi-anno-2026` | ok |
| 18 | FESR Lombardia 1.4.1 — Competenze & Innovazione | `https://www.bandi.regione.lombardia.it/servizi/servizio/bandi/dettaglio/ricerca-innovazione/ricerca-sviluppo-innovazione/competenze-innovazione-RLF12024041983` | ok (sportello potrebbe essere chiuso: controllare edizione 2026–2027) |
| 19 | Puglia — Habitat / incremento faunistico (ATC Taranto) | `https://www.regione.puglia.it/web/foreste-biodiversita/-/atc-ta-bando-di-miglioramento-ambientale-per-l-incremento-faunistico-2026` | ok |
| 20 | Puglia — PN FEAMPA acquacoltura sostenibile | `https://www.regione.puglia.it/web/feampa-21-27/-/pn-feampa-2021-2027-avviso-pubblico-per-gli-investimenti-nel-settore-dell-acquacoltura-sostenibile-azioni-3-4-5-e-6-interventi-221303-221402-221502-e-221609-` | ok |

\* GAL: dominio terzo settore/associazione; per policy sito potrebbe servire link equivalente su `agricoltura.regione.emilia-romagna.it` o scheda ufficiale.

---

## Gruppo 3 (voci 21–30)

| # | Titolo (parafraso) | Link istituzionale | Stato |
|---|-------------------|---------------------|-------|
| 21 | CCIAA Como-Lecco — Voucher / misure digitali & innovazione (AI) | `https://www.comolecco.camcom.it/archivio27_bandi-ed-opportunita_0_186.html` | hub — verificare scheda “Voucher AI 2026” |
| 22 | CCIAA Bergamo — Formazione imprese agricole 2026 | `https://www.bg.camcom.it/bandi/voucher-favore-delle-mpmi-agricole-della-provincia-bergamo-interventi-formazione-anno-2026` | ok |
| 23 | CCIAA Bergamo — Formazione imprese non agricole 2026 | `https://www.bg.camcom.it/bandi/voucher-formazione-alle-imprese-bergamasche` | verificare edizione 2026 |
| 24 | CCIAA Bergamo — Sviluppo impresa agricola 2026 | `https://bg.camcom.it/bandi/bando-concorso-sviluppo-dimpresa-agricola-anno-2026-solo-organizzazioni-categoria` | ok |
| 25 | CCIAA Bergamo — Sviluppo d’impresa (generale) 2026 | `https://www.bg.camcom.it/bandi` (hub) | hub |
| 26 | CCIAA Bergamo — Internazionalizzazione 2026 | `https://www.bg.camcom.it/bandi` | hub |
| 27 | Molise — FESR 1.1.3 Start up innovative | `https://moliseineuropa.regione.molise.it/avvisi` (hub) + gestione progetto / avviso pubblicato su BUR | verificare |
| 28 | Lombardia — OCM Vino misura Investimenti 2026/2027 | `https://www.regione.lombardia.it/wps/portal/istituzionale/HP/DettaglioAvviso/servizi-e-informazioni/imprese/imprese-agricole/organizzazioni-comuni-di-mercato-ocm/ocm-vitivinicolo/bando-intervento-investimenti-settore-vitivinicolo-campagna-2025-2026/bando-intervento-investimenti-settore-vitivinicolo-campagna-2025-2026` | verificare campagna 2026-2027 |
| 29 | INAIL / MASAF — Ammodernamento trattori agricoli | `https://www.inail.it/portale/it/inail-comunica/news/notizia.2026.03.trattori-agricoli-al-via-il-bando-ismea-da-10-milioni-di-euro-per-sicurezza-e-ammodernamento.html` | ok |
| 30 | Lombardia — CSR SRA28 forestazione / agroforeste | `https://www.regione.lombardia.it/wps/portal/istituzionale/HP/servizi-e-informazioni` → Agricoltura / sviluppo rurale bandi | da cercare |

---

## Gruppo 4 (voci 31–40)

| # | Titolo (parafraso) | Link istituzionale | Stato |
|---|-------------------|---------------------|-------|
| 31 | CCIAA Padova — Green economy agricola (prossima apertura) | `https://www.pd.camcom.it` → sezione Bandi | hub |
| 32 | CCIAA Padova — Doppia transizione digitale ed ecologica | idem | hub |
| 33 | Fondazione CR Aquila — Turismo esperienziale 4.0 | Cercare su `fcr.it` / fondazione territoriale abruzzo | da cercare |
| 34 | FVG L.R. 19/2025 — Terzo settore spese funzionamento | `https://www.regione.fvg.it/rafvg/cms/RAFVG/` → bandi economia sociale | hub |
| 35 | Marche — CSR SRA15 custodi agrobiodiversità | `https://www.regione.marche.it` → Agricoltura / sviluppo rurale | da cercare |
| 36 | Lombardia — CSR SRD06 calamità / eventi biotici | `regione.lombardia.it` / sviluppo rurale | da cercare |
| 37 | Marche — CSR SRB01 montagna | `regione.marche.it` | da cercare |
| 38 | Marche L.R. 12/2022 — Memoria vittime terrorismo | `regione.marche.it` | da cercare |
| 39 | Marche L.R. 3/2024 — Editoria radiotelevisiva locale | `regione.marche.it` | da cercare |
| 40 | Sardegna — CSR SRD01 investimenti produttivi agricoli | `https://www.regione.sardegna.it` → Agricoltura FEASR | hub |

---

## Gruppo 5 (voci 41–50)

| # | Titolo (parafraso) | Link istituzionale | Stato |
|---|-------------------|---------------------|-------|
| 41 | Marche — OCM Vino ristrutturazione vigneti | `regione.marche.it` PNS vino | da cercare |
| 42 | CCIAA Nuoro — Iniziative promozionali 2026 | `https://www.nu.camcom.it` → bandi | hub |
| 43 | CCIAA Nuoro — Fiere estero 2026 | idem | hub |
| 44 | SIMEST — Indennizzo danni uragano Harry | `https://www.simest.it` → news / agevolazioni territori colpiti | hub |
| 45 | Sardegna FSC — Patrimonio culturale enti locali | `https://www.regione.sardegna.it` → Cultura / FSC | da cercare |
| 46 | Sardegna — Accelerazione startup / ecosistema svizzero | `regione.sardegna.it` | da cercare |
| 47 | Ministero Lavoro — Credito d’imposta ZLS investimenti 2026 | `https://www.lavoro.gov.it` / normativa ZLS e circolari | hub |
| 48 | Liguria — FESR 1.3.2 reti e aggregazioni imprese | `https://www.regione.liguria.it` → imprese FESR | da cercare |
| 49 | Calabria — PAC / impresa sociale (azioni 3.7.x) | `https://www.regione.calabria.it` | da cercare |
| 50 | Piemonte — CSR SRD04.D fauna / agricoltura | `https://www.regione.piemonte.it` → agricoltura | da cercare |

---

## Gruppo 6 (voci 51–60)

| # | Titolo (parafraso) | Note |
|---|-------------------|------|
| 51 | Piemonte — CSR SRD04-B agroecosistema | `regione.piemonte.it` |
| 52 | Piemonte — Danni predazione grandi carnivori 2/2025 | idem |
| 53 | CCIAA Cosenza — Sicurezza luoghi di lavoro IV ed. | `cs.camcom.it` |
| 54 | Con i Bambini — Legami in libertà | ente: `concibambini.it` — **non** è PA: valutare se elencare come ente terzo settore con link solo se ammesso da policy |
| 55 | Sicilia — CSR SRG10 prodotti di qualità | `regione.sicilia.it` |
| 56 | ER L.R. 8/2017 — Eventi sportivi | `regione.emilia-romagna.it/sport` |
| 57 | Ministero Lavoro — Credito d’imposta ZES unica Mezzogiorno | `lavoro.gov.it` / `mef.gov.it` |
| 58 | CCIAA Pistoia-Prato — Sostenibilità e digit produzione | `pt.camcom.it` |
| 59 | CCIAA Maremma e Tirreno — Certificazioni qualità | `livorno.camcom.it` / maremma tirreno |
| 60 | CCIAA Maremma e Tirreno — Creazione d’impresa | idem |

---

## Gruppo 7 (voci 61–70)

| # | Titolo (parafraso) | Note |
|---|-------------------|------|
| 61 | CCIAA Maremma e Tirreno — Imprese di vicinato | stesso ente CCIAA |
| 62 | CCIAA Maremma e Tirreno — Turismo sostenibile | stesso ente CCIAA |
| 63 | CCIAA Firenze — Sicurezza sedi aziendali | `fi.camcom.it` |
| 64 | CCIAA Firenze — Attestazione SOA | idem |
| 65 | CCIAA Arezzo-Siena — Sviluppo economico | `arezzo-siena.camcom.it` |
| 66 | Toscana L.R. 17/2025 — Oratori | `regione.toscana.it` |
| 67 | FSE+ Toscana — Servizi famiglie e minori | `regione.toscana.it` / formazione |
| 68 | Toscana CSR SRH04 — Informazione agricola | `regione.toscana.it` |
| 69 | Toscana CSR SRH05 — Azioni dimostrative agricole | idem |
| 70 | Liguria CSR SRA14 — Agrobiodiversità allevatori | `regione.liguria.it` |

---

## Gruppo 8 (voci 71–80)

| # | Titolo (parafraso) | Note |
|---|-------------------|------|
| 71 | Sicilia L.R. 1/2024 — Iniziative territoriali | `regione.sicilia.it` |
| 72 | Lombardia — Teatri di tradizione alto valore artistico | `cultura.regione.lombardia.it` / MiC |
| 73 | Sicilia L.R. 3/2026 — Danni ciclone Harry imprese | `regione.sicilia.it` |
| 74 | Fondazione CRC — Manifesta Bellezza (Cuneo) | `fondazionecrc.it` — verificare policy |
| 75 | Sardegna L.R. 20/2022 — ALISEI / LIS | `regione.sardegna.it` |
| 76 | Nazionale — Nuova Sabatini / Transizione 4.0 | **già in** `bandi.json` → `mimit001sabatini` |
| 77 | Lombardia — Itinerari ed eventi turistici 2026 | `regione.lombardia.it` / turismo |
| 78 | FESR ER — Fondo Starter (tasso agevolato) | `fesr.regione.emilia-romagna.it` / imprese |
| 79 | Lazio — Bando Fresco (latte) | Scadenza 2024 in lista: **verificare** se misura ancora attiva prima di importare |
| 80 | Lazio L.R. 26/2007 — Tradizioni storiche | `regione.lazio.it` |

---

## Gruppo 9 (voci 81–90)

| # | Titolo (parafraso) | Note |
|---|-------------------|------|
| 81 | Ministero Turismo — Filiera turistica (prossima apertura) | `ministeroturismo.gov.it` |
| 82 | Lazio L.R. 22/2020 Street Art 2026 | `regione.lazio.it` |
| 83 | Veneto — OCM Vino ristrutturazione vigneti | `regione.veneto.it` vitivinicolo |
| 84 | GAL Valli Marecchia e Conca — SRD09 enti pubblici | `gal-marecchia-conca.it` o ER agricoltura — verificare host |
| 85 | ER L.R. 13/2021 — Editori Salone libro | `regione.emilia-romagna.it` |
| 86 | ER L.R. 16/2008 — Cittadinanza europea | idem |
| 87 | ER L.R. 21/2012 — Studi fusione Comuni | idem |
| 88 | Puglia — Rigenerazione olivicola azione 4.4 | `regione.puglia.it` |
| 89 | Lombardia — Distretti del commercio 2026 | `regione.lombardia.it` |
| 90 | EUI — European Urban Initiative Call 4 | `europa.eu` / `dgenpc.gov.it` |

---

## Gruppo 10 (voci 91–100)

| # | Titolo (parafraso) | Note |
|---|-------------------|------|
| 91 | Toscana L.R. 34/2025 — Birra artigianale | `regione.toscana.it` |
| 92 | CCIAA Varese — Project Work V ed. | `va.camcom.it` |
| 93 | CCIAA Varese — Project Work IV ed. (2024) | idem — probabile chiuso |
| 94 | Lombardia — Startcup 2026 | `regione.lombardia.it` / Unioncamere |
| 95 | Lombardia — Agroindustria / startup agroindustriale | idem |
| 96 | Lombardia — Associazioni sportive dilettantistiche | `regione.lombardia.it` sport |
| 97 | Lazio L.R. 9/2010 Sport in Comune | `regione.lazio.it` |
| 98 | Basilicata FSE+ — Un nido per l’infanzia | `regione.basilicata.it` |
| 99 | Lazio LaDIT — Turismo digitale esperienziale | `lazioinnova.it` / `regione.lazio.it` |
|100 | DG Biblioteche — Biblioteche non statali 2026 | `mic.gov.it` / `beniculturali.it` |

---

## Prossimi passi operativi

1. **Merge incrementale** in `data/bandi.json`: solo righe con `url_bando` che passano `node tools/validate-bandi-links-free.js`.
2. **Sync Supabase:** `node tools/sync-bandi.js` (con variabili ambiente).
3. **Completare i “da cercare”** un gruppo alla volta (stesso file, aggiornando tabelle).

*File generato nell’ambito della lavorazione a gruppi da 10 — Aprile 2026.*
