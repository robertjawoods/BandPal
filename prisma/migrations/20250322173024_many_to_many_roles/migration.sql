/*
  Warnings:

  - You are about to drop the column `profileId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_profileId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "profileId";

-- CreateTable
CREATE TABLE "_ProfileToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProfileToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProfileToRole_B_index" ON "_ProfileToRole"("B");

-- AddForeignKey
ALTER TABLE "_ProfileToRole" ADD CONSTRAINT "_ProfileToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToRole" ADD CONSTRAINT "_ProfileToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
