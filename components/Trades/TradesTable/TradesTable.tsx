import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trades } from "@prisma/client";
import TradesTableRow from "./TradesTableRow";
import { Skeleton } from "@/components/ui/skeleton";

interface TradesTableProps {
  trades: Trades[] | undefined;
  isLoading: boolean;
  refetchPortfolioTrades: () => void;
}

const TradesTable = ({
  trades,
  isLoading,
  refetchPortfolioTrades,
}: TradesTableProps) => {
  const tableHeaders = [
    "Symbol",
    "Position",
    "Entry Date",
    "Entry Price",
    "Exit Date",
    "Exit Price",
    "Lot Size",
    "Profit/Loss ($)",
    "Actions",
  ];

  const renderLoadState = () => {
    return (
      <TableRow>
        {tableHeaders.map((_, index) => (
          <TableCell key={index} className="p-5">
            <Skeleton className="skeleton w-full h-3" />
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <div className="rounded-lg p-0 bg-white my-3">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead key={index} className="p-5 text-center font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && renderLoadState()}
          {trades &&
            trades.map((trade: Trades, index) => (
              <TradesTableRow
                trade={trade}
                key={index}
                refetchPortfolioTrades={refetchPortfolioTrades}
              />
            ))}
        </TableBody>
      </Table>
      {!isLoading && trades?.length === 0 && (
        <div className="w-full text-center py-5">
          <p className="font-semibold text-sm">No trade records</p>
        </div>
      )}
    </div>
  );
};

export default TradesTable;
