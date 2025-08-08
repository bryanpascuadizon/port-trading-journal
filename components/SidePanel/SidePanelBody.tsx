"use client";

import Link from "next/link";
import { SidebarContent } from "../ui/sidebar";
import { Icons } from "@/lib/icons";
import SidePanelLogoutButton from "./SidePanelLogoutButton";
import PortfolioList from "./PortfolioList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";

const SidePanelBody = () => {
  const params = useParams();
  const [portfolioId, setPortfolioId] = useState("");

  useEffect(() => {
    if (params.portfolioId) {
      const paramsPortfolioId = params.portfolioId as string;
      setPortfolioId(paramsPortfolioId);
    }
  }, [params]);

  const links = [
    {
      label: "Dashboard",
      href: `/portfolio/dashboard/${portfolioId}`,
      icon: <Icons.panelDashboard className="w-5 h-5" />,
    },
    {
      label: "Trades",
      href: `/portfolio/trades/${portfolioId}`,
      icon: <Icons.panelTrades className="w-5 h-5" />,
    },
  ];
  return (
    <SidebarContent className="side-panel-body">
      <div className="side-panel-body-section">
        <PortfolioList
          portfolioId={portfolioId}
          setPortfolioId={setPortfolioId}
        />
        <p className="side-panel-body-title">PORTFOLIO</p>
        {portfolioId ? (
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
        ) : (
          <>
            {links.map((_, index) => (
              <Skeleton className="skeleton my-5" key={index} />
            ))}
          </>
        )}
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
