import { Trades } from "@prisma/client";
import CreateTradeDialog from "./CreateTradeDialog/CreateTradeDialog";

interface TradesNavPanelProps {
  trades: Trades[] | undefined;
  refetchPortfolioTrades: () => void;
}

const TradesNavPanel = ({
  trades,
  refetchPortfolioTrades,
}: TradesNavPanelProps) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <CreateTradeDialog
        refetchPortfolioTrades={refetchPortfolioTrades}
        trades={trades}
      />
    </div>
  );
};

export default TradesNavPanel;
