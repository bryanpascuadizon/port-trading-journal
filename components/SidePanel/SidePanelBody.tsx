"use client";

import Link from "next/link";
import { SidebarContent } from "../ui/sidebar";
import SidePanelLogoutButton from "./SidePanelLogoutButton";
import PortfolioList from "./PortfolioList";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { ChartCandlestick, LayoutDashboard } from "lucide-react";

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
      icon: <LayoutDashboard className="h-6" />,
    },
    {
      label: "Trades",
      href: `/portfolio/trades/${portfolioId}`,
      icon: <ChartCandlestick className="h-6" />,
    },
  ];
  return (
    <SidebarContent className="side-panel-body">
      <div className="side-panel-body-section">
        <PortfolioList
          portfolioId={portfolioId}
          setPortfolioId={setPortfolioId}
        />

        {portfolioId ? (
          <div className="side-panel-body-content ">
            <p className="side-panel-body-title">PORTFOLIO</p>
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
            <Skeleton className="skeleton my-5 h-3 w-[50%]" />
            {links.map((_, index) => (
              <Skeleton className="skeleton my-5 h-3" key={index} />
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
