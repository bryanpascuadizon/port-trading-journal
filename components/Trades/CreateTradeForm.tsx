"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CreateTradeUploadFile from "./CreateTradeUploadFile";
import CreateTradePosition from "./CreateTradePosition";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { tradeSchema, TradeSchema } from "@/lib/validations/trade-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { createTrade } from "@/lib/actions/trade-actions";
import CreateTradeDate from "./CreateTradeDate";
import Image from "next/image";
import { useParams } from "next/navigation";
import ToastMessage from "../ToastMessage";
import { toast } from "sonner";

const CreateTradeForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TradeSchema>({
    resolver: zodResolver(tradeSchema),
  });
  const entryDate = watch("entryDate");
  const exitDate = watch("exitDate");
  const screenshot = watch("screenshot");

  const onSubmit = (data: TradeSchema) => {
    startTransition(async () => {
      const response = await createTrade(data, params.portfolioId as string);

      if (response.success) {
        toast(
          <ToastMessage success={response.success} message={response.message} />
        );

        setOpen(false);
      }
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
        <Input {...register("symbol")} placeholder="BTCUSD, AAPL, EURUSD" />
        {errors.symbol && renderErrorMessage(errors.symbol.message)}
      </div>

      {/* Position */}
      <div className="flex flex-col gap-2">
        <CreateTradePosition register={register} />
      </div>

      {/* Entry Date */}
      <div className="flex flex-col gap-2">
        <Label>Entry Date </Label>
        <CreateTradeDate
          setValue={setValue}
          date={entryDate}
          type="entryDate"
        />
        {errors.entryDate && renderErrorMessage(errors.entryDate.message)}
      </div>

      {/* Entry Price */}
      <div className="flex flex-col gap-2">
        <Label>Entry Price </Label>
        <Input {...register("entryPrice")} placeholder="100.00" />
        {errors.entryPrice && renderErrorMessage(errors.entryPrice.message)}
      </div>

      {/* Exit Date */}
      <div className="flex flex-col gap-2">
        <Label>Exit Date </Label>
        <CreateTradeDate setValue={setValue} date={exitDate} type="exitDate" />
        {errors.exitDate && renderErrorMessage(errors.exitDate.message)}
      </div>

      {/* Exit Price */}
      <div className="flex flex-col gap-2">
        <Label>Exit Price </Label>
        <Input {...register("exitPrice")} placeholder="100.00" />
        {errors.exitPrice && renderErrorMessage(errors.exitPrice.message)}
      </div>

      {/* Lot Size */}
      <div className="flex flex-col gap-2">
        <Label>Lot Size</Label>
        <Input {...register("lotSize")} placeholder="0.1" />
        {errors.lotSize && renderErrorMessage(errors.lotSize.message)}
      </div>

      {/* Profit and Loss in $ */}
      <div className="flex flex-col gap-2">
        <Label>PnL (Profit and Loss in $) </Label>
        <Input type="number" {...register("pnl")} placeholder="100.00" />
        {errors.pnl && renderErrorMessage(errors.pnl.message)}
      </div>

      {/* Screenshot */}
      <div className="flex flex-col gap-2">
        <Label>Upload Screenshot </Label>
        <CreateTradeUploadFile setValue={setValue} screenshot={screenshot} />
        {screenshot && !errors.screenshot && (
          <Image
            alt=""
            height={200}
            width={400}
            src={URL.createObjectURL(screenshot)}
            className="mt-1 object-contain rounded-lg"
          />
        )}
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
