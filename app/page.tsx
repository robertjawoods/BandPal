import { type Band } from "@prisma/client";
import Link from "next/link";
import prisma from "./lib/prisma";
import AccountComponent from "./components/AccountComponent";
// import { auth } from "./auth";
import CreateBand from "./components/CreateBand";

export default async function Home() {
  const bands: Band[] = await prisma.band.findMany();


  return (
    <main>
      <AccountComponent />

      <CreateBand />

      <div>
        <h1>Bandso</h1>
        <ul>
          {bands.map((band) => (
            <li key={band.id}>
              <Link href={`/band/${band.id}`}>{band.name}</Link>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}