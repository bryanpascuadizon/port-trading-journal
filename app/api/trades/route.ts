import prisma from "@/db/prisma";
import { Trade } from "@/lib/types";
import { Trades } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const body: Trade = await request.json();

    const response = await prisma.trades.create({
      data: body,
    });

    if (!response) {
      return new NextResponse(JSON.stringify("Failed to create trade"), {
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

export const PATCH = async (request: NextRequest) => {
  try {
    const body: Trades = await request.json();

    const response = await prisma.trades.update({
      where: {
        id: body.id,
      },
      data: {
        ...body,
      },
    });

    if (!response) {
      return new NextResponse(JSON.stringify("Failed to update trade"), {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify("Trade successfully updated"), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Failed to update trade"), {
      status: 500,
    });
  }
};
