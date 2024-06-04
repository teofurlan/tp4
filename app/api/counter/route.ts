import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data: any = await request.json();
    const counter = await prisma.counter.create({
      data: {
        count: 0,
        color: data.color,
      },
    });
    return NextResponse.json(counter, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      {
        message: err,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json(await prisma.counter.findMany());
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error,
        },
        { status: 500 }
      );
    }
  }
}
