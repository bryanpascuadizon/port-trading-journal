import { calculateOverallWinRate, currencyIsNegative } from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

interface DashboardWinRateProps {
  trades: Trades[];
  isLoading: boolean;
}

const DashboardWinRate = ({ trades, isLoading }: DashboardWinRateProps) => {
  const winRate = useMemo(() => {
    return calculateOverallWinRate(trades);
  }, [trades]);

  return !isLoading ? (
    <div className="dashboard-section">
      <p className="dashboard-section-title">Win Rate</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 items-center gap-1">
        <div>
          <p
            className={`my-2 font-semibold text-2xl ${currencyIsNegative(
              winRate.winRatePercentage
            )}`}
          >
            {isNaN(winRate.winRatePercentage) ? 0 : winRate.winRatePercentage}%
          </p>
        </div>
        <div className="text-xs">
          <span className="text-positive">Wins: </span>
          <span>{winRate.winningTrades}</span>
          <br />
          <span className="text-negative">Loses: </span>
          <span>{winRate.losingTrades}</span>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton className="skeleton w-full h-26" />
  );
};

export default DashboardWinRate;
