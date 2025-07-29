"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const { defaultPortfolio, isLoading } = usePortfolio();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (defaultPortfolio) {
    redirect(`/portfolio/dashboard/${defaultPortfolio.id}`);
  }

  redirect("/onboarding");
};

export default DashboardPage;
