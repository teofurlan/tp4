-- CreateTable
CREATE TABLE "Counter" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("id")
);
