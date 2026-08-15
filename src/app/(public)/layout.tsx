import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SearchCommand } from "@/components/public/search-command";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-12 pb-28 sm:pb-12">
        {children}
      </main>
      <SiteFooter />
      <SearchCommand />
      <MobileTabBar />
    </div>
  );
}
