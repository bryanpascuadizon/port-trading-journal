import SidePanel from "@/components/SidePanel/SidePanel";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SidePanel />
      <main className="portfolio-container">
        <section className="portfolio-section relative">
          {children} <Toaster position="bottom-center" />
        </section>
      </main>
    </SidebarProvider>
  );
}
