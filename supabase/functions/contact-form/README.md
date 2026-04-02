# contact-form

Notifica a **info@raasautomazioni.it** quando un visitatore invia un form contatti dal sito (nessun Formspree).

## Secret Supabase

**Opzione A — Brevo (consigliata se hai già `BREVO_API_KEY` nei secret del progetto)**

- `BREVO_API_KEY` — la funzione invia tramite `https://api.brevo.com/v3/smtp/email`
- Opzionale: `BREVO_SENDER_EMAIL` — mittente (default `info@raasautomazioni.it`); deve essere **verificato** in Brevo

**Opzione B — SMTP della casella (es. SiteGround)**

- `SMTP_PASS` — **obbligatorio** per usare la posta sul tuo dominio  
- `SMTP_HOST` — di solito **`mail.raasautomazioni.it`** (se omesso, la funzione usa questo default)  
- `SMTP_PORT` — spesso **`465`** (SSL); se non funziona prova **`587`**  
- `SMTP_USER` — di solito l’email completa, es. **`info@raasautomazioni.it`**

Se imposti `SMTP_PASS`, l’invio passa da **questo SMTP** (non da Brevo), anche se `BREVO_API_KEY` esiste.

Serve **almeno una** tra `SMTP_PASS` e `BREVO_API_KEY`.

Le notifiche arrivano sempre a **info@raasautomazioni.it** (mittente di solito `SMTP_USER`, stessa casella).

## Deploy

```bash
# Se usi solo Brevo (secret già presente): basta il deploy
supabase functions deploy contact-form

# Se usi SMTP:
supabase secrets set SMTP_HOST=... SMTP_PORT=465 SMTP_USER=info@raasautomazioni.it SMTP_PASS=...
supabase functions deploy contact-form
```

Il sito invia `Authorization: Bearer <anon key>`: è un JWT valido per Supabase. La password SMTP resta solo nei secret.

Verifica: invio form da homepage dopo il deploy.

## «NetworkError when attempting to fetch resource» (Firefox / console)

Succede quando il browser **non completa la richiesta**: spesso perché la funzione **non esiste** sul progetto Supabase. Il `POST` con `Content-Type: application/json` attiva un **preflight OPTIONS**; se l’endpoint risponde **404**, il preflight fallisce e in Firefox compare proprio *NetworkError*.

**Rimedio:** `supabase functions deploy contact-form` (stesso progetto di `ieeriszlalrsbfsnarih` / URL nel sito).

## Se non arriva nulla

1. **Dashboard Supabase** → Edge Functions → esiste `contact-form`? Se no: `supabase functions deploy contact-form`.
2. **Project Settings → Edge Functions** (o Secrets): c’è `SMTP_PASS`? Deve essere la stessa password che usi nell’admin per `send-email`.
3. Prova il form: se compare un alert con *"Invio non configurato"* → manca `SMTP_PASS` nei secret.
4. Se compare *404* / *risposta non valida* → funzione non deployata o URL progetto errato.
5. Controlla **spam** su info@.
6. **Logs** della funzione su Supabase subito dopo un invio di prova.
