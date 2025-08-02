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
import { Trades } from "@prisma/client";
import { AxiosResponse } from "axios";

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

    const user = await getUserSession();

    if (!user) {
      return {
        success: false,
        message: UNAUTHORIZED_USER_NO_SESSION,
      };
    }

    const tradeData: Trade = {
      symbol: validatedData.symbol,
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

export const uploadImageToCloudinary = async (file: File) => {
  try {
    const formData = new FormData();
    const cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinary_upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    const cloudianry_asset_folder = process.env.CLOUDINARY_ASSET_FOLDER;

    formData.append("file", file);
    formData.append("upload_preset", `${cloudinary_upload_preset}`);
    formData.append("asset_folder", `${cloudianry_asset_folder}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudinary = await response.json();

    return cloudinary;
  } catch (error) {
    return axiosError(error);
  }
};
