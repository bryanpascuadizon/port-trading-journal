import { SidebarTrigger } from "@/components/ui/sidebar";

const TradesHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-start items-center gap-2">
        <SidebarTrigger />
        <h1 className="font-semibold text-2xl">Trades</h1>
      </div>
    </div>
  );
};

export default TradesHeader;
