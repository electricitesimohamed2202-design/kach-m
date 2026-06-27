
CREATE POLICY "Public read client assets" ON storage.objects FOR SELECT USING (bucket_id = 'client-assets');
CREATE POLICY "Admins upload client assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'client-assets' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update client assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'client-assets' AND public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete client assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'client-assets' AND public.has_role(auth.uid(),'admin'));
