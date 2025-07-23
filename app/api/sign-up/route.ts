import prisma from "@/db/prisma";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { hashPassword } from "@/lib/utils";
import { SignUpSchema } from "@/lib/validations/auth-schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: SignUpSchema = await request.json();

    if (!body) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 404,
      });
    }

    const isExisitng = await prisma.user.findUnique({
      where: {
        username: body.username,
      },
    });

    if (isExisitng) {
      return new NextResponse(JSON.stringify("Username already exists"), {
        status: 409,
      });
    }

    const hashedPassword = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        hashedPassword,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify("Sign up successful"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
      status: 500,
    });
  }
};
