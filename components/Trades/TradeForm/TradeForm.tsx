import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TradeFormPositionField from "./TradeFormPositionField";
import TradeFormDateField from "./TradeFormDateField";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { tradeSchema, TradeSchema } from "@/lib/validations/trade-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TradeFormUploadFileField from "./TradeFormUploadFileField";
import { LoaderCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface TradeFormProps {
  isPending: boolean;
  onSubmit: (data: TradeSchema) => void;
  defaultValues: TradeSchema;
  action: string;
}

const TradeForm = ({
  isPending,
  onSubmit,
  defaultValues,
  action,
}: TradeFormProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
    defaultValues,
  });

  const entryDate = watch("entryDate");
  const exitDate = watch("exitDate");
  const screenshot = watch("screenshot");

  const renderErrorMessage = (errorMessage: string | undefined) => {
    return (
      <p className="text-xs text-[var(--color-destructive)]">
        {errorMessage?.toString()}
      </p>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 relative"
    >
      {/* Screenshot */}
      <div className="trade-form-field">
        <Label>Upload Screenshot </Label>
        <TradeFormUploadFileField setValue={setValue} screenshot={screenshot} />
        {errors.screenshot && renderErrorMessage(errors.screenshot.message)}
      </div>

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
        <Input
          {...register("entryPrice")}
          placeholder="100.00"
          type="number"
          step="0.01"
          inputMode="decimal"
        />
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
        <Input
          {...register("exitPrice")}
          placeholder="100.00"
          type="number"
          step="0.01"
          inputMode="decimal"
        />
        {errors.exitPrice && renderErrorMessage(errors.exitPrice.message)}
      </div>

      {/* Lot Size */}
      <div className="trade-form-field">
        <Label>Lot Size</Label>
        <Input
          {...register("lotSize")}
          placeholder="0.1"
          type="number"
          step="0.01"
          inputMode="decimal"
        />
        {errors.lotSize && renderErrorMessage(errors.lotSize.message)}
      </div>

      {/* Profit/Loss ($) */}
      <div className="trade-form-field">
        <Label>Profit/Loss ($) </Label>
        <Input
          {...register("pnl")}
          placeholder="100.00"
          type="number"
          step="0.01"
          inputMode="decimal"
        />
        {errors.pnl && renderErrorMessage(errors.pnl.message)}
      </div>

      {/* Remarks */}
      <div className="trade-form-field">
        <Label>Remarks</Label>
        <Textarea {...register("remarks")} />
        {errors.remarks && renderErrorMessage(errors.remarks.message)}
      </div>

      {/* Create trade button */}
      <div className="sticky bottom-0 p-3 shadow border-t-1 border-gray-200 bg-white">
        <Button
          className="rounded-lg w-full"
          disabled={isPending}
          type="submit"
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : action}
        </Button>
      </div>
    </form>
  );
};

export default TradeForm;
