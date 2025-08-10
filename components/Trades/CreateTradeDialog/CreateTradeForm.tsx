import { useTransition } from "react";
import { createTrade } from "@/lib/actions/trade-actions";
import { useParams } from "next/navigation";
import ToastMessage from "@/components/ToastMessage";
import { toast } from "sonner";
import { LONG } from "@/lib/constants";
import TradeForm from "../TradeForm/TradeForm";
import { TradeSchema } from "@/lib/validations/trade-schema";

interface CreateTradeForm {
  refetchPortfolioTrades: () => void;
  setOpen: (open: boolean) => void;
}

const CreateTradeForm = ({
  setOpen,
  refetchPortfolioTrades,
}: CreateTradeForm) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const defaultValues: TradeSchema = {
    symbol: "",
    position: LONG,
    entryDate: new Date(),
    exitDate: new Date(),
    screenshot: "",
    entryPrice: "",
    exitPrice: "",
    lotSize: "",
    pnl: "",
  };

  const onSubmit = (data: TradeSchema) => {
    startTransition(async () => {
      const response = await createTrade(data, params.portfolioId as string);

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
      action="Create Trade"
    />
  );
};

export default CreateTradeForm;
