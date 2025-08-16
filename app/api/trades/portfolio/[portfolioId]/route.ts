import prisma from "@/db/prisma";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { Trades } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ portfolioId: string }> }
) => {
  try {
    const { portfolioId } = await params;

    if (!portfolioId) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    const trades: Trades[] = await prisma.trades.findMany({
      where: {
        portfolioId: portfolioId,
      },
    });

    return new NextResponse(JSON.stringify(trades), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
      status: 500,
    });
  }
};
