"use server";

import { signIn } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
    return {
      success: false,
      message: "Invalid username or password",
    };
  }
};
