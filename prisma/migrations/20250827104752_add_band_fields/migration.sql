/*
  Warnings:

  - You are about to drop the column `website` on the `Band` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Band" DROP COLUMN "website",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lookingForMembers" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
