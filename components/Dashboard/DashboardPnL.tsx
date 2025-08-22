import {
  calculateOverallPnL,
  currencyFormatter,
  currencyIsNegative,
} from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";

interface DashboardPnL {
  trades: Trades[];
}

const DashboardPnL = ({ trades }: DashboardPnL) => {
  const overAllTotalPnl: number = useMemo(() => {
    return calculateOverallPnL(trades);
  }, [trades]);

  return (
    <div className="dashboard-section">
      <p className="dashboard-section-title">Realized PNL</p>
      <p
        className={`my-2 font-semibold text-2xl ${currencyIsNegative(
          overAllTotalPnl
        )}`}
      >
        {currencyFormatter.format(overAllTotalPnl)}
      </p>
    </div>
  );
};

export default DashboardPnL;
