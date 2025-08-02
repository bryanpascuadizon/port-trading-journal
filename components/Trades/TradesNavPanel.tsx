import CreateTradeDialog from "./CreateTradeDialog/CreateTradeDialog";

interface TradesNavPanelProps {
  refetchPortfolioTrades: () => void;
}

const TradesNavPanel = ({ refetchPortfolioTrades }: TradesNavPanelProps) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <CreateTradeDialog refetchPortfolioTrades={refetchPortfolioTrades} />
    </div>
  );
};

export default TradesNavPanel;
