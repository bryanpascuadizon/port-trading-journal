import { useQuery } from "@tanstack/react-query";
import { getUserPortfolios } from "../actions/portfolio-actions";
import { Portfolio } from "@prisma/client";

export const usePortfolio = () => {
  const {
    data: portfolios,
    isLoading,
    refetch: refetchUserPortfolios,
  } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getUserPortfolios,
  });

  const defaultPortfolio: Portfolio =
    portfolios && portfolios?.data.find((port: Portfolio) => port.isDefault);

  return { portfolios, isLoading, defaultPortfolio, refetchUserPortfolios };
};
