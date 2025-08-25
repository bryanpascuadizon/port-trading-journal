import { Trades } from "@prisma/client";
import DashboardPnL from "./DashboardPnL";

interface DashboardContent {
  trades: Trades[];
  isLoading: boolean;
}

const DashboardContent = ({ trades }: DashboardContent) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <DashboardPnL trades={trades} />
      </div>
    </>
  );
};

export default DashboardContent;
