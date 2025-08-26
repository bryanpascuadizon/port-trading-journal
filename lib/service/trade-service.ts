import axios, { AxiosResponse } from "axios";
import { Trade } from "../types";
import { Trades } from "@prisma/client";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getTradesByPortfolioData = async (
  portfolioId: string
): Promise<AxiosResponse<Trades[]>> => {
  const response = await axios.get(
    `${apiUrl}/api/trades/portfolio/${portfolioId}`
  );

  return response;
};

export const createTradeData = async (data: Trade) => {
  const response = await axios.post(`${apiUrl}/api/trades`, data);

  return response;
};

export const updateTradeData = async (data: Trades) => {
  const response = await axios.patch(`${apiUrl}/api/trades`, data);

  return response;
};

export const deleteTradeData = async (tradeId: string) => {
  const response = await axios.delete(`${apiUrl}/api/trades/${tradeId}`);

  return response;
};
