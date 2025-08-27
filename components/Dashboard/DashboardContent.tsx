import { Trades } from "@prisma/client";
import DashboardPnL from "./DashboardPnL";
import DashboardWinRate from "./DashboardWinRate";
import DashboardProfitFactor from "./DashboardProfitFactor";

interface DashboardContent {
  trades: Trades[];
  isLoading: boolean;
}

const DashboardContent = ({ trades, isLoading }: DashboardContent) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <DashboardPnL trades={trades} isLoading={isLoading} />
        <DashboardWinRate trades={trades} isLoading={isLoading} />
        <DashboardProfitFactor trades={trades} isLoading={isLoading} />
      </div>
    </>
  );
};

export default DashboardContent;
