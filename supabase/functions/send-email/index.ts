// Supabase Edge Function — Invio email via SMTP SiteGround
// Deploy: supabase functions deploy send-email
// Env vars richieste: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface EmailRequest {
  to: string | string[];
  subject: string;
  html: string;
  from_name?: string;
  smtp_pass?: string;
}

Deno.serve(async (req: Request) => {
  // CORS preflight
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
    const body: EmailRequest = await req.json();
    const { to, subject, html, from_name, smtp_pass: bodySmtpPass } = body;

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Campi obbligatori: to, subject, html" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const smtpHost = Deno.env.get("SMTP_HOST") || "es1003.siteground.eu";
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUser = Deno.env.get("SMTP_USER") || "info@raasautomazioni.it";
    const smtpPass = Deno.env.get("SMTP_PASS") || bodySmtpPass;

    if (!smtpPass) {
      return new Response(
        JSON.stringify({ error: "SMTP_PASS non configurata nelle env vars" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const client = new SmtpClient();

    await client.connectTLS({
      hostname: smtpHost,
      port: smtpPort,
      username: smtpUser,
      password: smtpPass,
    });

    const recipients = Array.isArray(to) ? to : [to];
    const results: { email: string; success: boolean; error?: string }[] = [];

    for (const recipient of recipients) {
      try {
        await client.send({
          from: `${from_name || "RaaS Automazioni"} <${smtpUser}>`,
          to: recipient,
          subject: subject,
          content: "Visualizza questa email in un client che supporta HTML.",
          html: html,
        });
        results.push({ email: recipient, success: true });
      } catch (err) {
        results.push({ email: recipient, success: false, error: String(err) });
      }
    }

    await client.close();

    const successCount = results.filter((r) => r.success).length;
    const failCount = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failCount,
        details: results,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Errore invio email", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
