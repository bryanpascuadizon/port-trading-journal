import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTradesByPortfolio } from "../actions/trade-actions";

export const useTrades = () => {
  const params = useParams();
  const portfolioId = params.portfolioId as string;

  const {
    data: trades,
    isLoading,
    isError,
    refetch: refetchPortfolioTrades,
  } = useQuery({
    queryKey: ["trades", params.portfolioId],
    queryFn: () => getTradesByPortfolio(portfolioId),
    enabled: !!portfolioId,
  });

  return { trades, isLoading, isError, refetchPortfolioTrades };
};
