import { SignUpSchema } from "../validations/auth-schema";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const signUpUserData = async (user: SignUpSchema) => {
  const response = axios.post(`${apiUrl}/api/sign-up`, user);

  return response;
};
