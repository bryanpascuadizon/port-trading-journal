import prisma from "@/db/prisma";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ tradeId: string }>;
  }
) => {
  try {
    const { tradeId } = await params;

    if (!tradeId) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    const response = await prisma.trades.delete({
      where: {
        id: tradeId,
      },
    });

    if (!response) {
      return new NextResponse(JSON.stringify("Failed to update trade"), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify("Trade successfully deleted"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
      status: 500,
    });
  }
};
