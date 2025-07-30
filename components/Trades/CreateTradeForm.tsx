import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import CreateTradeUploadFile from "./CreateTradeUploadFile";
import CreateTradePosition from "./CreateTradePosition";

const CreateTradeForm = () => {
  return (
    <form className="p-4 flex flex-col gap-3 mt-[-30px]">
      {/* Symbol */}
      <Label>Symbol</Label>
      <Input placeholder="BTCUSD, XAUUSD" />

      {/* Position */}
      <CreateTradePosition />

      {/* Dates and Prices */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {/* Entry Date */}
          <Label>Entry Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "text-xs"
                  //!field.value && "text-muted-foreground"
                )}
              >
                <span>Pick an entry date</span>
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" captionLayout="dropdown" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          {/* Entry Price */}
          <Label>Entry Price</Label>
          <Input type="number" placeholder="100.00" className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-3">
          {/* Exit Date */}
          <Label>Exit Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "text-xs"
                  //!field.value && "text-muted-foreground"
                )}
              >
                <span>Pick an exit date</span>
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" captionLayout="dropdown" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          {/* Exit Price */}
          <Label>Exit Price</Label>
          <Input type="number" placeholder="100.00" />
        </div>
      </div>

      {/* Lot Size */}
      <Label>Lot Size</Label>
      <Input type="number" placeholder="0.5" />

      {/* Profit and Loss in $ */}
      <Label>PnL (Profit and Loss in $)</Label>
      <Input type="number" placeholder="$100.00" />

      {/* Screenshot */}
      <Label>Upload Screenshot</Label>
      <CreateTradeUploadFile />

      {/* Create trade button */}
      <Button>Create Trade</Button>
    </form>
  );
};

export default CreateTradeForm;
