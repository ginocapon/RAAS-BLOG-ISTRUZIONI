// SiteForge AI — Generatore siti con Anthropic API
// Genera struttura JSON completa di un sito a partire dall'input utente

(function() {
  'use strict';

  // Schema JSON di riferimento per il prompt di sistema
  var SITE_SCHEMA = {
    meta: {
      title: 'string',
      description: 'string',
      favicon: 'string',
      fonts: ['Font1', 'Font2'],
      colors: { primary: '#hex', accent: '#hex', cta: '#hex' }
    },
    pages: [{
      id: 'string',
      name: 'string',
      slug: 'string',
      sections: [{
        type: 'hero|hero_search|features_grid|text_image|gallery|testimonials|pricing_cards|contact_form|map_embed|blog_grid|faq_accordion|team_grid|stats_counter|cta_banner|video_embed',
        props: {}
      }]
    }],
    settings: {
      nav_links: ['string'],
      footer_text: 'string',
      whatsapp: 'string',
      google_maps_embed: 'string'
    }
  };

  // Prompt di sistema per l'AI
  var SYSTEM_PROMPT = 'Sei un esperto web designer italiano. Genera un sito web completo ' +
    'in formato JSON seguendo ESATTAMENTE questo schema: ' + JSON.stringify(SITE_SCHEMA) + '. ' +
    'Rispondi SOLO con il JSON valido, nessun testo aggiuntivo. ' +
    'Il sito deve essere per: [INPUT UTENTE]. ' +
    'Crea contenuti realistici in italiano per ogni sezione. ' +
    'Scegli sezioni appropriate per il settore. ' +
    'Genera almeno 4 pagine con almeno 3 sezioni ciascuna. ' +
    'Per ogni sezione, includi tutte le props necessarie con dati realistici. ' +
    'Usa i tipi di sezione disponibili: hero, hero_search, features_grid, text_image, ' +
    'gallery, testimonials, pricing_cards, contact_form, map_embed, blog_grid, ' +
    'faq_accordion, team_grid, stats_counter, cta_banner, video_embed.';

  // Costruisci il messaggio utente dal form
  function buildUserMessage(formData) {
    var parts = [];
    parts.push('Settore: ' + formData.sector);
    parts.push('Nome azienda: ' + formData.businessName);
    if (formData.city) parts.push('Città: ' + formData.city);
    if (formData.description) parts.push('Descrizione: ' + formData.description);
    if (formData.pages && formData.pages.length > 0) {
      parts.push('Pagine da includere: ' + formData.pages.join(', '));
    }
    if (formData.tone) parts.push('Tono: ' + formData.tone);
    if (formData.primaryColor) parts.push('Colore primario: ' + formData.primaryColor);
    if (formData.accentColor) parts.push('Colore accento: ' + formData.accentColor);
    return parts.join('\n');
  }

  // Chiama Anthropic API per generare il sito
  async function generateSite(formData) {
    // Verifica crediti
    var canAfford = await SiteForgeCredits.canAfford('AI_GENERATION');
    if (!canAfford) {
      SiteForgeCredits.showBuyModal();
      return null;
    }

    // Ottieni chiave API dalle impostazioni utente
    var settings = await SiteForgeDB.getUserSettings();
    var apiKey = settings ? settings.anthropic_api_key : null;

    if (!apiKey) {
      alert('Chiave API Anthropic non configurata. Vai nelle impostazioni per inserirla.');
      return null;
    }

    var userMessage = buildUserMessage(formData);
    var systemPrompt = SYSTEM_PROMPT.replace('[INPUT UTENTE]', userMessage);

    try {
      // Mostra indicatore di caricamento
      showGeneratingOverlay();

      var response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: SITEFORGE_CONFIG.AI_MODEL,
          max_tokens: SITEFORGE_CONFIG.AI_MAX_TOKENS,
          temperature: SITEFORGE_CONFIG.AI_TEMPERATURE,
          system: systemPrompt,
          messages: [
            { role: 'user', content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        var errorData = await response.json();
        throw new Error(errorData.error ? errorData.error.message : 'Errore API: ' + response.status);
      }

      var data = await response.json();
      var content = data.content[0].text;

      // Parsa il JSON dalla risposta
      var siteJSON = parseAIResponse(content);
      if (!siteJSON) {
        throw new Error('Risposta AI non valida — JSON non parsabile');
      }

      // Addebita crediti
      var charged = await SiteForgeCredits.charge('AI_GENERATION');
      if (!charged) {
        throw new Error('Errore nell\'addebito dei crediti');
      }

      hideGeneratingOverlay();
      return siteJSON;

    } catch (error) {
      hideGeneratingOverlay();
      alert('Errore generazione AI: ' + error.message);
      console.error('SiteForge AI Error:', error);
      return null;
    }
  }

  // Parsa la risposta AI estraendo il JSON
  function parseAIResponse(text) {
    // Prova a parsare direttamente
    try {
      return JSON.parse(text);
    } catch (e) {
      // Cerca un blocco JSON nella risposta
      var jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (e2) {
          return null;
        }
      }
      return null;
    }
  }

  // Overlay di caricamento durante la generazione
  function showGeneratingOverlay() {
    var existing = document.getElementById('generating-overlay');
    if (existing) {
      existing.classList.add('active');
      return;
    }

    var overlay = document.createElement('div');
    overlay.id = 'generating-overlay';
    overlay.className = 'modal-overlay active';
    overlay.style.cssText = 'cursor:default;';
    overlay.innerHTML = '<div style="text-align:center;color:#fff;">' +
      '<div class="generating-spinner"></div>' +
      '<h2 style="margin-top:1.5rem;font-size:1.5rem;">Generazione in corso...</h2>' +
      '<p style="opacity:0.6;margin-top:0.5rem;">L\'AI sta creando il tuo sito. Attendi qualche secondo.</p>' +
    '</div>';

    // Aggiungi stili spinner
    var style = document.createElement('style');
    style.textContent = '.generating-spinner{width:60px;height:60px;border:3px solid rgba(255,255,255,0.1);' +
      'border-top-color:#6c5ce7;border-radius:50%;margin:0 auto;' +
      'animation:spin 0.8s linear infinite;}' +
      '@keyframes spin{to{transform:rotate(360deg);}}';
    document.head.appendChild(style);

    document.body.appendChild(overlay);
  }

  function hideGeneratingOverlay() {
    var overlay = document.getElementById('generating-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Esponi API pubblica
  window.SiteForgeAI = {
    generateSite: generateSite
  };

})();
