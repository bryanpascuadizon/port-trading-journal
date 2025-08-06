import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <Separator className="separator my-5" />
    </>
  );
};

export default Dashboard;
