/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Band` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Band_userId_name_key" ON "Band"("userId", "name");
