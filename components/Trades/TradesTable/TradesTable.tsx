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
  refetchPortfolioTrades: () => void;
}

const TradesTable = ({ trades, refetchPortfolioTrades }: TradesTableProps) => {
  const tableHeaders = [
    "Symbol",
    "Position",
    "Entry Date",
    "Entry Price",
    "Exit Date",
    "Exit Price",
    "Lot Size",
    "Pnl",
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
    <div className="rounded-lg p-0 overflow-hidden border-1 border-gray-100 my-3">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            {tableHeaders.map((header, index) => (
              <TableHead key={index} className="p-5 text-center font-bold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades ? (
            <>
              {trades.map((trade: Trades, index) => (
                <TradesTableRow
                  trade={trade}
                  key={index}
                  refetchPortfolioTrades={refetchPortfolioTrades}
                />
              ))}
            </>
          ) : (
            renderLoadState()
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TradesTable;
