import axios from "axios";
import { PortfolioSchema } from "../validations/portfolio-schema";

export const createPortfolioData = async (data: PortfolioSchema) => {
  const response = await axios.post(`/api/portfolio`, data);

  return response;
};
