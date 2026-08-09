ALTER TABLE "hadiths" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read hadiths" ON "hadiths" FOR SELECT USING (true);
CREATE POLICY "contributors write hadiths" ON "hadiths" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors update hadiths" ON "hadiths" FOR UPDATE USING (public.is_contributor());
CREATE POLICY "contributors delete hadiths" ON "hadiths" FOR DELETE USING (public.is_contributor());
