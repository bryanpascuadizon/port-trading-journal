import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const LoaderCircleIcon = ({ ...rest }) => {
  return <LoaderCircle className={cn("animate-spin", rest.className)} />;
};

export default LoaderCircleIcon;
