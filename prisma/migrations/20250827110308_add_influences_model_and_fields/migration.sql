-- CreateTable
CREATE TABLE "public"."Influence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Influence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BandToInfluence" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BandToInfluence_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "public"."_InfluenceToProfile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InfluenceToProfile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Influence_slug_key" ON "public"."Influence"("slug");

-- CreateIndex
CREATE INDEX "_BandToInfluence_B_index" ON "public"."_BandToInfluence"("B");

-- CreateIndex
CREATE INDEX "_InfluenceToProfile_B_index" ON "public"."_InfluenceToProfile"("B");

-- AddForeignKey
ALTER TABLE "public"."_BandToInfluence" ADD CONSTRAINT "_BandToInfluence_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Band"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BandToInfluence" ADD CONSTRAINT "_BandToInfluence_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Influence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_InfluenceToProfile" ADD CONSTRAINT "_InfluenceToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Influence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_InfluenceToProfile" ADD CONSTRAINT "_InfluenceToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
