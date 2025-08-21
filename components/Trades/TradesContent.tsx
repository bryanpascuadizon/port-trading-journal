"use client";

import TradesNavPanel from "./TradesNavPanel";
import TradesTable from "./TradesTable/TradesTable";
import { useTrades } from "@/lib/hooks/useTrades";

const TradesContent = () => {
  const { trades, isLoading, refetchPortfolioTrades } = useTrades();

  return (
    <>
      <TradesNavPanel
        refetchPortfolioTrades={refetchPortfolioTrades}
        trades={trades?.data}
      />
      <TradesTable
        trades={trades?.data}
        isLoading={isLoading}
        refetchPortfolioTrades={refetchPortfolioTrades}
      />
    </>
  );
};

export default TradesContent;
