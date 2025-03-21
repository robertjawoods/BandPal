/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - The primary key for the `_BandToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ChatToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_SetlistToSong` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_BandToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_ChatToUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[A,B]` on the table `_SetlistToSong` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "allowMessages" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lookingForBand" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "_BandToUser" DROP CONSTRAINT "_BandToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_AB_pkey";

-- AlterTable
ALTER TABLE "_SetlistToSong" DROP CONSTRAINT "_SetlistToSong_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_BandToUser_AB_unique" ON "_BandToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToUser_AB_unique" ON "_ChatToUser"("A", "B");

-- CreateIndex
CREATE UNIQUE INDEX "_SetlistToSong_AB_unique" ON "_SetlistToSong"("A", "B");
