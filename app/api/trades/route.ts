import prisma from "@/db/prisma";
import { DEFAULT_ERROR_MESSAGE } from "@/lib/constants";
import { Trade } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: Trade = await request.json();

    const response = await prisma.trades.create({
      data: body,
    });

    if (!response) {
      return new NextResponse(JSON.stringify(DEFAULT_ERROR_MESSAGE), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify("Trade successfully created"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Failed to create trade"), {
      status: 500,
    });
  }
};
