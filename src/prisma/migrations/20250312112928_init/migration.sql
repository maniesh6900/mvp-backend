/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Campaign` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Campaign" DROP CONSTRAINT "Campaign_creatorId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "creatorId";
