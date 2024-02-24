/*
  Warnings:

  - Added the required column `bandId` to the `Setlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bandId` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setlist" ADD COLUMN     "bandId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "bandId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setlist" ADD CONSTRAINT "Setlist_bandId_fkey" FOREIGN KEY ("bandId") REFERENCES "Band"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
