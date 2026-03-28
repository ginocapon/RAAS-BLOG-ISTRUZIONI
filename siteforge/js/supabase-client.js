// SiteForge AI — Client Supabase per autenticazione e CRUD
// Gestisce login, registrazione, magic link, sessione e progetti

(function() {
  'use strict';

  // Inizializza Supabase (le chiavi vengono da config.js)
  var supabase = null;

  function initSupabase() {
    if (typeof SITEFORGE_CONFIG === 'undefined') {
      console.warn('SiteForge: config.js non caricato. Autenticazione non disponibile.');
      return false;
    }
    if (typeof window.supabase === 'undefined') {
      console.warn('SiteForge: Supabase SDK non caricato.');
      return false;
    }
    supabase = window.supabase.createClient(
      SITEFORGE_CONFIG.SUPABASE_URL,
      SITEFORGE_CONFIG.SUPABASE_ANON_KEY
    );
    return true;
  }

  // === AUTENTICAZIONE ===

  // Registrazione con email e password
  async function signUp(email, password) {
    if (!initSupabase()) return null;
    var result = await supabase.auth.signUp({ email: email, password: password });
    if (result.error) {
      alert('Errore registrazione: ' + result.error.message);
      return null;
    }
    // Crea record crediti iniziali (5 crediti gratuiti)
    if (result.data.user) {
      await supabase.from('user_credits').insert({
        user_id: result.data.user.id,
        credits: 5
      });
    }
    alert('Registrazione completata! Controlla la tua email per confermare l\'account.');
    return result.data;
  }

  // Login con email e password
  async function signIn(email, password) {
    if (!initSupabase()) return null;
    var result = await supabase.auth.signInWithPassword({ email: email, password: password });
    if (result.error) {
      alert('Errore accesso: ' + result.error.message);
      return null;
    }
    window.location.href = 'dashboard.html';
    return result.data;
  }

  // Login con Magic Link
  async function magicLink(email) {
    if (!initSupabase()) return null;
    var result = await supabase.auth.signInWithOtp({ email: email });
    if (result.error) {
      alert('Errore Magic Link: ' + result.error.message);
      return null;
    }
    alert('Magic Link inviato! Controlla la tua email.');
    return result.data;
  }

  // Logout
  async function signOut() {
    if (!initSupabase()) return;
    await supabase.auth.signOut();
    window.location.href = 'index.html';
  }

  // Ottieni sessione corrente
  async function getSession() {
    if (!initSupabase()) return null;
    var result = await supabase.auth.getSession();
    return result.data.session;
  }

  // Ottieni utente corrente
  async function getUser() {
    var session = await getSession();
    return session ? session.user : null;
  }

  // Proteggi pagina — redirect se non autenticato
  async function requireAuth() {
    var session = await getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    return session;
  }

  // === PROGETTI ===

  // Carica tutti i progetti dell'utente
  async function getProjects() {
    if (!initSupabase()) return [];
    var user = await getUser();
    if (!user) return [];
    var result = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    return result.data || [];
  }

  // Carica un singolo progetto
  async function getProject(projectId) {
    if (!initSupabase()) return null;
    var result = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();
    return result.data;
  }

  // Crea nuovo progetto
  async function createProject(name, siteJSON) {
    if (!initSupabase()) return null;
    var user = await getUser();
    if (!user) return null;
    var result = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        name: name,
        site_json: siteJSON
      })
      .select()
      .single();
    return result.data;
  }

  // Aggiorna progetto (salvataggio)
  async function updateProject(projectId, siteJSON) {
    if (!initSupabase()) return null;
    var result = await supabase
      .from('projects')
      .update({
        site_json: siteJSON,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)
      .select()
      .single();
    return result.data;
  }

  // Elimina progetto
  async function deleteProject(projectId) {
    if (!initSupabase()) return false;
    var result = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);
    return !result.error;
  }

  // === CREDITI ===

  // Ottieni crediti dell'utente
  async function getCredits() {
    if (!initSupabase()) return 0;
    var user = await getUser();
    if (!user) return 0;
    var result = await supabase
      .from('user_credits')
      .select('credits')
      .eq('user_id', user.id)
      .single();
    return result.data ? result.data.credits : 0;
  }

  // Scala crediti (ritorna true se successo, false se insufficienti)
  async function deductCredits(amount) {
    if (!initSupabase()) return false;
    var user = await getUser();
    if (!user) return false;
    var currentCredits = await getCredits();
    if (currentCredits < amount) {
      alert('Crediti insufficienti! Hai ' + currentCredits + ' crediti, ne servono ' + amount + '.');
      return false;
    }
    var result = await supabase
      .from('user_credits')
      .update({
        credits: currentCredits - amount,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);
    return !result.error;
  }

  // === IMPOSTAZIONI UTENTE (chiave API Anthropic) ===

  async function saveUserSettings(settings) {
    if (!initSupabase()) return false;
    var user = await getUser();
    if (!user) return false;
    var result = await supabase
      .from('user_settings')
      .upsert({
        user_id: user.id,
        settings: settings,
        updated_at: new Date().toISOString()
      });
    return !result.error;
  }

  async function getUserSettings() {
    if (!initSupabase()) return null;
    var user = await getUser();
    if (!user) return null;
    var result = await supabase
      .from('user_settings')
      .select('settings')
      .eq('user_id', user.id)
      .single();
    return result.data ? result.data.settings : null;
  }

  // Esponi API pubblica
  window.SiteForgeAuth = {
    signUp: signUp,
    signIn: signIn,
    magicLink: magicLink,
    signOut: signOut,
    getSession: getSession,
    getUser: getUser,
    requireAuth: requireAuth
  };

  window.SiteForgeDB = {
    getProjects: getProjects,
    getProject: getProject,
    createProject: createProject,
    updateProject: updateProject,
    deleteProject: deleteProject,
    getCredits: getCredits,
    deductCredits: deductCredits,
    saveUserSettings: saveUserSettings,
    getUserSettings: getUserSettings
  };

})();
