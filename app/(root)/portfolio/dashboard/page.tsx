"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const { hasPortfolio, isLoading } = usePortfolio();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!hasPortfolio) {
    redirect("/onboarding");
  }

  return <p>Dashboard</p>;
};

export default Dashboard;
