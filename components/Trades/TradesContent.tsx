"use client";

import { Trades } from "@prisma/client";
import TradesNavPanel from "./TradesNavPanel";
import TradesTable from "./TradesTable/TradesTable";

interface TradesTableProps {
  trades: Trades[] | undefined;
  isLoading: boolean;
  refetchPortfolioTrades: () => void;
}

const TradesContent = ({
  trades,
  isLoading,
  refetchPortfolioTrades,
}: TradesTableProps) => {
  return (
    <>
      <TradesNavPanel
        refetchPortfolioTrades={refetchPortfolioTrades}
        trades={trades}
      />
      <TradesTable
        trades={trades}
        isLoading={isLoading}
        refetchPortfolioTrades={refetchPortfolioTrades}
      />
    </>
  );
};

export default TradesContent;
