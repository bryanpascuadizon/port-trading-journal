import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import DeleteTradeDialog from "./DeleteTradeDialog";
import { Trades } from "@prisma/client";

interface DeleteTradeHoverCardProps {
  refetchPortfolioTrades: () => void;
  trade: Trades;
}

const DeleteTradeHoverCard = ({
  refetchPortfolioTrades,
  trade,
}: DeleteTradeHoverCardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <DeleteTradeDialog
          refetchPortfolioTrades={refetchPortfolioTrades}
          trade={trade}
        />
      </HoverCardTrigger>
      <HoverCardContent className="hover-card-content">Delete</HoverCardContent>
    </HoverCard>
  );
};

export default DeleteTradeHoverCard;
