"use server";

import {
  createTradeData,
  getTradesByPortfolioData,
} from "../handlers/trade-handlers";
import { axiosError, formatDateToUTCDate } from "../utils";
import { TradeSchema, tradeSchema } from "../validations/trade-schema";
import { Trade } from "../types";
import { UNAUTHORIZED_USER_NO_SESSION } from "../constants";
import { getUserSession } from "./auth-actions";
import { Prisma, Trades } from "@prisma/client";
import { AxiosResponse } from "axios";
import { uploadImageToCloudinary } from "../cloudinary";

export const getTradesByPortfolio = async (portfolioId: string) => {
  try {
    const user = await getUserSession();

    if (!user) {
      return {
        success: false,
        message: UNAUTHORIZED_USER_NO_SESSION,
      };
    }

    const trades: AxiosResponse<Trades[]> = await getTradesByPortfolioData(
      portfolioId
    );

    return {
      success: true,
      data: trades.data,
    };
  } catch (error) {
    axiosError(error);
  }
};

export const createTrade = async (data: TradeSchema, portfolioId: string) => {
  try {
    const validatedData = tradeSchema.parse(data);

    const { public_id, secure_url } = await uploadImageToCloudinary(
      data.screenshot
    );

    if (!public_id || !secure_url) {
      return {
        success: false,
        message: "Something went wrong uploading image",
      };
    }

    const user = await getUserSession();

    if (!user) {
      return {
        success: false,
        message: UNAUTHORIZED_USER_NO_SESSION,
      };
    }

    const tradeData: Trade = {
      symbol: validatedData.symbol.toUpperCase(),
      position: validatedData.position,
      entryDate: new Date(formatDateToUTCDate(validatedData.entryDate)),
      exitDate: new Date(formatDateToUTCDate(validatedData.exitDate)),
      entryPrice: validatedData.entryPrice,
      exitPrice: validatedData.exitPrice,
      lotSize: validatedData.lotSize,
      pnl: validatedData.pnl,
      userId: user.id!,
      portfolioId: portfolioId,
      screenshotId: public_id,
      screenshotUrl: secure_url,
    };

    const response = await createTradeData(tradeData);

    return {
      success: true,
      message: response.data,
    };
  } catch (error: unknown) {
    return axiosError(error);
  }
};

export const updateTrade = async (data: TradeSchema, trade: Trades) => {
  try {
    const validatedData = tradeSchema.parse(data);

    const updatedTrade: Trades = {
      ...trade,
      symbol: validatedData.symbol,
      position: validatedData.position,
      entryDate: new Date(formatDateToUTCDate(validatedData.entryDate)),
      exitDate: new Date(formatDateToUTCDate(validatedData.exitDate)),
      entryPrice: new Prisma.Decimal(validatedData.entryPrice),
      exitPrice: new Prisma.Decimal(validatedData.exitPrice),
      lotSize: new Prisma.Decimal(validatedData.lotSize),
      pnl: new Prisma.Decimal(validatedData.pnl),
    };

    if (typeof data.screenshot === "string") {
      updatedTrade.screenshotId = trade.screenshotId;
      updatedTrade.screenshotUrl = trade.screenshotUrl;
    }

    if (typeof data.screenshot === "object") {
      /** TODO
       * 1. Delete cloudinary image using public_id
       * 2. Upload image to cloudinary
       * 3. extract new public_id and secure_url from the uploaded cloudinary image
       * 4. include public_id and secure_url to updateTrade object
       * 5. Pass updatedTrade object to api
       */
    }

    return {
      success: true,
      message: "",
    };
  } catch (error) {
    axiosError(error);
  }
};
