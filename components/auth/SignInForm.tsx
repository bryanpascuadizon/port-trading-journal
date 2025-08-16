"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signInByUsername } from "@/lib/actions/auth-actions";
import { useActionState, useState } from "react";
import { APP_NAME, APP_SLOGAN } from "@/lib/constants";
import PasswordVisibility from "./PasswordVisibility";
import OAuthButton from "./OAuthButton";
import LoaderCircleIcon from "../utils/LoaderCircleIcon";

const SignInPage = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [data, action, isLoginPending] = useActionState(signInByUsername, {
    success: false,
    message: "",
  });

  return (
    <div className="w-full flex flex-col gap-3">
      <form action={action} className="flex flex-col gap-3">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">{APP_NAME}</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {APP_SLOGAN}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Label htmlFor="username" className="text-gray-700">
              Username
            </Label>
            <Input id="username" name="username" />
          </div>

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type={isVisiblePassword ? "text" : "password"}
              className="pr-10"
            />
            <PasswordVisibility
              showPassword={isVisiblePassword}
              setShowPassword={setIsVisiblePassword}
            />
          </div>
        </div>

        <p className="text-sm text-center text-[var(--color-destructive)]">
          {!data?.success && data?.message}
        </p>

        <Button className="w-full bg-[var(--color-primary)] text-white">
          {isLoginPending ? <LoaderCircleIcon /> : "Sign in"}
        </Button>
      </form>
      <div className="flex flex-col gap-3">
        <div className="text-center text-[var(--color-muted-foreground)] text-sm">
          or sign in with
        </div>

        <OAuthButton label="Google" provider="google" />
        <OAuthButton label="Github" provider="github" />

        <p className="text-center text-sm text-[var(--color-muted-foreground)]">
          Don’t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-[var(--color-primary)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
