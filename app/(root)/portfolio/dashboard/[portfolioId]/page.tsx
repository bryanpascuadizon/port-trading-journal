"use client";

import DashboardContent from "@/components/Dashboard/DashboardContent";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Separator } from "@/components/ui/separator";
import { useTrades } from "@/lib/hooks/useTrades";

const Dashboard = () => {
  const { trades, isLoading } = useTrades();

  const tradeData = trades?.data ?? [];

  return (
    <>
      <DashboardHeader />
      <Separator className="separator my-3" />
      {trades && <DashboardContent trades={tradeData} isLoading={isLoading} />}
    </>
  );
};

export default Dashboard;
