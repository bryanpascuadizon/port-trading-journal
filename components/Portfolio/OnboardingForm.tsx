"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPorfolio } from "@/lib/actions/portfolio-actions";
import {
  portfolioSchema,
  PortfolioSchema,
} from "@/lib/validations/portfolio-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import ToastMessage from "../ToastMessage";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const OnboardingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PortfolioSchema>({ resolver: zodResolver(portfolioSchema) });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: PortfolioSchema) => {
    const onBoardingData: PortfolioSchema = {
      ...data,
      isDefault: true,
    };

    startTransition(async () => {
      const response = await createPorfolio(onBoardingData);

      toast(
        <ToastMessage success={response.success} message={response.message} />
      );

      if (response.success) {
        redirect("/portfolio/dashboard");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name" className="text-gray-700">
            Name
          </Label>
          <Input {...register("name")} placeholder="e.g. Swing Trades" />
        </div>

        {errors.name && (
          <p className="text-sm text-[var(--color-destructive)]">
            {errors.name.message}{" "}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Label htmlFor="description" className="text-gray-700">
            Description
          </Label>
          <Input {...register("description")} />
        </div>

        {errors.description && (
          <p className="text-sm text-[var(--color-destructive)]">
            {errors.description.message}{" "}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Label htmlFor="broker" className="text-gray-700">
            Broker
          </Label>
          <Input {...register("broker")} placeholder="e.g. Binance" />
        </div>

        {errors.broker && (
          <p className="text-sm text-[var(--color-destructive)]">
            {errors.broker.message}{" "}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <Label htmlFor="account_number" className="text-gray-700">
            Account number
          </Label>
          <Input {...register("accountNumber")} />
        </div>

        {errors.accountNumber && (
          <p className="text-sm text-[var(--color-destructive)]">
            {errors.accountNumber.message}{" "}
          </p>
        )}

        <Input type="checkbox" hidden {...register("isDefault")} />

        {errors.isDefault && (
          <p className="text-sm text-[var(--color-destructive)]">
            {errors.isDefault.message}{" "}
          </p>
        )}

        <Button type="submit">{isPending ? "Creating..." : "Create"}</Button>
      </div>
    </form>
  );
};

export default OnboardingForm;
