// Supabase Edge Function — Notifica form contatti → info@raasautomazioni.it (SMTP SiteGround)
// Deploy: supabase secrets set SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS
//         supabase functions deploy contact-form --no-verify-jwt
// Env: SMTP_* come send-email; opzionale CONTACT_NOTIFY_EMAIL (default info@raasautomazioni.it)

import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function esc(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface ContactBody {
  nome?: string;
  name?: string;
  firstName?: string;
  cognome?: string;
  lastName?: string;
  company?: string;
  email?: string;
  telefono?: string;
  phone?: string;
  problema?: string;
  situazione?: string;
  need?: string;
  interesse?: string;
  esigenza?: string;
  challenge?: string;
  service?: string;
  websiteType?: string;
  messaggio?: string;
  message?: string;
  source?: string;
  hp?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Metodo non consentito" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: ContactBody = await req.json();

    if (body.hp && String(body.hp).trim() !== "") {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Email non valida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let nome = String(body.nome ?? body.name ?? body.firstName ?? "").trim();
    const cognome = String(body.cognome ?? body.lastName ?? "").trim();
    const company = String(body.company ?? "").trim();
    if (!nome && cognome) nome = cognome;
    if (!nome && !cognome) {
      return new Response(JSON.stringify({ error: "Nome obbligatorio" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const telefono = String(body.telefono ?? body.phone ?? "").trim();
    const problema = String(
      body.problema ?? body.situazione ?? body.need ?? body.interesse ?? body.esigenza ?? body.challenge ?? body.service ?? body.websiteType ?? ""
    ).trim();
    const messaggio = String(body.messaggio ?? body.message ?? "").trim();
    const source = String(body.source ?? "sito").trim().slice(0, 500);

    const smtpHost = Deno.env.get("SMTP_HOST") || "es1003.siteground.eu";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465", 10);
    const smtpUser = Deno.env.get("SMTP_USER") || "info@raasautomazioni.it";
    const smtpPass = Deno.env.get("SMTP_PASS");
    const notifyTo = Deno.env.get("CONTACT_NOTIFY_EMAIL") || "info@raasautomazioni.it";

    if (!smtpPass) {
      return new Response(
        JSON.stringify({
          error: "Invio non configurato: imposta SMTP_PASS nei secret Supabase (come per send-email).",
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subject = `[RaaS — Form] ${source.slice(0, 80)} — ${esc(nome)}`;
    const html = `<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"></head><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#1a2f47;">
<h2 style="color:#e63946;">Nuova richiesta dal sito</h2>
<table style="border-collapse:collapse;max-width:560px;">
<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Nome</td><td>${esc(nome)}</td></tr>
${cognome ? `<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Cognome</td><td>${esc(cognome)}</td></tr>` : ""}
${company ? `<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Azienda</td><td>${esc(company)}</td></tr>` : ""}
<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
${telefono ? `<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Telefono</td><td>${esc(telefono)}</td></tr>` : ""}
${problema ? `<tr><td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;">Esigenza</td><td>${esc(problema)}</td></tr>` : ""}
${messaggio ? `<tr><td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;">Messaggio</td><td>${esc(messaggio).replace(/\n/g, "<br>")}</td></tr>` : ""}
<tr><td style="padding:6px 12px 6px 0;font-weight:700;">Pagina</td><td>${esc(source)}</td></tr>
</table>
<p style="font-size:12px;color:#666;margin-top:24px;">Messaggio generato dal form pubblico RaaS Automazioni.</p>
</body></html>`;

    const client = new SmtpClient();
    await client.connectTLS({
      hostname: smtpHost,
      port: smtpPort,
      username: smtpUser,
      password: smtpPass,
    });

    await client.send({
      from: `RaaS Automazioni <${smtpUser}>`,
      to: notifyTo,
      subject: subject.replace(/[\r\n]/g, " ").slice(0, 200),
      content: `Rispondi a: ${email}\n\n${messaggio || "(nessun messaggio)"}`,
      html,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Errore invio", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
