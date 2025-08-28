/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Influence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Influence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Influence" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Influence_name_key" ON "public"."Influence"("name");

-- AddForeignKey
ALTER TABLE "public"."Influence" ADD CONSTRAINT "Influence_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
