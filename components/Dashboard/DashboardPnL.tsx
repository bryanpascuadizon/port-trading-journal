import {
  calculateOverallPnL,
  currencyFormatter,
  currencyIsNegative,
} from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

interface DashboardPnL {
  trades: Trades[];
  isLoading: boolean;
}

const DashboardPnL = ({ trades, isLoading }: DashboardPnL) => {
  const overallPnl = useMemo(() => {
    return calculateOverallPnL(trades);
  }, [trades]);

  return !isLoading ? (
    <div className="dashboard-section">
      <p className="dashboard-section-title">Realized PNL</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-1">
        <div>
          <p
            className={`my-2 font-semibold text-2xl ${currencyIsNegative(
              overallPnl.overallTotal
            )}`}
          >
            {currencyFormatter.format(overallPnl.overallTotal)}
          </p>
        </div>
        <div className="text-xs">
          <span className="text-positive">Wins: </span>
          <span>
            {currencyFormatter.format(overallPnl.overallWinningTrades)}
          </span>
          <br />
          <span className="text-negative">Loses: </span>
          <span>
            {currencyFormatter.format(overallPnl.overallLosingTrades)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton className="skeleton w-full h-26" />
  );
};

export default DashboardPnL;
