// SiteForge AI — Esportatore HTML statico + ZIP
// Renderizza il JSON del sito in pagine HTML complete e genera un file ZIP

(function() {
  'use strict';

  // Mappa tipi sezione → funzione di rendering HTML
  var sectionRenderers = {

    hero: function(props, colors) {
      return '<section class="sf-hero" style="background:' + (props.bg_image ? 'url(' + props.bg_image + ') center/cover' : 'linear-gradient(135deg, ' + colors.primary + ', ' + adjustColor(colors.primary, 30) + ')') + ';padding:6rem 2rem;text-align:center;color:#fff;min-height:60vh;display:flex;align-items:center;justify-content:center;">' +
        '<div style="max-width:800px;margin:0 auto;">' +
          '<h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;margin-bottom:1rem;">' + esc(props.headline) + '</h1>' +
          (props.subheadline ? '<p style="font-size:1.2rem;opacity:0.85;margin-bottom:2rem;">' + esc(props.subheadline) + '</p>' : '') +
          (props.cta_text ? '<a href="' + esc(props.cta_link || '#') + '" style="display:inline-block;background:' + colors.cta + ';color:#fff;padding:0.9rem 2rem;border-radius:8px;font-weight:700;font-size:1rem;text-decoration:none;">' + esc(props.cta_text) + '</a>' : '') +
        '</div>' +
      '</section>';
    },

    hero_search: function(props, colors) {
      return '<section class="sf-hero-search" style="background:linear-gradient(135deg, ' + colors.primary + ', ' + adjustColor(colors.primary, 30) + ');padding:6rem 2rem;text-align:center;color:#fff;min-height:60vh;display:flex;align-items:center;justify-content:center;">' +
        '<div style="max-width:800px;margin:0 auto;">' +
          '<h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;margin-bottom:1rem;">' + esc(props.headline) + '</h1>' +
          (props.subheadline ? '<p style="font-size:1.2rem;opacity:0.85;margin-bottom:2rem;">' + esc(props.subheadline) + '</p>' : '') +
          '<div style="max-width:500px;margin:0 auto;position:relative;">' +
            '<input type="text" placeholder="' + esc(props.search_placeholder || 'Cerca...') + '" style="width:100%;padding:1rem 1.5rem;border-radius:50px;border:none;font-size:1rem;box-shadow:0 4px 20px rgba(0,0,0,0.2);">' +
          '</div>' +
        '</div>' +
      '</section>';
    },

    features_grid: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-features" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2rem;">';
      items.forEach(function(item) {
        html += '<div style="text-align:center;padding:2rem 1.5rem;">' +
          '<div style="width:56px;height:56px;background:' + colors.accent + '22;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;color:' + colors.primary + ';">&#9733;</div>' +
          '<h3 style="font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;color:#222;">' + esc(item.title) + '</h3>' +
          '<p style="font-size:0.95rem;color:#666;line-height:1.6;">' + esc(item.text) + '</p>' +
        '</div>';
      });
      html += '</div></div></section>';
      return html;
    },

    text_image: function(props, colors) {
      var dir = props.reversed ? 'row-reverse' : 'row';
      return '<section class="sf-text-image" style="padding:5rem 2rem;background:#fafafa;">' +
        '<div style="max-width:1100px;margin:0 auto;display:flex;flex-direction:' + dir + ';gap:3rem;align-items:center;flex-wrap:wrap;">' +
          '<div style="flex:1;min-width:280px;">' +
            (props.headline ? '<h2 style="font-size:1.8rem;font-weight:700;margin-bottom:1rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
            '<p style="font-size:1rem;color:#555;line-height:1.8;margin-bottom:1.5rem;">' + esc(props.text) + '</p>' +
            (props.cta_text ? '<a href="' + esc(props.cta_link || '#') + '" style="display:inline-block;background:' + colors.cta + ';color:#fff;padding:0.7rem 1.5rem;border-radius:8px;font-weight:600;text-decoration:none;">' + esc(props.cta_text) + '</a>' : '') +
          '</div>' +
          '<div style="flex:1;min-width:280px;">' +
            '<div style="background:' + colors.primary + '15;border-radius:12px;height:300px;display:flex;align-items:center;justify-content:center;color:' + colors.primary + ';font-size:3rem;">' +
              (props.image ? '<img src="' + esc(props.image) + '" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" width="500" height="300">' : '&#128247;') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
    },

    gallery: function(props, colors) {
      var items = props.items || [];
      var cols = props.columns || 3;
      var html = '<section class="sf-gallery" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(' + (cols === 2 ? '400px' : '280px') + ',1fr));gap:1.5rem;">';
      items.forEach(function(item) {
        html += '<div style="border-radius:12px;overflow:hidden;background:#f0f0f0;">' +
          '<div style="height:200px;background:' + colors.accent + '22;display:flex;align-items:center;justify-content:center;font-size:2rem;color:' + colors.primary + ';">' +
            (item.image ? '<img src="' + esc(item.image) + '" alt="' + esc(item.caption || '') + '" style="width:100%;height:100%;object-fit:cover;" width="400" height="200">' : '&#128247;') +
          '</div>' +
          (item.caption ? '<p style="padding:0.75rem 1rem;font-size:0.9rem;color:#444;">' + esc(item.caption) + '</p>' : '') +
        '</div>';
      });
      html += '</div></div></section>';
      return html;
    },

    testimonials: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-testimonials" style="padding:5rem 2rem;background:#fafafa;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;">';
      items.forEach(function(item) {
        var stars = '';
        for (var i = 0; i < (item.stars || 5); i++) stars += '&#9733;';
        html += '<div style="background:#fff;border-radius:12px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,0.06);">' +
          '<div style="color:' + colors.cta + ';margin-bottom:0.75rem;">' + stars + '</div>' +
          '<p style="font-size:0.95rem;color:#555;line-height:1.7;margin-bottom:1.25rem;">"' + esc(item.text) + '"</p>' +
          '<div style="display:flex;align-items:center;gap:0.75rem;">' +
            '<div style="width:40px;height:40px;border-radius:50%;background:' + colors.primary + '22;display:flex;align-items:center;justify-content:center;font-size:1rem;color:' + colors.primary + ';">&#128100;</div>' +
            '<div><strong style="color:#222;font-size:0.9rem;">' + esc(item.name) + '</strong>' +
            (item.role ? '<br><span style="font-size:0.8rem;color:#999;">' + esc(item.role) + '</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>';
      });
      html += '</div></div></section>';
      return html;
    },

    pricing_cards: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-pricing" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;">';
      items.forEach(function(item) {
        var border = item.featured ? '2px solid ' + colors.primary : '1px solid #eee';
        html += '<div style="border:' + border + ';border-radius:16px;padding:2.5rem 2rem;text-align:center;position:relative;">' +
          (item.featured ? '<div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:' + colors.primary + ';color:#fff;padding:0.25rem 1rem;border-radius:50px;font-size:0.8rem;font-weight:700;">Consigliato</div>' : '') +
          '<h3 style="font-size:1.2rem;font-weight:700;color:#222;margin-bottom:0.5rem;">' + esc(item.name) + '</h3>' +
          '<div style="font-size:2.5rem;font-weight:800;color:#222;margin:1rem 0;">' + esc(item.price) + (item.period ? '<span style="font-size:0.9rem;font-weight:400;color:#999;"> ' + esc(item.period) + '</span>' : '') + '</div>' +
          '<ul style="list-style:none;text-align:left;margin:1.5rem 0;">';
        (item.features || []).forEach(function(f) {
          html += '<li style="padding:0.4rem 0;border-bottom:1px solid #f5f5f5;font-size:0.9rem;color:#555;">&#10003; ' + esc(f) + '</li>';
        });
        html += '</ul>' +
          (item.cta_text ? '<a href="' + esc(item.cta_link || '#') + '" style="display:inline-block;background:' + colors.cta + ';color:#fff;padding:0.7rem 1.5rem;border-radius:8px;font-weight:600;text-decoration:none;width:100%;text-align:center;">' + esc(item.cta_text) + '</a>' : '') +
        '</div>';
      });
      html += '</div></div></section>';
      return html;
    },

    contact_form: function(props, colors) {
      var fields = props.fields || ['nome', 'email', 'messaggio'];
      var html = '<section class="sf-contact" style="padding:5rem 2rem;background:#fafafa;">' +
        '<div style="max-width:600px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:2rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<form' + (props.formspree_id ? ' action="https://formspree.io/f/' + esc(props.formspree_id) + '" method="POST"' : '') + '>';
      fields.forEach(function(field) {
        if (field === 'messaggio') {
          html += '<div style="margin-bottom:1rem;"><label style="display:block;font-weight:600;margin-bottom:0.3rem;color:#333;font-size:0.9rem;">' + capitalize(field) + '</label><textarea name="' + esc(field) + '" rows="4" style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:8px;font-family:inherit;font-size:0.95rem;resize:vertical;" required></textarea></div>';
        } else {
          var type = field === 'email' ? 'email' : (field === 'telefono' ? 'tel' : 'text');
          html += '<div style="margin-bottom:1rem;"><label style="display:block;font-weight:600;margin-bottom:0.3rem;color:#333;font-size:0.9rem;">' + capitalize(field) + '</label><input type="' + type + '" name="' + esc(field) + '" style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:8px;font-size:0.95rem;" required></div>';
        }
      });
      html += '<button type="submit" style="background:' + colors.cta + ';color:#fff;padding:0.8rem 2rem;border:none;border-radius:8px;font-weight:700;font-size:1rem;cursor:pointer;width:100%;">' + esc(props.submit_text || 'Invia') + '</button></form></div></section>';
      return html;
    },

    map_embed: function(props, colors) {
      return '<section class="sf-map" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:2rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        (props.address ? '<p style="text-align:center;color:#666;margin-bottom:1.5rem;">' + esc(props.address) + '</p>' : '') +
        '<div style="border-radius:12px;overflow:hidden;height:400px;background:#e0e0e0;display:flex;align-items:center;justify-content:center;">' +
          (props.embed_url ? '<iframe src="' + esc(props.embed_url) + '" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" title="Mappa"></iframe>' : '<span style="color:#999;font-size:1.2rem;">&#128205; Mappa Google Maps</span>') +
        '</div>' +
        '</div></section>';
    },

    blog_grid: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-blog" style="padding:5rem 2rem;background:#fafafa;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;">';
      items.forEach(function(item) {
        html += '<article style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">' +
          '<div style="height:180px;background:' + colors.primary + '15;display:flex;align-items:center;justify-content:center;font-size:2rem;color:' + colors.primary + ';">' +
            (item.image ? '<img src="' + esc(item.image) + '" alt="" style="width:100%;height:100%;object-fit:cover;" width="400" height="180">' : '&#128196;') +
          '</div>' +
          '<div style="padding:1.5rem;">' +
            (item.date ? '<span style="font-size:0.8rem;color:#999;">' + esc(item.date) + '</span>' : '') +
            '<h3 style="font-size:1.1rem;font-weight:700;color:#222;margin:0.5rem 0;">' + esc(item.title) + '</h3>' +
            (item.excerpt ? '<p style="font-size:0.9rem;color:#666;line-height:1.6;">' + esc(item.excerpt) + '</p>' : '') +
            (item.link ? '<a href="' + esc(item.link) + '" style="display:inline-block;margin-top:0.75rem;color:' + colors.primary + ';font-weight:600;font-size:0.9rem;text-decoration:none;">Leggi &rarr;</a>' : '') +
          '</div></article>';
      });
      html += '</div></div></section>';
      return html;
    },

    faq_accordion: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-faq" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:750px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '');
      items.forEach(function(item) {
        html += '<details style="border-bottom:1px solid #eee;padding:1rem 0;">' +
          '<summary style="font-weight:600;color:#222;cursor:pointer;font-size:1.05rem;">' + esc(item.question) + '</summary>' +
          '<p style="padding-top:0.75rem;color:#666;line-height:1.7;font-size:0.95rem;">' + esc(item.answer) + '</p>' +
        '</details>';
      });
      html += '</div></section>';
      return html;
    },

    team_grid: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-team" style="padding:5rem 2rem;background:#fafafa;">' +
        '<div style="max-width:1100px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;">';
      items.forEach(function(item) {
        html += '<div style="text-align:center;padding:1.5rem;">' +
          '<div style="width:100px;height:100px;border-radius:50%;background:' + colors.primary + '15;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:' + colors.primary + ';">' +
            (item.photo ? '<img src="' + esc(item.photo) + '" alt="' + esc(item.name) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" width="100" height="100">' : '&#128100;') +
          '</div>' +
          '<h3 style="font-size:1rem;font-weight:700;color:#222;margin-bottom:0.25rem;">' + esc(item.name) + '</h3>' +
          '<p style="font-size:0.85rem;color:#888;">' + esc(item.role) + '</p>' +
        '</div>';
      });
      html += '</div></div></section>';
      return html;
    },

    stats_counter: function(props, colors) {
      var items = props.items || [];
      var html = '<section class="sf-stats" style="padding:4rem 2rem;background:' + colors.primary + ';color:#fff;">' +
        '<div style="max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:2rem;text-align:center;">';
      items.forEach(function(item) {
        html += '<div>' +
          '<div style="font-size:2.5rem;font-weight:800;">' + esc(String(item.number)) + esc(item.suffix || '') + '</div>' +
          '<div style="font-size:0.9rem;opacity:0.8;margin-top:0.5rem;">' + esc(item.label) + '</div>' +
        '</div>';
      });
      html += '</div></section>';
      return html;
    },

    cta_banner: function(props, colors) {
      var bg = props.bg_color || colors.cta;
      return '<section class="sf-cta" style="padding:4rem 2rem;background:' + esc(bg) + ';color:#fff;text-align:center;">' +
        '<div style="max-width:700px;margin:0 auto;">' +
          '<h2 style="font-size:2rem;font-weight:800;margin-bottom:0.75rem;">' + esc(props.headline) + '</h2>' +
          (props.subheadline ? '<p style="font-size:1.1rem;opacity:0.85;margin-bottom:2rem;">' + esc(props.subheadline) + '</p>' : '') +
          (props.cta_text ? '<a href="' + esc(props.cta_link || '#') + '" style="display:inline-block;background:#fff;color:' + esc(bg) + ';padding:0.8rem 2rem;border-radius:8px;font-weight:700;text-decoration:none;font-size:1rem;">' + esc(props.cta_text) + '</a>' : '') +
        '</div></section>';
    },

    video_embed: function(props, colors) {
      return '<section class="sf-video" style="padding:5rem 2rem;background:#fff;">' +
        '<div style="max-width:800px;margin:0 auto;">' +
        (props.headline ? '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:2rem;color:#222;">' + esc(props.headline) + '</h2>' : '') +
        '<div style="position:relative;padding-bottom:56.25%;height:0;border-radius:12px;overflow:hidden;">' +
          (props.youtube_url ? '<iframe src="' + esc(props.youtube_url) + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen title="Video"></iframe>' : '<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#f0f0f0;display:flex;align-items:center;justify-content:center;color:#999;font-size:2rem;">&#9654; Video</div>') +
        '</div></div></section>';
    }
  };

  // Renderizza una singola sezione
  function renderSection(type, props, colors) {
    var renderer = sectionRenderers[type];
    if (!renderer) {
      return '<!-- Sezione sconosciuta: ' + esc(type) + ' -->';
    }
    return renderer(props, colors);
  }

  // Genera HTML completo per una pagina
  function renderPage(siteJSON, pageIndex) {
    var meta = siteJSON.meta || {};
    var page = siteJSON.pages[pageIndex];
    var settings = siteJSON.settings || {};
    var colors = meta.colors || { primary: '#333', accent: '#666', cta: '#e67e22' };
    var fonts = meta.fonts || ['Inter'];

    var html = '<!DOCTYPE html>\n<html lang="it">\n<head>\n' +
      '  <meta charset="UTF-8">\n' +
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
      '  <title>' + esc(meta.title || 'Sito') + ' — ' + esc(page.name) + '</title>\n' +
      '  <meta name="description" content="' + esc(meta.description || '') + '">\n' +
      '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '  <link href="https://fonts.googleapis.com/css2?family=' + fonts.map(function(f){ return encodeURIComponent(f) + ':wght@400;600;700'; }).join('&family=') + '&display=swap" rel="stylesheet">\n' +
      '  <style>\n' +
      '    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n' +
      '    body { font-family: "' + esc(fonts[fonts.length > 1 ? 1 : 0]) + '", sans-serif; color: #333; line-height: 1.6; }\n' +
      '    h1, h2, h3, h4 { font-family: "' + esc(fonts[0]) + '", serif; }\n' +
      '    a { color: inherit; }\n' +
      '    img { max-width: 100%; height: auto; }\n' +
      '    .sf-nav { background: #fff; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.06); position: sticky; top: 0; z-index: 100; }\n' +
      '    .sf-nav-logo { font-family: "' + esc(fonts[0]) + '", serif; font-size: 1.3rem; font-weight: 700; color: ' + colors.primary + '; text-decoration: none; }\n' +
      '    .sf-nav-links { display: flex; gap: 1.5rem; list-style: none; }\n' +
      '    .sf-nav-links a { text-decoration: none; font-size: 0.9rem; font-weight: 500; color: #555; transition: color 0.2s; }\n' +
      '    .sf-nav-links a:hover { color: ' + colors.primary + '; }\n' +
      '    .sf-footer { background: ' + colors.primary + '; color: #fff; padding: 2rem; text-align: center; font-size: 0.9rem; opacity: 0.9; }\n' +
      '    @media (max-width: 768px) {\n' +
      '      .sf-nav { flex-direction: column; gap: 0.75rem; }\n' +
      '      .sf-nav-links { flex-wrap: wrap; justify-content: center; gap: 0.75rem; }\n' +
      '    }\n' +
      '  </style>\n' +
      '</head>\n<body>\n';

    // Navbar
    html += '<nav class="sf-nav">\n' +
      '  <a href="index.html" class="sf-nav-logo">' + esc(meta.title || 'Sito') + '</a>\n' +
      '  <ul class="sf-nav-links">\n';
    (settings.nav_links || []).forEach(function(link, i) {
      var page_match = (siteJSON.pages || []).find(function(p) { return p.name === link; });
      var href = page_match ? (page_match.slug === '/' ? 'index.html' : page_match.id + '.html') : '#';
      html += '    <li><a href="' + href + '">' + esc(link) + '</a></li>\n';
    });
    html += '  </ul>\n</nav>\n\n';

    // Sezioni
    (page.sections || []).forEach(function(section) {
      html += renderSection(section.type, section.props || {}, colors) + '\n\n';
    });

    // Footer
    html += '<footer class="sf-footer">\n  <p>' + esc(settings.footer_text || '') + '</p>\n';
    if (settings.whatsapp) {
      html += '  <p style="margin-top:0.5rem;"><a href="https://wa.me/' + esc(settings.whatsapp.replace(/[^0-9+]/g, '')) + '" style="color:#fff;">WhatsApp: ' + esc(settings.whatsapp) + '</a></p>\n';
    }
    html += '</footer>\n</body>\n</html>';

    return html;
  }

  // Esporta tutto il sito come ZIP
  async function exportToZip(siteJSON) {
    // Verifica crediti
    var canAfford = await SiteForgeCredits.canAfford('EXPORT_HTML');
    if (!canAfford) {
      SiteForgeCredits.showBuyModal();
      return;
    }

    // Verifica JSZip
    if (typeof JSZip === 'undefined') {
      alert('Errore: libreria JSZip non disponibile.');
      return;
    }

    var zip = new JSZip();
    var assetsFolder = zip.folder('assets');

    // Genera HTML per ogni pagina
    (siteJSON.pages || []).forEach(function(page, i) {
      var filename = page.slug === '/' ? 'index.html' : page.id + '.html';
      var html = renderPage(siteJSON, i);
      zip.file(filename, html);
    });

    // README con istruzioni deploy
    var readme = '# ' + esc(siteJSON.meta.title || 'Il mio sito') + '\n\n' +
      'Sito generato con SiteForge AI.\n\n' +
      '## Deploy su GitHub Pages\n\n' +
      '1. Crea un nuovo repository su GitHub\n' +
      '2. Carica tutti i file di questa cartella nel repository\n' +
      '3. Vai su Settings > Pages > Source: "Deploy from a branch"\n' +
      '4. Seleziona il branch "main" e la cartella "/" (root)\n' +
      '5. Clicca "Save" — il sito sarà online in pochi minuti!\n\n' +
      '## Deploy su Netlify\n\n' +
      '1. Vai su netlify.com e crea un account\n' +
      '2. Trascina la cartella del sito sulla dashboard di Netlify\n' +
      '3. Il sito sarà online immediatamente!\n';
    zip.file('README.md', readme);

    // Placeholder assets
    assetsFolder.file('.gitkeep', '');

    // Genera e scarica il ZIP
    var blob = await zip.generateAsync({ type: 'blob' });

    // Addebita crediti
    await SiteForgeCredits.charge('EXPORT_HTML');

    // Download
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (siteJSON.meta.title || 'sito').replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Utility: escape HTML
  function esc(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  // Utility: prima lettera maiuscola
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Utility: schiarisci/scurisci colore hex
  function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    var r = Math.min(255, Math.max(0, parseInt(hex.substring(0, 2), 16) + amount));
    var g = Math.min(255, Math.max(0, parseInt(hex.substring(2, 4), 16) + amount));
    var b = Math.min(255, Math.max(0, parseInt(hex.substring(4, 6), 16) + amount));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Esponi API pubblica
  window.SiteForgeExporter = {
    renderSection: renderSection,
    renderPage: renderPage,
    exportToZip: exportToZip
  };

})();
