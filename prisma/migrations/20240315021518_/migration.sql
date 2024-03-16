/*
  Warnings:

  - A unique constraint covering the columns `[chatId,id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_chatId_id_key" ON "Message"("chatId", "id");
