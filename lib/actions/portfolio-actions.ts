import { createPortfolioData } from "../handlers/portfolio-handlers";
import { axiosError } from "../utils";
import {
  PortfolioSchema,
  portfolioSchema,
} from "../validations/portfolio-schema";

export const createPorfolio = async (data: PortfolioSchema) => {
  try {
    const validatedData = portfolioSchema.parse(data);

    const portfolio: PortfolioSchema = {
      name: validatedData.name,
      description: validatedData.description,
      broker: validatedData.broker,
      accountNumber: validatedData.accountNumber,
      isDefault: validatedData.isDefault,
    };

    const response = await createPortfolioData(portfolio);

    return {
      success: true,
      message: response.data,
    };
  } catch (error: unknown) {
    return axiosError(error);
  }
};
