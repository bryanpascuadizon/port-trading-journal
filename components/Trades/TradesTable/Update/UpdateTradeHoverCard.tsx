import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine } from "lucide-react";

const UpdateTradeHoverCard = () => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <SheetTrigger asChild>
          <FilePenLine className="h-6 text-positive cursor-pointer" />
        </SheetTrigger>{" "}
      </HoverCardTrigger>
      <HoverCardContent className="hover-card-content">Edit</HoverCardContent>
    </HoverCard>
  );
};

export default UpdateTradeHoverCard;
