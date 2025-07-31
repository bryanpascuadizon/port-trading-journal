"use client";

import { TradeSchema } from "@/lib/validations/trade-schema";
import { Label } from "../ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { LONG, SHORT } from "@/lib/constants";
import { ReactNode } from "react";

interface CreateTradePositionProps {
  register: UseFormRegister<TradeSchema>;
  errors: FieldErrors<TradeSchema>;
  renderErrorMessage: (errorMessage: string | undefined) => ReactNode;
}

const CreateTradePosition = ({
  register,
  errors,
  renderErrorMessage,
}: CreateTradePositionProps) => {
  return (
    <>
      <Label>Position </Label>
      <RadioGroup className="grid grid-cols-2 gap-3" defaultValue={LONG}>
        <div className="flex items-center gap-3">
          <RadioGroupItem
            value={LONG}
            {...register("position")}
            defaultChecked
          />
          <Label htmlFor={LONG} className="text-green-700">
            Long
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={SHORT} {...register("position")} />
          <Label htmlFor={SHORT} className="text-red-700">
            Short
          </Label>
        </div>
      </RadioGroup>
      {errors.position && renderErrorMessage(errors.position.message)}
    </>
  );
};

export default CreateTradePosition;
