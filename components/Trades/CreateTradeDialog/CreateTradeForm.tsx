"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { tradeSchema, TradeSchema } from "@/lib/validations/trade-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createTrade } from "@/lib/actions/trade-actions";
import { useParams } from "next/navigation";
import ToastMessage from "@/components/ToastMessage";
import { toast } from "sonner";
import { LONG } from "@/lib/constants";
import TradeFormDateField from "../TradeFormFields/TradeFormDateField";
import TradeFormPositionField from "../TradeFormFields/TradeFormPositionField";
import TradeFormUploadFileField from "../TradeFormFields/TradeFormUploadFileField";

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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      position: LONG,
      entryDate: new Date(),
      exitDate: new Date(),
    },
  });

  const entryDate = watch("entryDate");
  const exitDate = watch("exitDate");
  const screenshot = watch("screenshot");

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
      <div className="trade-form-field">
        <Label>Symbol</Label>
        <Input {...register("symbol")} placeholder="BTCUSD, AAPL, EURUSD" />
        {errors.symbol && renderErrorMessage(errors.symbol.message)}
      </div>

      {/* Position */}
      <div className="trade-form-field">
        <TradeFormPositionField control={control} />
      </div>

      {/* Entry Date */}
      <div className="trade-form-field">
        <Label>Entry Date </Label>
        <TradeFormDateField
          setValue={setValue}
          date={entryDate}
          type="entryDate"
        />
        {errors.entryDate && renderErrorMessage(errors.entryDate.message)}
      </div>

      {/* Entry Price */}
      <div className="trade-form-field">
        <Label>Entry Price </Label>
        <Input {...register("entryPrice")} placeholder="100.00" />
        {errors.entryPrice && renderErrorMessage(errors.entryPrice.message)}
      </div>

      {/* Exit Date */}
      <div className="trade-form-field">
        <Label>Exit Date </Label>
        <TradeFormDateField
          setValue={setValue}
          date={exitDate}
          type="exitDate"
        />
        {errors.exitDate && renderErrorMessage(errors.exitDate.message)}
      </div>

      {/* Exit Price */}
      <div className="trade-form-field">
        <Label>Exit Price </Label>
        <Input {...register("exitPrice")} placeholder="100.00" />
        {errors.exitPrice && renderErrorMessage(errors.exitPrice.message)}
      </div>

      {/* Lot Size */}
      <div className="trade-form-field">
        <Label>Lot Size</Label>
        <Input {...register("lotSize")} placeholder="0.1" />
        {errors.lotSize && renderErrorMessage(errors.lotSize.message)}
      </div>

      {/* Profit and Loss in $ */}
      <div className="trade-form-field">
        <Label>PnL (Profit and Loss in $) </Label>
        <Input {...register("pnl")} placeholder="100.00" />
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
          {isPending ? "Creating..." : "Create Trade"}
        </Button>
      </div>
    </form>
  );
};

export default CreateTradeForm;
