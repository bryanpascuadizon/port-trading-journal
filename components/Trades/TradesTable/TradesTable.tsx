import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trades } from "@prisma/client";
import TradesTableRow from "./TradesTableRow";

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

  return (
    trades && (
      <div className="rounded-lg p-0 overflow-hidden border-1 border-gray-100 my-5">
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
            {trades.map((trade: Trades, index) => (
              <TradesTableRow
                trade={trade}
                key={index}
                refetchPortfolioTrades={refetchPortfolioTrades}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
};

export default TradesTable;
