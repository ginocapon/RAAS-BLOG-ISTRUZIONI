# contact-form

Notifica a **info@raasautomazioni.it** quando un visitatore invia un form contatti dal sito (nessun Formspree).

## Secret Supabase (stessi di `send-email`)

- `SMTP_HOST` (es. `es1003.siteground.eu`)
- `SMTP_PORT` (es. `465`)
- `SMTP_USER` (es. `info@raasautomazioni.it`)
- `SMTP_PASS` (password casella / SMTP — **obbligatorio**: senza questo il form risponde 503 e nessuna mail parte)

Le notifiche arrivano sempre a **info@raasautomazioni.it** (mittente di solito `SMTP_USER`, stessa casella).

## Deploy

```bash
supabase secrets set SMTP_HOST=... SMTP_PORT=465 SMTP_USER=info@raasautomazioni.it SMTP_PASS=...
supabase functions deploy contact-form
```

Il sito invia `Authorization: Bearer <anon key>`: è un JWT valido per Supabase. La password SMTP resta solo nei secret.

Verifica: invio form da homepage dopo il deploy.

## Se non arriva nulla

1. **Dashboard Supabase** → Edge Functions → esiste `contact-form`? Se no: `supabase functions deploy contact-form`.
2. **Project Settings → Edge Functions** (o Secrets): c’è `SMTP_PASS`? Deve essere la stessa password che usi nell’admin per `send-email`.
3. Prova il form: se compare un alert con *"Invio non configurato"* → manca `SMTP_PASS` nei secret.
4. Se compare *404* / *risposta non valida* → funzione non deployata o URL progetto errato.
5. Controlla **spam** su info@.
6. **Logs** della funzione su Supabase subito dopo un invio di prova.
