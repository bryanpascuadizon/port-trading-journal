"use client";

import { TradeSchema } from "@/lib/validations/trade-schema";
import { Label } from "@/components/ui/label";
import { Control, Controller, ControllerRenderProps } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LONG, SHORT } from "@/lib/constants";

interface TradeFormPositionFieldProps {
  control: Control<TradeSchema>;
}

const TradeFormPositionField = ({ control }: TradeFormPositionFieldProps) => {
  const renderRadioGroupPositions = (
    field: ControllerRenderProps<TradeSchema, "position">
  ) => {
    return (
      <RadioGroup
        className="grid grid-cols-2 gap-3"
        onValueChange={field.onChange}
        value={field.value}
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem id={LONG} value={LONG} />
          <Label htmlFor={LONG} className="text-green-700">
            Long
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem id={SHORT} value={SHORT} />
          <Label htmlFor={SHORT} className="text-red-700">
            Short
          </Label>
        </div>
      </RadioGroup>
    );
  };
  return (
    <>
      <Label>Position</Label>
      <Controller
        name="position"
        control={control}
        render={({ field }) => renderRadioGroupPositions(field)}
      />
    </>
  );
};

export default TradeFormPositionField;
