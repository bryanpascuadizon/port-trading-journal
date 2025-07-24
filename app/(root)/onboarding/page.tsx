"use client";

import OnboardingPage from "@/components/Portfolio/Onboarding";
import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { redirect } from "next/navigation";

const Onboarding = () => {
  const { isLoading, hasPortfolio } = usePortfolio();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (hasPortfolio) {
    redirect("/portfolio/dashboard");
  }

  return <OnboardingPage />;
};

export default Onboarding;
