"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { Popover } from "../ui/popover";
import { useState } from "react";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
} from "../ui/command";
import { Portfolio } from "@prisma/client";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

type PortfolioListProps = {
  portfolioId: string;
  setPortfolioId: (portfolioId: string) => void;
};

const PortfolioList = ({ portfolioId, setPortfolioId }: PortfolioListProps) => {
  const { portfolios, defaultPortfolio } = usePortfolio();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const renderPortfolio = (portfolioItem: Portfolio) => {
    return (
      <div className="flex flex-col items-start">
        <p className="text-base">{portfolioItem.name}</p>
        <p className="text-xs">
          {portfolioItem.broker} - {portfolioItem.accountNumber}
        </p>
      </div>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-7 mt-[-15px] mb-5 w-full"
        >
          {defaultPortfolio ? (
            renderPortfolio(defaultPortfolio)
          ) : (
            <Skeleton className="skeleton w-full h-3" />
          )}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-1">
        <Command>
          <CommandInput placeholder="Select portfolio..." />
          <CommandList>
            <CommandEmpty>No portfolios found</CommandEmpty>
            <CommandGroup>
              {portfolios?.data.map((portfolio: Portfolio) => (
                <CommandItem
                  key={portfolio.id}
                  value={portfolio.id}
                  onSelect={() => {
                    const paths = pathname.split("/");
                    const portfolioPath = paths[1];
                    const sectionPath = paths[2];

                    setPortfolioId(portfolio.id);
                    redirect(
                      `/${portfolioPath}/${sectionPath}/${portfolio.id}`
                    );
                  }}
                  className="flex justify-between cursor-pointer"
                >
                  {renderPortfolio(portfolio)}
                  <CheckIcon
                    className={cn(
                      portfolioId !== portfolio.id ? "opacity-0" : "opacity-100"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PortfolioList;
