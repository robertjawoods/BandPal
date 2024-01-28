-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Band" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Band_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lengthSeconds" INTEGER NOT NULL,
    "timeSignatures" TEXT NOT NULL,
    "lyrics" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Setlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BandToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SetlistToSong" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Band_userId_key" ON "Band"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_BandToUser_AB_unique" ON "_BandToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_BandToUser_B_index" ON "_BandToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SetlistToSong_AB_unique" ON "_SetlistToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_SetlistToSong_B_index" ON "_SetlistToSong"("B");

-- AddForeignKey
ALTER TABLE "Band" ADD CONSTRAINT "Band_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToUser" ADD CONSTRAINT "_BandToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BandToUser" ADD CONSTRAINT "_BandToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetlistToSong" ADD CONSTRAINT "_SetlistToSong_A_fkey" FOREIGN KEY ("A") REFERENCES "Setlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetlistToSong" ADD CONSTRAINT "_SetlistToSong_B_fkey" FOREIGN KEY ("B") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
