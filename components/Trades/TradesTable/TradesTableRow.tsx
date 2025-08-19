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
import { useState, useTransition } from "react";
import { FilePenLine, Trash2 } from "lucide-react";
import { deleteTrade } from "@/lib/actions/trade-actions";
import { toast } from "sonner";
import ToastMessage from "@/components/ToastMessage";
import LoaderCircleIcon from "@/components/utils/LoaderCircleIcon";

interface TradesTableRow {
  trade: Trades;
  refetchPortfolioTrades: () => void;
}

const TradesTableRow = ({ trade, refetchPortfolioTrades }: TradesTableRow) => {
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDeleteTrade = () => {
    startDeleteTransition(async () => {
      const response = await deleteTrade(trade.id, trade.screenshotId);

      if (response.success) {
        refetchPortfolioTrades();

        setOpen(false);
      }

      toast(
        <ToastMessage success={response.success} message={response.message} />
      );
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <TableRow className="text-center">
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
        <TableCell className="flex justify-evenly mt-3">
          <SheetTrigger asChild>
            <FilePenLine className="h-6 text-positive cursor-pointer" />
          </SheetTrigger>

          {isDeletePending ? (
            <LoaderCircleIcon />
          ) : (
            <Trash2
              className="h-6 text-negative cursor-pointer"
              onClick={handleDeleteTrade}
            />
          )}
        </TableCell>
      </TableRow>
      <SheetContent className="overflow-auto">
        <SheetHeader>
          <SheetTitle asChild>
            <h1 className="font-semibold text-2xl">Update Trade</h1>
          </SheetTitle>
          <SheetDescription>
            Update your trades to reflect changes, improve accuracy, and keep
            your strategy aligned.
          </SheetDescription>
        </SheetHeader>

        {/* Sheet Body */}
        <UpdateTradeForm
          trade={trade}
          setOpen={setOpen}
          refetchPortfolioTrades={refetchPortfolioTrades}
        />
      </SheetContent>
    </Sheet>
  );
};

export default TradesTableRow;
