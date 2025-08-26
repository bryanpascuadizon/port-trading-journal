"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { Popover } from "../ui/popover";
import { useEffect, useState } from "react";
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
import { cn, extractPathname } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import { Skeleton } from "../ui/skeleton";

type PortfolioListProps = {
  portfolioId: string;
  setPortfolioId: (portfolioId: string) => void;
};

const PortfolioList = ({ portfolioId, setPortfolioId }: PortfolioListProps) => {
  const { portfolios } = usePortfolio();

  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio>();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { sectionPath, portfolioPath, portfolioIdPath } =
    extractPathname(pathname);

  const renderPortfolioItem = (portfolioItem: Portfolio) => {
    return (
      <div className="flex flex-col items-start">
        <p className="text-base font-semibold">{portfolioItem.name}</p>
        <p className="text-xs">
          {portfolioItem.broker} - {portfolioItem.accountNumber}
        </p>
      </div>
    );
  };

  useEffect(() => {
    const selectedPortfolio = portfolios?.data.find(
      (portfolioItem: Portfolio) =>
        portfolioIdPath
          ? portfolioItem.id === portfolioIdPath
          : portfolioItem.isDefault
    );

    if (selectedPortfolio) {
      setCurrentPortfolio(selectedPortfolio);
    }
  }, [portfolios, portfolioIdPath]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-7 mt-[-15px] mb-5 w-full shadow-none"
        >
          {currentPortfolio ? (
            renderPortfolioItem(currentPortfolio)
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
                    setPortfolioId(portfolio.id);
                    setCurrentPortfolio(portfolio);
                    redirect(
                      `/${portfolioPath}/${sectionPath}/${portfolio.id}`
                    );
                  }}
                  className="flex justify-between cursor-pointer"
                >
                  {renderPortfolioItem(portfolio)}
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
