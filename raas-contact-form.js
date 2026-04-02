/**
 * Form contatti RaaS → Supabase Edge contact-form (SMTP info@raasautomazioni.it)
 * Nessun Formspree / servizi esterni.
 */
(function (global) {
  var CONTACT_URL = "https://ieeriszlalrsbfsnarih.supabase.co/functions/v1/contact-form";
  var ANON =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZXJpc3psYWxyc2Jmc25hcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNjEyNjAsImV4cCI6MjA4MzczNzI2MH0.Sjwu1620mMTAAoKVHgXHQ1cA-m3hFXqtCtqjAQNErQo";

  function field(form, ids) {
    for (var i = 0; i < ids.length; i++) {
      var el = form.querySelector("#" + ids[i]) || form.elements.namedItem(ids[i]);
      if (el && el.value != null && String(el.value).trim()) return String(el.value).trim();
    }
    return "";
  }

  function collectFromForm(form) {
    var nome = field(form, ["nome", "name", "firstName"]);
    var cognome = field(form, ["cognome", "lastName"]);
    var company = field(form, ["company"]);
    var email = field(form, ["email"]);
    var telefono = field(form, ["telefono", "phone"]);
    var problema = field(form, [
      "problema",
      "situazione",
      "need",
      "interesse",
      "websiteType",
      "esigenza",
      "challenge",
      "service",
    ]);
    var messaggio = field(form, ["messaggio", "message"]);
    return {
      nome: nome,
      cognome: cognome || "—",
      company: company,
      email: email,
      telefono: telefono,
      problema: problema,
      messaggio: messaggio,
    };
  }

  function postPayload(payload) {
    return fetch(CONTACT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + ANON,
      },
      body: JSON.stringify(payload),
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error(j.error || r.statusText || "Errore invio");
        return j;
      });
    });
  }

  global.raasSendContact = function (form, options) {
    options = options || {};
    var data = collectFromForm(form);
    data.source = options.source || (global.location && global.location.pathname) || "/";
    var hp = form.querySelector('input[name="hp"]');
    if (hp && hp.value) data.hp = hp.value;
    if (!data.email) return Promise.reject(new Error("Email obbligatoria"));
    if (!data.nome) return Promise.reject(new Error("Nome obbligatorio"));
    return postPayload(data);
  };

  global.raasSendContactPayload = function (payload) {
    var p = Object.assign(
      {
        nome: "",
        cognome: "—",
        email: "",
        telefono: "",
        problema: "",
        messaggio: "",
        source: (global.location && global.location.pathname) || "/",
      },
      payload || {}
    );
    if (!p.email) return Promise.reject(new Error("Email obbligatoria"));
    if (!p.nome) return Promise.reject(new Error("Nome obbligatorio"));
    return postPayload(p);
  };

  function bindForm(form) {
    if (form.getAttribute("data-raas-bound") === "1") return;
    form.setAttribute("data-raas-bound", "1");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var okEl =
        form.querySelector("[data-raas-success]") || document.getElementById("formSuccess");
      if (btn) {
        btn.disabled = true;
        btn.setAttribute("aria-busy", "true");
      }
      var source =
        form.getAttribute("data-raas-source") ||
        (global.location && global.location.pathname) ||
        "/";
      raasSendContact(form, { source: source })
        .then(function () {
          if (okEl) {
            okEl.style.display = "block";
            okEl.removeAttribute("hidden");
          } else {
            alert("Grazie! Ti contatteremo presto.");
          }
          form.reset();
        })
        .catch(function (err) {
          alert(err.message || "Invio non riuscito. Riprova o scrivi a info@raasautomazioni.it");
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.removeAttribute("aria-busy");
          }
        });
    });
  }

  function init() {
    document.querySelectorAll("form[data-raas-contact='1']").forEach(bindForm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : this);
