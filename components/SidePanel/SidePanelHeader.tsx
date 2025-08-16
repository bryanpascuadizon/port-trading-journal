import Link from "next/link";
import { SidebarHeader } from "../ui/sidebar";
import { ChartCandlestick } from "lucide-react";

const SidePanelHeader = () => {
  return (
    <SidebarHeader className="side-panel-header">
      <div className="flex items-center gap-2">
        <ChartCandlestick className="h-7 w-7" />
        <Link className="" href="/">
          Trading Journal
        </Link>
      </div>
    </SidebarHeader>
  );
};

export default SidePanelHeader;
