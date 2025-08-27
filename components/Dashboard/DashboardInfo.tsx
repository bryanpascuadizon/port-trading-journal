import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../ui/hover-card";

interface DashboardInfoProps {
  title: string;
  info: string;
}

const DashboardInfo = ({ title, info }: DashboardInfoProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Info className="inline w-4 h-4 mt-[-5px] cursor-pointer" />
      </HoverCardTrigger>
      <HoverCardContent className="text-xs">
        <span className="font-semibold">{title}</span> {info}
      </HoverCardContent>
    </HoverCard>
  );
};

export default DashboardInfo;
