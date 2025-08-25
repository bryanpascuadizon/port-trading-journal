import ToastMessage from "@/components/ToastMessage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoaderCircleIcon from "@/components/utils/LoaderCircleIcon";
import { deleteTrade } from "@/lib/actions/trade-actions";
import { Trades } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeleteTradeDialogProps {
  refetchPortfolioTrades: () => void;
  trade: Trades;
}

const DeleteTradeDialog = ({
  refetchPortfolioTrades,
  trade,
}: DeleteTradeDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const handleDeleteTrade = () => {
    startDeleteTransition(async () => {
      const response = await deleteTrade(trade.id, trade.screenshotId);

      if (response.success) {
        refetchPortfolioTrades();
        setDialogOpen(false);
      }

      toast(
        <ToastMessage success={response.success} message={response.message} />
      );
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Trash2 className="h-6 text-negative cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Trade</DialogTitle>
        <DialogDescription className="text-gray-500 text-sm">
          Are you sure you want to delete this trade? This will also delete the
          image uploaded and will not be recycled.
        </DialogDescription>
        <Button
          className="bg-negative hover:bg-negative"
          onClick={handleDeleteTrade}
          disabled={isDeletePending}
        >
          {isDeletePending ? <LoaderCircleIcon /> : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTradeDialog;
