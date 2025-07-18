"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Icons } from "@/lib/icons";
import { signInByOAuth } from "@/lib/handlers/auth-handler";

const SignInPage = () => {
  const handleOAuthSignIn = async (provider: string) => {
    await signInByOAuth(provider);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-full flex flex-col gap-3"
    >
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Trading Journal</h2>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Journal your trades here!
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Label htmlFor="username" className="text-gray-700">
            Username
          </Label>
          <Input id="username" name="username" />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <Input id="password" name="password" type="password" />
        </div>
      </div>

      <Button className="w-full bg-[var(--color-primary)] text-white">
        Login
      </Button>

      <div className="text-center text-[var(--color-muted-foreground)] text-sm">
        or sign in with
      </div>

      <Button
        // className="button"
        variant="outline"
        onClick={() => handleOAuthSignIn("google")}
      >
        <Icons.google />
        Google
      </Button>

      <Button variant="outline" onClick={() => handleOAuthSignIn("github")}>
        <Icons.github />
        Github
      </Button>
      <p className="text-center text-sm text-[var(--color-muted-foreground)]">
        Don’t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-[var(--color-primary)] hover:underline"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignInPage;
