import Image from "next/image";
import styles from "./page.module.css";
import { prisma, PrismaClient } from "@repo/database";

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
  const bands = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/band`)


  return (
    <main className={styles.main}>
      {
        bands.map(b => <p>{b.}</p>)
      }
    </main>
  );
}
