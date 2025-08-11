export type Trade = {
  symbol: string;
  position: string;
  entryDate: Date;
  entryPrice: string;
  exitDate: Date;
  exitPrice: string;
  lotSize: string;
  pnl: string;
  remarks: string;
  portfolioId: string;
  userId: string;
  screenshotUrl: string;
  screenshotId: string;
};

export type Position = {
  position?: "long" | "short";
};
