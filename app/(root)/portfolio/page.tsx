import PortfolioOnBoardingForm from "@/components/auth/Portfolio/OnboardingForm";

const PortfolioOnboardingPage = () => {
  return (
    <div className="max-w-md min-h-screen m-auto flex flex-col gap-3 items-center justify-center p-5">
      <div className="text-center">
        <h2 className="text-3xl font-semibold">
          Welcome to your Trading Journal
        </h2>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-4">
          To begin journaling your trades, start by creating your first
          portfolio.
        </p>
      </div>

      <PortfolioOnBoardingForm />
    </div>
  );
};

export default PortfolioOnboardingPage;
