import { calculateOverallWinRate, currencyIsNegative } from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";

interface DashboardWinRateProps {
  trades: Trades[];
}

const DashboardWinRate = ({ trades }: DashboardWinRateProps) => {
  const winRate = useMemo(() => {
    return calculateOverallWinRate(trades);
  }, [trades]);

  return (
    <div className="dashboard-section">
      <p className="dashboard-section-title">Win Rate</p>
      <div className="flex justify-between items-center gap-5">
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
          <span>{winRate.winningTradesLength}</span>
          <br />
          <span className="text-negative">Loses: </span>
          <span>{winRate.losingTradesLength}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardWinRate;
