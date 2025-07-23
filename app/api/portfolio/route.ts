import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { PortfolioSchema } from "@/lib/validations/portfolio-schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: PortfolioSchema = await request.json();

    if (!body) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(DEFAULT_ERROR_MESSAGE, {
        status: 500,
      });
    }

    const isPortfolioNameExisting = await prisma.portfolio.findFirst({
      where: {
        userId: session?.user?.id,
        name: body.name,
      },
    });

    if (isPortfolioNameExisting) {
      return new NextResponse(JSON.stringify("Portfolio name already exists"), {
        status: 409,
      });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        description: body.description,
        broker: body.broker,
        accountNumber: Number(body.accountNumber),
        isDefault: body.isDefault,
        userId: session.user.id,
      },
    });

    if (!portfolio) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify("Creating portfolio successful"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
      status: 500,
    });
  }
};
