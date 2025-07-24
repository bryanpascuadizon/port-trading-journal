"use client";

import OnboardingPage from "@/components/Portfolio/Onboarding";
import { usePortfolio } from "@/lib/hooks/usePortfolio";

const Portfolio = () => {
  const { portfolios, isLoading } = usePortfolio();

  console.log(portfolios, isLoading);
  return <OnboardingPage />;
};

export default Portfolio;
