import { TradeSchema } from "@/lib/validations/trade-schema";
import { Trades } from "@prisma/client";
import { useTransition } from "react";
import { updateTrade } from "@/lib/actions/trade-actions";
import { toast } from "sonner";
import ToastMessage from "@/components/ToastMessage";
import TradeForm from "../TradeFormFields/TradeForm";

interface UpdateTradeFormProps {
  trade: Trades;
  setOpen: (open: boolean) => void;
  refetchPortfolioTrades: () => void;
}

const UpdateTradeForm = ({
  trade,
  setOpen,
  refetchPortfolioTrades,
}: UpdateTradeFormProps) => {
  const [isPending, startTransition] = useTransition();

  const defaultValues: TradeSchema = {
    symbol: trade.symbol,
    position: trade.position as "long" | "short",
    entryDate: new Date(trade.entryDate),
    exitDate: new Date(trade.exitDate),
    screenshot: trade.screenshotUrl,
    entryPrice: trade.entryPrice.toString(),
    exitPrice: trade.exitPrice.toString(),
    lotSize: trade.lotSize.toString(),
    pnl: trade.pnl.toString(),
  };

  const onSubmit = (data: TradeSchema) => {
    startTransition(async () => {
      const response = await updateTrade(data, trade);

      if (response.success) {
        refetchPortfolioTrades();

        setOpen(false);
      }

      toast(
        <ToastMessage success={response.success} message={response.message} />
      );
    });
  };

  return (
    <TradeForm
      isPending={isPending}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      action="Update Trade"
    />
  );
};

export default UpdateTradeForm;
