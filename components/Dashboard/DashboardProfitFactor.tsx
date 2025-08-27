import { calculateProfitFactor, currencyIsNegative } from "@/lib/utils";
import { Trades } from "@prisma/client";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";
import DashboardInfo from "./DashboardInfo";

interface DashboardProfitFactorProps {
  trades: Trades[];
  isLoading: boolean;
}

const DashboardProfitFactor = ({
  trades,
  isLoading,
}: DashboardProfitFactorProps) => {
  const profitFactor = useMemo(() => {
    return calculateProfitFactor(trades);
  }, [trades]);

  return !isLoading ? (
    <div className="dashboard-section">
      <div className="dashboard-section-title">
        <span>Profit Factor</span>{" "}
        <DashboardInfo
          title="Profit Factor"
          info="is the ratio of total profits from winning trades to total losses from losing trades."
        />
      </div>
      <div>
        <p
          className={`my-2 font-semibold text-2xl ${currencyIsNegative(
            profitFactor
          )}`}
        >
          {profitFactor === Infinity ? "∞" : profitFactor}
        </p>
      </div>
    </div>
  ) : (
    <Skeleton className="skeleton w-full h-26" />
  );
};

export default DashboardProfitFactor;
