/*
  Warnings:

  - You are about to drop the column `refferdEmail` on the `Reffer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reffer" DROP COLUMN "refferdEmail";

-- CreateTable
CREATE TABLE "ReffencedUser" (
    "id" TEXT NOT NULL,
    "refferId" TEXT NOT NULL,

    CONSTRAINT "ReffencedUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReffencedUser" ADD CONSTRAINT "ReffencedUser_refferId_fkey" FOREIGN KEY ("refferId") REFERENCES "Reffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
