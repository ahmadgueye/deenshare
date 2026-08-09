-- Storage bucket for directly-uploaded resources (PDFs, images, small
-- files). Videos/large files should stay as external links (Drive,
-- YouTube) to stay within the free storage tier.
insert into storage.buckets (id, name, public, file_size_limit)
values ('ressources', 'ressources', true, 20971520) -- 20 MB
on conflict (id) do nothing;

create policy "public read ressources bucket"
on storage.objects for select
using (bucket_id = 'ressources');

create policy "contributors upload to ressources bucket"
on storage.objects for insert
with check (bucket_id = 'ressources' and public.is_contributor());

create policy "contributors delete from ressources bucket"
on storage.objects for delete
using (bucket_id = 'ressources' and public.is_contributor());
