"use server";
import { Counter, Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCurrentCount = async (id: number): Promise<number> => {
  const counter = await prisma.counter.findFirst({
    where: {
      id: id,
    },
  });
  return counter ? counter.count : -1;
};
