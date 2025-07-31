import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CreateTradeForm from "./CreateTradeForm";

const CreateTradeDialog = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create Trade</Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle asChild>
            <h1 className="font-semibold text-2xl">Create Trade</h1>
          </SheetTitle>
          <SheetDescription>
            Log your latest trade from quick scalps to long-term plays. Stay
            consistent, spot patterns, and improve your strategy.
          </SheetDescription>
        </SheetHeader>

        {/* Sheet Body */}
        <CreateTradeForm />
      </SheetContent>
    </Sheet>
  );
};

export default CreateTradeDialog;
