import { calculateOverallWinRate, currencyIsNegative } from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import DashboardInfo from "./DashboardInfo";

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
      <div className="dashboard-section-title">
        <span>Win Rate</span>{" "}
        <DashboardInfo
          title="Win Rate"
          info="is the percentage of your trades that made a profit."
        />
      </div>
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
