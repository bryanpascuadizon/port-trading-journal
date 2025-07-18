import { SignUpSchema } from "../validations/auth-schema";

export const registerUserData = async (user: SignUpSchema) => {
  const response = await fetch(``, {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => res.json());

  return response;
};
