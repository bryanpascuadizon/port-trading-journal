import TradesContent from "@/components/Trades/TradesContent";
import TradesHeader from "@/components/Trades/TradesHeader";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trades",
};

const Trades = () => {
  return (
    <>
      <TradesHeader />
      <Separator className="separator my-5" />
      <TradesContent />
    </>
  );
};

export default Trades;
