import { getCurrentCount } from "@/app/services/counters";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
interface Params {
  params: { id: number };
}
const prisma = new PrismaClient();

export async function GET(request: Request, { params }: Params) {
  try {
    return NextResponse.json(
      await prisma.counter.findFirst({
        where: {
          id: Number(params.id),
        },
      })
    );
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json();
    const currentCount = await getCurrentCount(Number(params.id));

    if (currentCount === -1) {
      return NextResponse.json(
        { message: "Counter not found" },
        { status: 404 }
      );
    }

    const newCount =
      currentCount + Number(data.diff) > 0
        ? currentCount + Number(data.diff)
        : 0;

    const updatedCounter = await prisma.counter.update({
      where: {
        id: Number(params.id),
      },
      data: { count: newCount },
    });

    return NextResponse.json(updatedCounter);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating counter:", error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
