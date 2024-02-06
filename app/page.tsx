import { type Band } from "@prisma/client";
import Link from "next/link";
import prisma from "./lib/prisma";

export default async function Home() {
  const bands: Band[] = await prisma.band.findMany();

  return (
    <main >
      {
        bands.map(b => <Link href={'/band/' + b.id} key={b.id}>{b.name}</Link>)
      }
    </main>
  );
}