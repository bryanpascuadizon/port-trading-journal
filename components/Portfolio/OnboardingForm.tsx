"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PortfolioOnBoardingForm = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name" className="text-gray-700">
            Name
          </Label>
          <Input id="name" name="name" placeholder="e.g. Swing Trades" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="description" className="text-gray-700">
            Description
          </Label>
          <Input id="description" name="description" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="broker" className="text-gray-700">
            Broker
          </Label>
          <Input id="broker" name="broker" placeholder="e.g. Binance" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="account_number" className="text-gray-700">
            Account number
          </Label>
          <Input id="account_number" name="account_number" />
        </div>

        <Button>Create</Button>
      </div>
    </form>
  );
};

export default PortfolioOnBoardingForm;
