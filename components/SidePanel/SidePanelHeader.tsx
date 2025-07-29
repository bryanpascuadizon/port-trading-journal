import Link from "next/link";
import { SidebarHeader } from "../ui/sidebar";
import { Icons } from "@/lib/icons";

const SidePanelHeader = () => {
  return (
    <SidebarHeader className="side-panel-header">
      <div className="flex items-center">
        <Icons.panelTrades className="w-10 h-10" />
        <Link className="" href="/">
          Trading Journal
        </Link>
      </div>
    </SidebarHeader>
  );
};

export default SidePanelHeader;
