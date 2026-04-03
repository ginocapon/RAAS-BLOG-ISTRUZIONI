-- Tracciamento interno ingest (non usato nelle select pubbliche del sito)
ALTER TABLE public.bandi
  ADD COLUMN IF NOT EXISTS provenance_interna jsonb DEFAULT '{}'::jsonb;

-- Allinea filtri UI bandi.html quando i record arrivano da Supabase
ALTER TABLE public.bandi
  ADD COLUMN IF NOT EXISTS stato text DEFAULT 'aperto';

COMMENT ON COLUMN public.bandi.provenance_interna IS 'Solo back-office: fonte listing, URL aggregatore, metodo risoluzione link istituzionale.';
