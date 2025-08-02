"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateTradeForm from "./CreateTradeForm";

interface CreateTradeDialogProps {
  refetchPortfolioTrades: () => void;
}

const CreateTradeDialog = ({
  refetchPortfolioTrades,
}: CreateTradeDialogProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
        <CreateTradeForm
          setOpen={setOpen}
          refetchPortfolioTrades={refetchPortfolioTrades}
        />
      </SheetContent>
    </Sheet>
  );
};

export default CreateTradeDialog;
