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
