import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { TradeSchema } from "@/lib/validations/trade-schema";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface TradeFormDateProps {
  setValue: UseFormSetValue<TradeSchema>;
  date: Date;
  type: string;
}

const TradeFormDate = ({ setValue, date, type }: TradeFormDateProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("text-xs", !date && "text-muted-foreground")}
        >
          <span>{date ? format(date, "PP") : "Pick a date"}</span>
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) =>
            setValue(type === "entryDate" ? "entryDate" : "exitDate", date!, {
              shouldValidate: true,
            })
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default TradeFormDate;
