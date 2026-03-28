// SiteForge AI — Sistema gestione crediti
// Logica di visualizzazione e gestione crediti nella UI

(function() {
  'use strict';

  // Costi operazioni in crediti
  var COSTS = {
    AI_GENERATION: 3,
    EXPORT_HTML: 1,
    TEMPLATE_BASE: 0
  };

  // Aggiorna il badge crediti nella UI
  async function updateCreditsBadge() {
    var badge = document.getElementById('credits-badge');
    if (!badge) return;

    var credits = await SiteForgeDB.getCredits();
    badge.textContent = credits + ' crediti';

    // Colore badge in base ai crediti rimanenti
    badge.classList.remove('credits-high', 'credits-medium', 'credits-low');
    if (credits >= 10) {
      badge.classList.add('credits-high');
    } else if (credits >= 3) {
      badge.classList.add('credits-medium');
    } else {
      badge.classList.add('credits-low');
    }
  }

  // Verifica se l'utente può eseguire un'operazione
  async function canAfford(operation) {
    var cost = COSTS[operation] || 0;
    if (cost === 0) return true;
    var credits = await SiteForgeDB.getCredits();
    return credits >= cost;
  }

  // Esegui operazione con addebito crediti
  async function chargeForOperation(operation) {
    var cost = COSTS[operation];
    if (cost === 0) return true;
    var success = await SiteForgeDB.deductCredits(cost);
    if (success) {
      await updateCreditsBadge();
    }
    return success;
  }

  // Mostra modale acquisto crediti (placeholder Stripe)
  function showBuyCreditsModal() {
    var existingModal = document.getElementById('buy-credits-modal');
    if (existingModal) {
      existingModal.classList.add('active');
      return;
    }

    var overlay = document.createElement('div');
    overlay.id = 'buy-credits-modal';
    overlay.className = 'modal-overlay active';
    overlay.innerHTML = '<div class="modal">' +
      '<button class="modal-close" aria-label="Chiudi">&times;</button>' +
      '<h2>Acquista crediti</h2>' +
      '<p>Scegli il pacchetto crediti che fa per te</p>' +
      '<div style="display:grid;gap:1rem;margin-top:1.5rem;">' +
        '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.25rem;display:flex;justify-content:space-between;align-items:center;">' +
          '<div><strong style="color:#fff;">10 crediti</strong><br><span style="font-size:0.85rem;opacity:0.5;">3 generazioni AI + 1 export</span></div>' +
          '<button class="btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;" disabled>4,99 &euro;</button>' +
        '</div>' +
        '<div style="background:rgba(108,92,231,0.08);border:1px solid rgba(108,92,231,0.3);border-radius:12px;padding:1.25rem;display:flex;justify-content:space-between;align-items:center;">' +
          '<div><strong style="color:#fff;">30 crediti</strong><br><span style="font-size:0.85rem;opacity:0.5;">10 generazioni AI + export</span></div>' +
          '<button class="btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;" disabled>9,99 &euro;</button>' +
        '</div>' +
        '<div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:1.25rem;display:flex;justify-content:space-between;align-items:center;">' +
          '<div><strong style="color:#fff;">100 crediti</strong><br><span style="font-size:0.85rem;opacity:0.5;">33 generazioni AI + export</span></div>' +
          '<button class="btn-primary" style="padding:0.5rem 1.25rem;font-size:0.9rem;" disabled>24,99 &euro;</button>' +
        '</div>' +
      '</div>' +
      '<p style="text-align:center;margin-top:1.25rem;font-size:0.85rem;opacity:0.4;">Pagamenti con Stripe — disponibile a breve</p>' +
    '</div>';

    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close').addEventListener('click', function() {
      overlay.classList.remove('active');
    });
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  }

  // Esponi API pubblica
  window.SiteForgeCredits = {
    COSTS: COSTS,
    updateBadge: updateCreditsBadge,
    canAfford: canAfford,
    charge: chargeForOperation,
    showBuyModal: showBuyCreditsModal
  };

})();
