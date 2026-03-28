// SiteForge AI — Builder visuale drag-drop
// Gestisce il canvas, le sezioni, il pannello proprietà e il salvataggio

(function() {
  'use strict';

  // === STATO ===
  var state = {
    siteJSON: null,
    projectId: null,
    currentPageIndex: 0,
    selectedSectionIndex: -1,
    viewport: 'desktop',
    autoSaveTimer: null,
    isDirty: false
  };

  // Tipi di sezione disponibili nel builder
  var SECTION_TYPES = [
    { type: 'hero', name: 'Hero', desc: 'Titolo, sottotitolo e CTA', icon: '&#9889;' },
    { type: 'hero_search', name: 'Hero + Ricerca', desc: 'Hero con barra di ricerca', icon: '&#128269;' },
    { type: 'features_grid', name: 'Features Grid', desc: 'Griglia di funzionalità', icon: '&#9776;' },
    { type: 'text_image', name: 'Testo + Immagine', desc: 'Testo e immagine affiancati', icon: '&#128196;' },
    { type: 'gallery', name: 'Galleria', desc: 'Griglia di immagini', icon: '&#128247;' },
    { type: 'testimonials', name: 'Testimonianze', desc: 'Carousel recensioni', icon: '&#11088;' },
    { type: 'pricing_cards', name: 'Prezzi', desc: 'Card listino prezzi', icon: '&#128176;' },
    { type: 'contact_form', name: 'Form Contatto', desc: 'Modulo contatto', icon: '&#9993;' },
    { type: 'map_embed', name: 'Mappa', desc: 'Google Maps embed', icon: '&#128205;' },
    { type: 'blog_grid', name: 'Blog', desc: 'Griglia articoli blog', icon: '&#128221;' },
    { type: 'faq_accordion', name: 'FAQ', desc: 'Domande e risposte', icon: '&#10067;' },
    { type: 'team_grid', name: 'Team', desc: 'Schede team', icon: '&#128101;' },
    { type: 'stats_counter', name: 'Statistiche', desc: 'Numeri e contatori', icon: '&#128200;' },
    { type: 'cta_banner', name: 'CTA Banner', desc: 'Banner con call-to-action', icon: '&#128227;' },
    { type: 'video_embed', name: 'Video', desc: 'Video YouTube embed', icon: '&#127909;' }
  ];

  // Proprietà di default per ogni tipo di sezione
  var DEFAULT_PROPS = {
    hero: { headline: 'Titolo principale', subheadline: 'Sottotitolo descrittivo', cta_text: 'Scopri di più', cta_link: '#', bg_image: '' },
    hero_search: { headline: 'Cerca quello che vuoi', subheadline: 'Descrizione', cta_text: 'Cerca', cta_link: '#', search_placeholder: 'Cerca...' },
    features_grid: { headline: 'Le nostre funzionalità', items: [{ icon: 'star', title: 'Feature 1', text: 'Descrizione della feature' }, { icon: 'star', title: 'Feature 2', text: 'Descrizione della feature' }, { icon: 'star', title: 'Feature 3', text: 'Descrizione della feature' }] },
    text_image: { headline: 'Chi siamo', text: 'Testo descrittivo della sezione.', cta_text: 'Leggi di più', cta_link: '#', image: '', reversed: false },
    gallery: { headline: 'Galleria', columns: 3, items: [{ image: '', caption: 'Immagine 1' }, { image: '', caption: 'Immagine 2' }, { image: '', caption: 'Immagine 3' }] },
    testimonials: { headline: 'Cosa dicono di noi', items: [{ name: 'Mario Rossi', role: 'Cliente', text: 'Servizio eccellente!', stars: 5, avatar: '' }] },
    pricing_cards: { headline: 'I nostri piani', items: [{ name: 'Base', price: '9€', period: '/mese', features: ['Feature 1', 'Feature 2'], cta_text: 'Scegli', cta_link: '#', featured: false }, { name: 'Pro', price: '29€', period: '/mese', features: ['Feature 1', 'Feature 2', 'Feature 3'], cta_text: 'Scegli', cta_link: '#', featured: true }] },
    contact_form: { headline: 'Contattaci', fields: ['nome', 'email', 'telefono', 'messaggio'], submit_text: 'Invia', formspree_id: '' },
    map_embed: { headline: 'Dove siamo', embed_url: '', address: 'Indirizzo' },
    blog_grid: { headline: 'Blog', items: [{ image: '', title: 'Articolo 1', excerpt: 'Anteprima dell\'articolo...', date: '2026-01-01', link: '#' }] },
    faq_accordion: { headline: 'Domande frequenti', items: [{ question: 'Domanda 1?', answer: 'Risposta alla domanda.' }] },
    team_grid: { headline: 'Il nostro team', items: [{ name: 'Nome Cognome', role: 'Ruolo', photo: '', linkedin: '' }] },
    stats_counter: { items: [{ number: 100, suffix: '+', label: 'Clienti' }, { number: 50, suffix: '', label: 'Progetti' }] },
    cta_banner: { headline: 'Pronto per iniziare?', subheadline: 'Contattaci oggi', cta_text: 'Contattaci', cta_link: '#', bg_color: '' },
    video_embed: { headline: 'Video', youtube_url: '' }
  };

  // === INIZIALIZZAZIONE ===
  async function init() {
    // Carica progetto da URL
    var params = new URLSearchParams(window.location.search);
    state.projectId = params.get('project');

    if (!state.projectId) {
      alert('Nessun progetto specificato.');
      window.location.href = 'dashboard.html';
      return;
    }

    var project = await SiteForgeDB.getProject(state.projectId);
    if (!project) {
      alert('Progetto non trovato.');
      window.location.href = 'dashboard.html';
      return;
    }

    state.siteJSON = project.site_json;
    renderSidebar();
    renderToolbarPages();
    renderCanvas();
    setupDragDrop();
    setupViewportToggle();
    setupAutoSave();
    setupToolbarActions();
  }

  // === SIDEBAR SINISTRA — Lista sezioni ===
  function renderSidebar() {
    var list = document.getElementById('section-list');
    if (!list) return;
    list.innerHTML = '';

    SECTION_TYPES.forEach(function(sec) {
      var item = document.createElement('div');
      item.className = 'section-item';
      item.draggable = true;
      item.dataset.type = sec.type;
      item.innerHTML = '<div class="section-item-icon">' + sec.icon + '</div>' +
        '<div class="section-item-info">' +
          '<div class="section-item-name">' + sec.name + '</div>' +
          '<div class="section-item-desc">' + sec.desc + '</div>' +
        '</div>';

      // Drag start dalla sidebar
      item.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'sidebar', type: sec.type }));
        e.dataTransfer.effectAllowed = 'copy';
        item.style.opacity = '0.5';
      });
      item.addEventListener('dragend', function() {
        item.style.opacity = '1';
      });

      // Click per aggiungere in fondo
      item.addEventListener('click', function() {
        addSection(sec.type);
      });

      list.appendChild(item);
    });
  }

  // === TOOLBAR — Pagine ===
  function renderToolbarPages() {
    var container = document.getElementById('toolbar-pages');
    if (!container) return;
    container.innerHTML = '';

    var pages = state.siteJSON.pages || [];
    pages.forEach(function(page, i) {
      var btn = document.createElement('button');
      btn.className = 'toolbar-page-btn' + (i === state.currentPageIndex ? ' active' : '');
      btn.textContent = page.name;
      btn.addEventListener('click', function() {
        state.currentPageIndex = i;
        state.selectedSectionIndex = -1;
        renderToolbarPages();
        renderCanvas();
        renderProperties();
      });
      container.appendChild(btn);
    });

    // Pulsante aggiungi pagina
    var addBtn = document.createElement('button');
    addBtn.className = 'toolbar-page-add';
    addBtn.textContent = '+ Pagina';
    addBtn.addEventListener('click', function() {
      var name = prompt('Nome della nuova pagina:');
      if (!name) return;
      var id = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      state.siteJSON.pages.push({
        id: id,
        name: name,
        slug: '/' + id,
        sections: []
      });
      // Aggiorna nav_links
      if (state.siteJSON.settings && state.siteJSON.settings.nav_links) {
        state.siteJSON.settings.nav_links.push(name);
      }
      state.currentPageIndex = state.siteJSON.pages.length - 1;
      state.isDirty = true;
      renderToolbarPages();
      renderCanvas();
    });
    container.appendChild(addBtn);
  }

  // === CANVAS — Rendering sezioni ===
  function renderCanvas() {
    var canvas = document.getElementById('canvas-content');
    if (!canvas) return;

    var page = getCurrentPage();
    if (!page) { canvas.innerHTML = '<div class="drop-placeholder">Nessuna pagina selezionata</div>'; return; }

    var sections = page.sections || [];
    if (sections.length === 0) {
      canvas.innerHTML = '<div class="drop-placeholder">Trascina una sezione qui dalla sidebar sinistra oppure clicca su una sezione per aggiungerla</div>';
      return;
    }

    var colors = (state.siteJSON.meta && state.siteJSON.meta.colors) || { primary: '#333', accent: '#666', cta: '#e67e22' };
    canvas.innerHTML = '';

    sections.forEach(function(section, i) {
      var wrapper = document.createElement('div');
      wrapper.className = 'canvas-section' + (i === state.selectedSectionIndex ? ' selected' : '');
      wrapper.dataset.index = i;
      wrapper.draggable = true;

      // Contenuto renderizzato
      if (typeof SiteForgeExporter !== 'undefined') {
        wrapper.innerHTML = SiteForgeExporter.renderSection(section.type, section.props || {}, colors);
      } else {
        wrapper.innerHTML = '<div style="padding:2rem;text-align:center;color:#999;">Sezione: ' + section.type + '</div>';
      }

      // Toolbar sezione
      var toolbar = document.createElement('div');
      toolbar.className = 'section-toolbar';
      toolbar.innerHTML = '<button title="Sposta su" data-action="up">&#9650;</button>' +
        '<button title="Sposta giù" data-action="down">&#9660;</button>' +
        '<button title="Duplica" data-action="duplicate">&#10697;</button>' +
        '<button title="Elimina" data-action="delete">&#10005;</button>';
      wrapper.appendChild(toolbar);

      // Drag handle
      var handle = document.createElement('div');
      handle.className = 'drag-handle';
      handle.innerHTML = '&#10495;';
      wrapper.appendChild(handle);

      // Click per selezionare
      wrapper.addEventListener('click', function(e) {
        if (e.target.closest('.section-toolbar')) return;
        state.selectedSectionIndex = i;
        renderCanvas();
        renderProperties();
      });

      // Azioni toolbar
      toolbar.addEventListener('click', function(e) {
        var btn = e.target.closest('button');
        if (!btn) return;
        e.stopPropagation();
        var action = btn.dataset.action;
        handleSectionAction(action, i);
      });

      // Drag dalla canvas (riordino)
      wrapper.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'canvas', index: i }));
        e.dataTransfer.effectAllowed = 'move';
        wrapper.style.opacity = '0.4';
      });
      wrapper.addEventListener('dragend', function() {
        wrapper.style.opacity = '1';
        clearDropHighlights();
      });

      // Drop zone
      wrapper.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        wrapper.classList.add('drag-over');
      });
      wrapper.addEventListener('dragleave', function() {
        wrapper.classList.remove('drag-over');
      });
      wrapper.addEventListener('drop', function(e) {
        e.preventDefault();
        wrapper.classList.remove('drag-over');
        handleDrop(e, i);
      });

      canvas.appendChild(wrapper);
    });
  }

  // === DRAG & DROP ===
  function setupDragDrop() {
    var canvas = document.getElementById('canvas-content');
    if (!canvas) return;

    canvas.addEventListener('dragover', function(e) {
      e.preventDefault();
    });
    canvas.addEventListener('drop', function(e) {
      if (e.target === canvas || e.target.classList.contains('drop-placeholder')) {
        e.preventDefault();
        handleDrop(e, -1);
      }
    });
  }

  function handleDrop(e, targetIndex) {
    var data;
    try {
      data = JSON.parse(e.dataTransfer.getData('text/plain'));
    } catch (err) { return; }

    var page = getCurrentPage();
    if (!page) return;

    if (data.source === 'sidebar') {
      // Nuova sezione dalla sidebar
      var newSection = {
        type: data.type,
        props: JSON.parse(JSON.stringify(DEFAULT_PROPS[data.type] || {}))
      };
      if (targetIndex >= 0) {
        page.sections.splice(targetIndex, 0, newSection);
      } else {
        page.sections.push(newSection);
      }
      state.selectedSectionIndex = targetIndex >= 0 ? targetIndex : page.sections.length - 1;
    } else if (data.source === 'canvas') {
      // Riordino sezioni
      var fromIndex = data.index;
      if (fromIndex === targetIndex) return;
      var section = page.sections.splice(fromIndex, 1)[0];
      var insertAt = targetIndex >= 0 ? (fromIndex < targetIndex ? targetIndex - 1 : targetIndex) : page.sections.length;
      page.sections.splice(insertAt, 0, section);
      state.selectedSectionIndex = insertAt;
    }

    state.isDirty = true;
    renderCanvas();
    renderProperties();
  }

  function clearDropHighlights() {
    document.querySelectorAll('.canvas-section.drag-over').forEach(function(el) {
      el.classList.remove('drag-over');
    });
  }

  // === AZIONI SEZIONE ===
  function handleSectionAction(action, index) {
    var page = getCurrentPage();
    if (!page) return;

    switch (action) {
      case 'up':
        if (index > 0) {
          var temp = page.sections[index];
          page.sections[index] = page.sections[index - 1];
          page.sections[index - 1] = temp;
          state.selectedSectionIndex = index - 1;
        }
        break;
      case 'down':
        if (index < page.sections.length - 1) {
          var temp2 = page.sections[index];
          page.sections[index] = page.sections[index + 1];
          page.sections[index + 1] = temp2;
          state.selectedSectionIndex = index + 1;
        }
        break;
      case 'duplicate':
        var clone = JSON.parse(JSON.stringify(page.sections[index]));
        page.sections.splice(index + 1, 0, clone);
        state.selectedSectionIndex = index + 1;
        break;
      case 'delete':
        if (confirm('Eliminare questa sezione?')) {
          page.sections.splice(index, 1);
          state.selectedSectionIndex = -1;
        }
        break;
    }

    state.isDirty = true;
    renderCanvas();
    renderProperties();
  }

  // === AGGIUNGERE SEZIONE ===
  function addSection(type) {
    var page = getCurrentPage();
    if (!page) return;
    page.sections.push({
      type: type,
      props: JSON.parse(JSON.stringify(DEFAULT_PROPS[type] || {}))
    });
    state.selectedSectionIndex = page.sections.length - 1;
    state.isDirty = true;
    renderCanvas();
    renderProperties();
    // Scrolla al fondo del canvas
    var canvasArea = document.querySelector('.canvas-area');
    if (canvasArea) canvasArea.scrollTop = canvasArea.scrollHeight;
  }

  // === PANNELLO PROPRIETÀ (SIDEBAR DESTRA) ===
  function renderProperties() {
    var panel = document.getElementById('props-panel');
    if (!panel) return;

    if (state.selectedSectionIndex < 0) {
      panel.innerHTML = '<div class="props-empty"><p>Seleziona una sezione nel canvas per modificarne le proprietà</p></div>';
      return;
    }

    var page = getCurrentPage();
    var section = page.sections[state.selectedSectionIndex];
    if (!section) return;

    var sectionInfo = SECTION_TYPES.find(function(s) { return s.type === section.type; });
    var html = '<div class="props-header"><h3>' + (sectionInfo ? sectionInfo.name : section.type) + '</h3></div>';

    // Genera input per ogni prop (esclusi array complessi)
    var props = section.props || {};
    Object.keys(props).forEach(function(key) {
      var value = props[key];

      // Saltiamo gli array complessi (items) — gestiti separatamente
      if (Array.isArray(value) && typeof value[0] === 'object') {
        html += '<div class="prop-group">' +
          '<label class="prop-label">' + key + ' (' + value.length + ' elementi)</label>' +
          '<button class="toolbar-btn" style="font-size:0.8rem;padding:4px 10px;" data-action="edit-array" data-key="' + key + '">Modifica elementi</button>' +
        '</div>';
        return;
      }

      if (Array.isArray(value)) {
        // Array semplice (es: fields, nav_links)
        html += '<div class="prop-group">' +
          '<label class="prop-label">' + key + '</label>' +
          '<input class="prop-input" data-key="' + key + '" data-type="array" value="' + escAttr(value.join(', ')) + '" placeholder="Valori separati da virgola">' +
        '</div>';
        return;
      }

      if (typeof value === 'boolean') {
        html += '<div class="prop-group"><label class="prop-toggle">' +
          '<input type="checkbox" data-key="' + key + '" data-type="boolean"' + (value ? ' checked' : '') + '> ' + key +
        '</label></div>';
        return;
      }

      if (typeof value === 'number') {
        html += '<div class="prop-group">' +
          '<label class="prop-label">' + key + '</label>' +
          '<input class="prop-input" type="number" data-key="' + key + '" data-type="number" value="' + value + '">' +
        '</div>';
        return;
      }

      // Stringa
      if (key.includes('color') || key === 'bg_color') {
        html += '<div class="prop-group">' +
          '<label class="prop-label">' + key + '</label>' +
          '<div class="prop-color"><input type="color" data-key="' + key + '" data-type="string" value="' + escAttr(value || '#333333') + '"><input class="prop-input" data-key="' + key + '-text" data-type="color-text" value="' + escAttr(value) + '" style="flex:1;"></div>' +
        '</div>';
        return;
      }

      var isLong = key === 'text' || key === 'subheadline' || key === 'description';
      html += '<div class="prop-group">' +
        '<label class="prop-label">' + key + '</label>' +
        (isLong ? '<textarea class="prop-input" data-key="' + key + '" data-type="string" rows="3">' + escHTML(value) + '</textarea>' :
          '<input class="prop-input" data-key="' + key + '" data-type="string" value="' + escAttr(value) + '">') +
      '</div>';
    });

    panel.innerHTML = html;

    // Event listeners per aggiornamento live
    panel.querySelectorAll('.prop-input, input[type="color"], input[type="checkbox"], input[type="number"]').forEach(function(input) {
      var eventType = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(eventType, function() {
        updateProp(this);
      });
    });

    // Pulsanti modifica array complessi
    panel.querySelectorAll('[data-action="edit-array"]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var key = this.dataset.key;
        editArrayItems(key);
      });
    });
  }

  // Aggiorna una proprietà della sezione selezionata
  function updateProp(input) {
    var page = getCurrentPage();
    var section = page.sections[state.selectedSectionIndex];
    if (!section) return;

    var key = input.dataset.key;
    var type = input.dataset.type;

    if (type === 'color-text') {
      // Sincronizza colore dall'input testo
      key = key.replace('-text', '');
      section.props[key] = input.value;
      var colorInput = document.querySelector('input[type="color"][data-key="' + key + '"]');
      if (colorInput && input.value.match(/^#[0-9a-f]{6}$/i)) colorInput.value = input.value;
    } else if (type === 'boolean') {
      section.props[key] = input.checked;
    } else if (type === 'number') {
      section.props[key] = parseFloat(input.value) || 0;
    } else if (type === 'array') {
      section.props[key] = input.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
    } else {
      section.props[key] = input.value;
      // Sincronizza input testo se è un colore
      var textInput = document.querySelector('[data-key="' + key + '-text"]');
      if (textInput) textInput.value = input.value;
    }

    state.isDirty = true;
    renderCanvas();
  }

  // Editor semplificato per array di oggetti
  function editArrayItems(key) {
    var page = getCurrentPage();
    var section = page.sections[state.selectedSectionIndex];
    var items = section.props[key];
    if (!items || !Array.isArray(items)) return;

    // Mostra JSON editabile in prompt (semplificato)
    var json = JSON.stringify(items, null, 2);
    var newJson = prompt('Modifica gli elementi (formato JSON):', json);
    if (newJson === null) return;

    try {
      section.props[key] = JSON.parse(newJson);
      state.isDirty = true;
      renderCanvas();
      renderProperties();
    } catch (e) {
      alert('JSON non valido: ' + e.message);
    }
  }

  // === VIEWPORT TOGGLE ===
  function setupViewportToggle() {
    document.querySelectorAll('.viewport-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.viewport-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var frame = document.getElementById('canvas-frame');
        if (!frame) return;
        frame.classList.remove('tablet', 'mobile');
        var vp = btn.dataset.viewport;
        if (vp === 'tablet') frame.classList.add('tablet');
        if (vp === 'mobile') frame.classList.add('mobile');
        state.viewport = vp;
      });
    });
  }

  // === TOOLBAR ACTIONS ===
  function setupToolbarActions() {
    // Salva
    var saveBtn = document.getElementById('btn-save');
    if (saveBtn) {
      saveBtn.addEventListener('click', function() { saveProject(); });
    }

    // Preview
    var previewBtn = document.getElementById('btn-preview');
    if (previewBtn) {
      previewBtn.addEventListener('click', function() {
        saveProject().then(function() {
          window.open('preview.html?project=' + state.projectId, '_blank');
        });
      });
    }

    // Export
    var exportBtn = document.getElementById('btn-export');
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        if (typeof SiteForgeExporter !== 'undefined') {
          SiteForgeExporter.exportToZip(state.siteJSON);
        }
      });
    }

    // Torna alla dashboard
    var backBtn = document.getElementById('btn-back');
    if (backBtn) {
      backBtn.addEventListener('click', function() {
        if (state.isDirty) {
          saveProject().then(function() {
            window.location.href = 'dashboard.html';
          });
        } else {
          window.location.href = 'dashboard.html';
        }
      });
    }
  }

  // === AUTO-SAVE ===
  function setupAutoSave() {
    // Salva ogni 30 secondi se ci sono modifiche
    state.autoSaveTimer = setInterval(function() {
      if (state.isDirty) {
        saveProject();
      }
    }, 30000);

    // Salva prima di chiudere la pagina
    window.addEventListener('beforeunload', function(e) {
      if (state.isDirty) {
        e.preventDefault();
        e.returnValue = 'Hai modifiche non salvate. Vuoi davvero uscire?';
      }
    });
  }

  // === SALVATAGGIO ===
  async function saveProject() {
    if (!state.projectId || !state.siteJSON) return;
    var statusEl = document.getElementById('save-status');

    try {
      await SiteForgeDB.updateProject(state.projectId, state.siteJSON);
      state.isDirty = false;
      if (statusEl) {
        statusEl.textContent = 'Salvato';
        statusEl.style.color = '#2ecc71';
        setTimeout(function() { statusEl.textContent = ''; }, 2000);
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = 'Errore salvataggio';
        statusEl.style.color = '#e74c3c';
      }
    }
  }

  // === UTILITY ===
  function getCurrentPage() {
    if (!state.siteJSON || !state.siteJSON.pages) return null;
    return state.siteJSON.pages[state.currentPageIndex] || null;
  }

  function escAttr(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function escHTML(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // === AVVIO ===
  // Aspetta che il DOM sia pronto e che le dipendenze siano caricate
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // Piccolo ritardo per assicurare che Supabase sia inizializzato
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }

  // Esponi per debug
  window.SiteForgeBuilder = {
    getState: function() { return state; },
    save: saveProject
  };

})();
