"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { redirect } from "next/navigation";

const Trades = () => {
  const { hasPortfolio, isLoading } = usePortfolio();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!hasPortfolio) {
    redirect("/onboarding");
  }

  return <p>Trades</p>;
};

export default Trades;
