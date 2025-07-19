"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signUpSchema, SignUpSchema } from "../validations/auth-schema";
import { signUpUserData } from "../handlers/auth-handlers";
import { axiosError } from "../utils";

export const signInByOAuth = async (provider: string) => {
  try {
    await signIn(provider);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
  }
};

export const signInByUsername = async (
  prevState: unknown,
  formData: FormData
) => {
  try {
    if (!formData.get("username") || !formData.get("password")) {
      return {
        success: false,
        message: "Invalid username or password",
      };
    }

    const user = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    await signIn("credentials", user);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Invalid username or password",
    };
  }
};

export const signUpUser = async (data: SignUpSchema) => {
  try {
    const validatedData = signUpSchema.parse(data);

    const user: SignUpSchema = {
      username: validatedData.username,
      name: validatedData.name,
      password: validatedData.password,
    };

    const response = await signUpUserData(user);

    return {
      success: true,
      message: response.data,
    };
  } catch (error: unknown) {
    return axiosError(error);
  }
};

export const signOutUser = async () => {
  await signOut();
};
