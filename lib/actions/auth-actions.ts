"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signUpSchema, SignUpSchema } from "../validations/auth-schema";
import { hashPassword } from "../utils";
import { registerUserData } from "../handlers/auth-handlers";

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

    const hashedPassword = await hashPassword(validatedData.password);

    const user: SignUpSchema = {
      username: validatedData.name,
      name: validatedData.name,
      password: hashedPassword,
    };

    const response = await registerUserData(user);

    if (!response) {
      return {
        error: {
          type: "manual",
          message: "Something went wrong. Please try again",
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      error: {
        type: "manual",
        message: "Something went wrong. Please try again",
      },
    };
  }
};
