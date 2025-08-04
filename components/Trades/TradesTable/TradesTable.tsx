import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trades } from "@prisma/client";
import moment from "moment";
import { currencyFormatter, currencyIsNegative } from "@/lib/utils";

interface TradesTableProps {
  trades: Trades[] | undefined;
}

const TradesTable = ({ trades }: TradesTableProps) => {
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
              <TableRow key={index} className="text-center cursor-pointer">
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
                <TableCell
                  className={`${currencyIsNegative(Number(trade.pnl))}`}
                >
                  {" "}
                  {currencyFormatter.format(Number(trade.pnl))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  );
};

export default TradesTable;
