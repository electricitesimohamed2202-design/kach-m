
CREATE TABLE public.qr_scans (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  user_agent text,
  referrer text,
  scanned_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.qr_scans TO anon;
GRANT SELECT, INSERT ON public.qr_scans TO authenticated;
GRANT ALL ON public.qr_scans TO service_role;

CREATE INDEX qr_scans_client_id_idx ON public.qr_scans(client_id);
CREATE INDEX qr_scans_scanned_at_idx ON public.qr_scans(scanned_at DESC);

ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log a scan"
ON public.qr_scans FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view scans"
ON public.qr_scans FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
