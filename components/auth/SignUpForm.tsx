"use client";

import { APP_NAME } from "@/lib/constants";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@/lib/validations/auth-schema";
import { Button } from "../ui/button";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/auth-actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import PasswordVisibility from "./PasswordVisibility";
import ToastMessage from "../ToastMessage";

const SignUpForm = () => {
  const [isPending, startTranstion] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpSchema) => {
    startTranstion(async () => {
      const response = await signUpUser(data);

      toast(
        <ToastMessage success={response.success} message={response.message} />
      );

      if (response.success) {
        redirect("/sign-in");
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="text-center">
          <h2 className="text-3xl font-semibold">{APP_NAME}</h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Sign up here
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-gray-700">
              Name
            </Label>
            <Input {...register("name")} />
          </div>

          {errors.name && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.name.message}{" "}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Label htmlFor="username" className="text-gray-700">
              Username
            </Label>
            <Input {...register("username")} />
          </div>

          {errors.username && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.username.message}{" "}
            </p>
          )}

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <PasswordVisibility
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>

          {errors.password && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.password.message}{" "}
            </p>
          )}

          <div className="flex flex-col gap-3 relative">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              Confirm password
            </Label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
            />
            <PasswordVisibility
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
            />
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.confirmPassword.message}{" "}
            </p>
          )}
        </div>

        <Button className="w-full bg-[var(--color-primary)] text-white">
          {isPending ? "Signing up..." : "Sign up"}
        </Button>

        <p className="text-center text-sm text-[var(--color-muted-foreground)]">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[var(--color-primary)] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
