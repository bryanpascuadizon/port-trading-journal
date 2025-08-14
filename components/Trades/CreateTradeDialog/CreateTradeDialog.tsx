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
import { Trades } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";

interface CreateTradeDialogProps {
  trades: Trades[] | undefined;
  refetchPortfolioTrades: () => void;
}

const CreateTradeDialog = ({
  trades,
  refetchPortfolioTrades,
}: CreateTradeDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trades ? (
          <Button>Create Trade</Button>
        ) : (
          <Skeleton className="skeleton w-28 h-9" />
        )}
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
