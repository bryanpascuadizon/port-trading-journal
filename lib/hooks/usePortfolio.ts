import { useQuery } from "@tanstack/react-query";
import { getUserPortfolios } from "../actions/portfolio-actions";

export const usePortfolio = () => {
  const {
    data: portfolios,
    isLoading,
    refetch: refetchUserPortfolios,
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getUserPortfolios,
  });

  return { portfolios, isLoading, refetchUserPortfolios };
};
