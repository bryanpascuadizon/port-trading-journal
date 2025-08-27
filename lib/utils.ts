import { clsx, type ClassValue } from "clsx";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { DEFAULT_ERROR_MESSAGE } from "./constants";
import { format } from "date-fns";
import { Trades } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scryptAsync = async (password: string, salt: string) => {
  return await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
};

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt)) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const [salt, originalHash] = hashedPassword.split(":");

  const hashedBuffer = (await scryptAsync(password, salt)) as Buffer;
  const keyBuffer = Buffer.from(originalHash, "hex");

  return timingSafeEqual(hashedBuffer, keyBuffer);
};

export const axiosError = (error: unknown) => {
  console.log("axios error: ", error);
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status !== 200) {
      return {
        success: false,
        message: data,
      };
    }
  }

  return {
    success: false,
    message: DEFAULT_ERROR_MESSAGE,
  };
};

export const formatDateToUTCDate = (date: Date) => {
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

export const currencyIsNegative = (currency: number) => {
  if (currency < 0) {
    return "text-negative";
  }

  if (currency > 0) {
    return "text-positive";
  }
};

export const extractPathname = (pathname: string) => {
  const [, portfolioPath = "", sectionPath = "", portfolioIdPath = ""] =
    pathname.split("/");

  //Ex. /portfolio, /dashboard, /{portfolioId}
  return { portfolioPath, sectionPath, portfolioIdPath };
};

export const calculateOverallPnL = (trades: Trades[]) => {
  const overallTotal = trades.reduce(
    (acc, trade) => acc + Number(trade.pnl),
    0
  );

  const { overallWinningTrades, overallLosingTrades } = trades.reduce(
    (acc, trade: Trades) => {
      const pnl = Number(trade.pnl);

      if (pnl > 0) {
        acc.overallWinningTrades = acc.overallWinningTrades + pnl;
      }

      if (pnl < 0) {
        acc.overallLosingTrades = acc.overallLosingTrades + pnl;
      }

      return acc;
    },
    { overallWinningTrades: 0, overallLosingTrades: 0 }
  );

  return { overallWinningTrades, overallLosingTrades, overallTotal };
};

export const calculateOverallWinRate = (trades: Trades[]) => {
  const numberOfTrades = trades.length;

  const { winningTrades, losingTrades } = trades.reduce(
    (acc, trade) => {
      const pnl = Number(trade.pnl);

      if (pnl > 0) {
        acc.winningTrades++;
      }

      if (pnl < 0) {
        acc.losingTrades++;
      }
      return acc;
    },
    { winningTrades: 0, losingTrades: 0 }
  );
  const winRatePercentage = (winningTrades / numberOfTrades) * 100;

  return {
    numberOfTrades,
    winningTrades,
    losingTrades,
    winRatePercentage,
  };
};

export const calculateProfitFactor = (trades: Trades[]) => {
  const { overallWinningTrades, overallLosingTrades } = trades.reduce(
    (acc, trade: Trades) => {
      const pnl = Number(trade.pnl);

      if (pnl > 0) {
        acc.overallWinningTrades = acc.overallWinningTrades + pnl;
      }

      if (pnl < 0) {
        acc.overallLosingTrades = acc.overallLosingTrades + pnl;
      }

      return acc;
    },
    { overallWinningTrades: 0, overallLosingTrades: 0 }
  );

  const profitFactor =
    trades.length > 0 ? overallWinningTrades / overallLosingTrades : 0;

  return profitFactor;
};
