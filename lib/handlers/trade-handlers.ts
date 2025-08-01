import axios from "axios";
import { Trade } from "../types";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const createTradeData = async (data: Trade) => {
  const response = await axios.post(`${apiUrl}/api/trades`, data);

  return response;
};
