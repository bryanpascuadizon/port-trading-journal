import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { tradeSchema, TradeSchema } from "@/lib/validations/trade-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trades } from "@prisma/client";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import TradeFormDateField from "../TradeFormFields/TradeFormDateField";
import TradeFormPositionField from "../TradeFormFields/TradeFormPositionField";
import TradeFormUploadFileField from "../TradeFormFields/TradeFormUploadFileField";
import { updateTrade } from "@/lib/actions/trade-actions";
import { toast } from "sonner";
import ToastMessage from "@/components/ToastMessage";

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

  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      position: trade.position as "long" | "short",
      entryDate: new Date(trade.entryDate),
      exitDate: new Date(trade.exitDate),
      screenshot: trade.screenshotUrl,
    },
  });

  const entryDate = watch("entryDate", trade.entryDate);
  const exitDate = watch("exitDate", trade.exitDate);
  const screenshot = watch("screenshot", trade.screenshotUrl);

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

  const renderErrorMessage = (
    errorMessage:
      | string
      | FieldError
      | Merge<FieldError, FieldErrorsImpl<TradeSchema>>
      | undefined
  ) => {
    return (
      <p className="text-xs text-[var(--color-destructive)]">
        {errorMessage?.toString()}
      </p>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 flex flex-col gap-3 mt-[-40px] relative"
    >
      {/* Symbol */}
      <div className="flex flex-col gap-2">
        <Label>Symbol</Label>
        <Input
          placeholder="BTCUSD, AAPL, EURUSD"
          {...register("symbol")}
          defaultValue={trade.symbol}
        />
      </div>

      {/* Position */}
      <div className="flex flex-col gap-2">
        <TradeFormPositionField control={control} />
      </div>

      {/* Entry Date */}
      <div className="flex flex-col gap-2">
        <Label>Entry Date </Label>
        <TradeFormDateField
          setValue={setValue}
          date={entryDate}
          type="entryDate"
        />
        {errors.entryDate && renderErrorMessage(errors.entryDate.message)}
      </div>

      {/* Entry Price */}
      <div className="flex flex-col gap-2">
        <Label>Entry Price </Label>
        <Input
          {...register("entryPrice")}
          placeholder="100.00"
          defaultValue={Number(trade.entryPrice)}
        />
        {errors.entryPrice && renderErrorMessage(errors.entryPrice.message)}
      </div>

      {/* Exit Date */}
      <div className="flex flex-col gap-2">
        <Label>Exit Date </Label>
        <TradeFormDateField
          setValue={setValue}
          date={exitDate}
          type="exitDate"
        />
        {errors.exitDate && renderErrorMessage(errors.exitDate.message)}
      </div>

      {/* Exit Price */}
      <div className="flex flex-col gap-2">
        <Label>Exit Price </Label>
        <Input
          {...register("exitPrice")}
          placeholder="100.00"
          defaultValue={Number(trade.exitPrice)}
        />
        {errors.exitPrice && renderErrorMessage(errors.exitPrice.message)}
      </div>

      {/* Lot Size */}
      <div className="flex flex-col gap-2">
        <Label>Lot Size</Label>
        <Input
          {...register("lotSize")}
          placeholder="0.1"
          defaultValue={Number(trade.lotSize)}
        />
        {errors.lotSize && renderErrorMessage(errors.lotSize.message)}
      </div>

      {/* Profit and Loss in $ */}
      <div className="flex flex-col gap-2">
        <Label>PnL (Profit and Loss in $) </Label>
        <Input
          {...register("pnl")}
          placeholder="100.00"
          defaultValue={Number(trade.pnl)}
        />
        {errors.pnl && renderErrorMessage(errors.pnl.message)}
      </div>

      {/* Screenshot */}
      <div className="trade-form-field">
        <Label>Upload Screenshot </Label>
        <TradeFormUploadFileField setValue={setValue} screenshot={screenshot} />
        {errors.screenshot && renderErrorMessage(errors.screenshot.message)}
      </div>

      {/* Create trade button */}
      <div className="sticky bottom-0 p-3">
        <Button className="w-full rounded-full">
          {isPending ? "Updating..." : "Update Trade"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateTradeForm;
