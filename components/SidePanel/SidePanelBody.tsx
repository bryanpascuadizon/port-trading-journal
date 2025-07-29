import Link from "next/link";
import { SidebarContent } from "../ui/sidebar";
import { Icons } from "@/lib/icons";
import SidePanelLogoutButton from "./SidePanelLogoutButton";

const SidePanelBody = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/portfolio/dashboard",
      icon: <Icons.panelDashboard className="w-5 h-5" />,
    },
    {
      label: "Trades",
      href: "/portfolio/trades",
      icon: <Icons.panelTrades className="w-5 h-5" />,
    },
  ];
  return (
    <SidebarContent className="side-panel-body">
      <div className="side-panel-body-section">
        <p className="side-panel-body-title">PORTFOLIO</p>
        <div className="side-panel-body-content ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex gap-2 items-center"
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="side-panel-body-section">
        <p className="side-panel-body-title">USER</p>
        <div className="side-panel-body-content ">
          <SidePanelLogoutButton />
        </div>
      </div>
    </SidebarContent>
  );
};

export default SidePanelBody;
