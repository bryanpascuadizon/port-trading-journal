import { Badge } from "../ui/badge";
import { Label } from "../ui/label";

const CreateTradePosition = () => {
  return (
    <>
      <Label>Position</Label>
      <div className="grid grid-cols-2 gap-3">
        <Badge className="bg-green-700 w-full p-1">Long</Badge>
        <Badge className="bg-red-700 w-full p-1">Short</Badge>
      </div>
    </>
  );
};

export default CreateTradePosition;
