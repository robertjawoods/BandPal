/*
  Warnings:

  - You are about to drop the column `role` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Band" ADD COLUMN     "showMembers" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "_BandToUser" ADD CONSTRAINT "_BandToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_BandToUser_AB_unique";

-- AlterTable
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ChatToUser_AB_unique";

-- AlterTable
ALTER TABLE "_SetlistToSong" ADD CONSTRAINT "_SetlistToSong_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SetlistToSong_AB_unique";
