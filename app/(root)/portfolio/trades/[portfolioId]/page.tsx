import TradesHeader from "@/components/Trades/TradesHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades",
};

const Trades = () => {
  return (
    <>
      <TradesHeader />
    </>
  );
};

export default Trades;
