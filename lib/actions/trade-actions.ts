import { createTradeData } from "../handlers/trade-handlers";
import { axiosError } from "../utils";
import { TradeSchema, tradeSchema } from "../validations/trade-schema";

export const createTrade = async (data: TradeSchema) => {
  try {
    const validatedData = tradeSchema.parse(data);

    console.log(validatedData);

    const response = await createTradeData(data);

    console.log(response);
  } catch (error: unknown) {
    return axiosError(error);
  }
};
