"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { currencyFormatter, currencyIsNegative } from "@/lib/utils";
import { Trades } from "@prisma/client";
import moment from "moment";
import UpdateTradeForm from "./UpdateTradeForm";
import { useState } from "react";

interface TradesTableRow {
  trade: Trades;
}

const TradesTableRow = ({ trade }: TradesTableRow) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <TableRow className="text-center cursor-pointer">
          <TableCell className="p-5 font-bold">{trade.symbol}</TableCell>
          <TableCell>{trade.position}</TableCell>
          <TableCell>
            {`${moment(trade.entryDate).format("MMM DD, YYYY")}`}
          </TableCell>
          <TableCell>
            {currencyFormatter.format(Number(trade.entryPrice))}
          </TableCell>
          <TableCell>
            {`${moment(trade.exitDate).format("MMM DD, YYYY")}`}
          </TableCell>
          <TableCell>
            {currencyFormatter.format(Number(trade.exitPrice))}
          </TableCell>
          <TableCell>{Number(trade.lotSize)}</TableCell>
          <TableCell className={`${currencyIsNegative(Number(trade.pnl))}`}>
            {" "}
            {currencyFormatter.format(Number(trade.pnl))}
          </TableCell>
        </TableRow>
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle asChild>
            <h1 className="font-semibold text-2xl">Update Trade</h1>
          </SheetTitle>
          <SheetDescription>
            Update trade details to reflect changes, improve accuracy, and keep
            your strategy aligned.
          </SheetDescription>
        </SheetHeader>

        {/* Sheet Body */}
        <UpdateTradeForm trade={trade} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

export default TradesTableRow;
