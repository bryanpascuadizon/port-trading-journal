"use server";

import {
  createTradeData,
  deleteTradeData,
  getTradesByPortfolioData,
  updateTradeData,
} from "../service/trade-service";
import { axiosError, formatDateToUTCDate } from "../utils";
import { TradeSchema, tradeSchema } from "../validations/trade-schema";
import { Trade } from "../types";
import { UNAUTHORIZED_USER_NO_SESSION } from "../constants";
import { getUserSession } from "./auth-actions";
import { Prisma, Trades } from "@prisma/client";
import { AxiosResponse } from "axios";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../cloudinary";

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

    const cloudinaryResponse = await uploadImageToCloudinary(data.screenshot);

    if (!cloudinaryResponse) {
      return {
        success: false,
        message: "Something went wrong uploading screenshot",
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
      remarks: validatedData.remarks,
      userId: user.id!,
      portfolioId: portfolioId,
      screenshotId: cloudinaryResponse.public_id,
      screenshotUrl: cloudinaryResponse.secure_url,
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
      remarks: validatedData.remarks,
    };

    if (typeof data.screenshot === "string") {
      updatedTrade.screenshotId = trade.screenshotId;
      updatedTrade.screenshotUrl = trade.screenshotUrl;
    }

    if (typeof data.screenshot === "object") {
      const deleteResponse = await deleteImageFromCloudinary(
        trade.screenshotId
      );

      if (deleteResponse.result !== "ok") {
        return {
          success: false,
          message: "Something went wrong deleting screenshot",
        };
      }

      const uploadResponse = await uploadImageToCloudinary(data.screenshot);

      if (!uploadResponse) {
        return {
          success: false,
          message: "Something went wrong uploading screenshot",
        };
      }

      updatedTrade.screenshotId = uploadResponse.public_id;
      updatedTrade.screenshotUrl = uploadResponse.secure_url;
    }

    const response = await updateTradeData(updatedTrade);

    return {
      success: true,
      message: response.data,
    };
  } catch (error: unknown) {
    return axiosError(error);
  }
};

export const deleteTrade = async (tradeId: string, screenshotId: string) => {
  try {
    const deleteResponse = await deleteImageFromCloudinary(screenshotId);

    if (deleteResponse.result !== "ok") {
      return {
        success: false,
        message: "Something went wrong deleting screenshot",
      };
    }

    const response = await deleteTradeData(tradeId);

    return {
      success: true,
      message: response.data,
    };
  } catch (error: unknown) {
    return axiosError(error);
  }
};
