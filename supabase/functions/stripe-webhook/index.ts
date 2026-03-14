// Supabase Edge Function — Stripe Webhook per attivazione abbonamento
// Deploy: supabase functions deploy stripe-webhook
// Env vars richieste: STRIPE_WEBHOOK_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// Configura su Stripe Dashboard: https://dashboard.stripe.com/webhooks
// Endpoint: https://<SUPABASE_URL>/functions/v1/stripe-webhook
// Eventi: checkout.session.completed

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

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
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    // Se il webhook secret e' configurato, verifica la firma
    // In produzione DEVE essere configurato per sicurezza
    if (webhookSecret && sig) {
      // Verifica firma Stripe (HMAC SHA256)
      const encoder = new TextEncoder();
      const parts = sig.split(",").reduce((acc: Record<string, string>, part: string) => {
        const [key, val] = part.split("=");
        acc[key] = val;
        return acc;
      }, {});

      const timestamp = parts["t"];
      const signature = parts["v1"];
      if (!timestamp || !signature) {
        return new Response(JSON.stringify({ error: "Firma Stripe non valida" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const payload = `${timestamp}.${body}`;
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(webhookSecret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
      );
      const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
      const computedSig = Array.from(new Uint8Array(signatureBytes))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (computedSig !== signature) {
        return new Response(JSON.stringify({ error: "Firma non corrispondente" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const event = JSON.parse(body);

    // Gestisce solo checkout.session.completed
    if (event.type !== "checkout.session.completed") {
      return new Response(JSON.stringify({ received: true, skipped: event.type }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = event.data.object;
    const email = session.customer_email || session.customer_details?.email;
    const name = session.customer_details?.name || "";
    const transactionId = session.payment_intent || session.id;

    if (!email) {
      console.warn("Webhook Stripe: email non trovata nella sessione", session.id);
      return new Response(JSON.stringify({ error: "Email non trovata" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Calcola date abbonamento (365 giorni)
    const startDate = new Date().toISOString();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);

    // Salva/aggiorna in Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://ieeriszlalrsbfsnarih.supabase.co";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_ANON_KEY") || "";
    const sb = createClient(supabaseUrl, supabaseKey);

    // Controlla se l'iscritto esiste gia'
    const { data: existing } = await sb
      .from("subscribers")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      // Aggiorna a paid con nuova scadenza
      await sb.from("subscribers").update({
        type: "paid",
        start_date: startDate,
        expiry_date: expiryDate.toISOString(),
        transaction_id: transactionId,
      }).eq("id", existing.id);
    } else {
      // Crea nuovo subscriber paid
      await sb.from("subscribers").insert([{
        email,
        name,
        type: "paid",
        newsletter: true,
        start_date: startDate,
        expiry_date: expiryDate.toISOString(),
        transaction_id: transactionId,
      }]);
    }

    console.log(`Abbonamento attivato via Stripe webhook: ${email}`);

    return new Response(
      JSON.stringify({ success: true, email, expiry: expiryDate.toISOString() }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Stripe webhook error:", err);
    return new Response(
      JSON.stringify({ error: "Errore webhook", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
