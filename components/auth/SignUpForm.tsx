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

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    const response = await signUpUser(data);

    if (response) {
      if (!response.success) {
        toast(
          <p className="text-sm text-[var(--color-destructive)]">
            {response.message}
          </p>
        );
      }

      if (response.success) {
        toast(
          <p className="text-sm text-[var(--color-successfull)]">
            {response.message}
          </p>
        );
        redirect("/sign-in");
      }
    }
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

          <div className="flex flex-col gap-3">
            <Label htmlFor="password" className="text-gray-700">
              Password
            </Label>
            <Input type="password" {...register("password")} />
          </div>

          {errors.password && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.password.message}{" "}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Label htmlFor="confirmPassword" className="text-gray-700">
              Confirm password
            </Label>
            <Input type="password" {...register("confirmPassword")} />
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-[var(--color-destructive)]">
              {errors.confirmPassword.message}{" "}
            </p>
          )}
        </div>

        <Button className="w-full bg-[var(--color-primary)] text-white">
          Sign Up
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
