import SidePanel from "@/components/SidePanel/SidePanel";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SidePanel />
      <main className="portfolio-container">{children}</main>
    </SidebarProvider>
  );
}
