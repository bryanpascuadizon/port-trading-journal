"use client";

import TradesContent from "@/components/Trades/TradesContent";
import TradesHeader from "@/components/Trades/TradesHeader";
import { Separator } from "@/components/ui/separator";
import { useTrades } from "@/lib/hooks/useTrades";

const Trades = () => {
  const { trades, isLoading, refetchPortfolioTrades } = useTrades();

  return (
    <>
      <TradesHeader />
      <Separator className="separator my-3" />
      <TradesContent
        trades={trades?.data}
        isLoading={isLoading}
        refetchPortfolioTrades={refetchPortfolioTrades}
      />
    </>
  );
};

export default Trades;
