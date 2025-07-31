import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { UseFormSetValue } from "react-hook-form";
import { TradeSchema } from "@/lib/validations/trade-schema";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

interface CreateTradeDateProps {
  setValue: UseFormSetValue<TradeSchema>;
  date: Date;
  type: string;
}

const CreateTradeDate = ({ setValue, date, type }: CreateTradeDateProps) => {
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
            setValue(type === "entryDate" ? "entryDate" : "exitDate", date!)
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default CreateTradeDate;
