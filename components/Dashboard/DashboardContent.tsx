import { Trades } from "@prisma/client";
import DashboardPnL from "./DashboardPnL";
import { Skeleton } from "../ui/skeleton";

interface DashboardContent {
  trades: Trades[] | undefined;
  isLoading: boolean;
}

const DashboardContent = ({ trades }: DashboardContent) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {trades ? (
          <DashboardPnL trades={trades} />
        ) : (
          <Skeleton className="skeleton w-full h-23" />
        )}
      </div>
    </>
  );
};

export default DashboardContent;
