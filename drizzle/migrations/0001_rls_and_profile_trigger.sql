-- Link profiles to Supabase's managed auth.users table.
ALTER TABLE "profiles"
  ADD CONSTRAINT "profiles_id_auth_users_id_fk"
  FOREIGN KEY ("id") REFERENCES auth.users(id) ON DELETE CASCADE;

-- Auto-create a profile row whenever someone signs in for the first time.
-- New users default to 'contributor'; promote the first one to 'admin'
-- manually once, from the Supabase table editor.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security: public read on all content, writes restricted to
-- authenticated admins/contributors. This is the real security boundary,
-- not the UI hiding buttons.
ALTER TABLE "cours" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "thematiques" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ressources" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "seances" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "seance_thematiques" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "seance_ressources" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "profiles" ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_contributor()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'contributor')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- cours / thematiques / ressources / seances: identical shape.
CREATE POLICY "public read cours" ON "cours" FOR SELECT USING (true);
CREATE POLICY "contributors write cours" ON "cours" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors update cours" ON "cours" FOR UPDATE USING (public.is_contributor());
CREATE POLICY "contributors delete cours" ON "cours" FOR DELETE USING (public.is_contributor());

CREATE POLICY "public read thematiques" ON "thematiques" FOR SELECT USING (true);
CREATE POLICY "contributors write thematiques" ON "thematiques" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors update thematiques" ON "thematiques" FOR UPDATE USING (public.is_contributor());
CREATE POLICY "contributors delete thematiques" ON "thematiques" FOR DELETE USING (public.is_contributor());

CREATE POLICY "public read ressources" ON "ressources" FOR SELECT USING (true);
CREATE POLICY "contributors write ressources" ON "ressources" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors update ressources" ON "ressources" FOR UPDATE USING (public.is_contributor());
CREATE POLICY "contributors delete ressources" ON "ressources" FOR DELETE USING (public.is_contributor());

CREATE POLICY "public read seances" ON "seances" FOR SELECT USING (true);
CREATE POLICY "contributors write seances" ON "seances" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors update seances" ON "seances" FOR UPDATE USING (public.is_contributor());
CREATE POLICY "contributors delete seances" ON "seances" FOR DELETE USING (public.is_contributor());

CREATE POLICY "public read seance_thematiques" ON "seance_thematiques" FOR SELECT USING (true);
CREATE POLICY "contributors write seance_thematiques" ON "seance_thematiques" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors delete seance_thematiques" ON "seance_thematiques" FOR DELETE USING (public.is_contributor());

CREATE POLICY "public read seance_ressources" ON "seance_ressources" FOR SELECT USING (true);
CREATE POLICY "contributors write seance_ressources" ON "seance_ressources" FOR INSERT WITH CHECK (public.is_contributor());
CREATE POLICY "contributors delete seance_ressources" ON "seance_ressources" FOR DELETE USING (public.is_contributor());

-- profiles: any authenticated user can see the contributor/admin list
-- (needed for the admin "utilisateurs" screen); only admins can change
-- roles. No public (anonymous) access — profiles aren't part of the
-- public catalogue.
CREATE POLICY "authenticated read profiles" ON "profiles" FOR SELECT
  USING (auth.uid() IS NOT NULL);
CREATE POLICY "admins update profiles" ON "profiles" FOR UPDATE
  USING (public.is_admin());
