# contact-form

Notifica a **info@raasautomazioni.it** quando un visitatore invia un form contatti dal sito (nessun Formspree).

## Secret Supabase (stessi di `send-email`)

- `SMTP_HOST` (es. `es1003.siteground.eu`)
- `SMTP_PORT` (es. `465`)
- `SMTP_USER` (es. `info@raasautomazioni.it`)
- `SMTP_PASS` (password casella / SMTP)

Opzionale: `CONTACT_NOTIFY_EMAIL` se la notifica deve andare a un indirizzo diverso da `info@raasautomazioni.it`.

## Deploy

```bash
supabase secrets set SMTP_HOST=... SMTP_PORT=465 SMTP_USER=info@raasautomazioni.it SMTP_PASS=...
supabase functions deploy contact-form
```

Il sito invia `Authorization: Bearer <anon key>`: è un JWT valido per Supabase. La password SMTP resta solo nei secret.

Verifica: invio form da homepage dopo il deploy.
