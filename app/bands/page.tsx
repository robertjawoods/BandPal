import { Band } from "@prisma/client";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export default async function Bands() {

    const bands: Band[] = await prisma.band.findMany();

    return (
        <div>
            <h1>Bands</h1>
            <ul>
                {bands.map((band) => (
                    <li key={band.id}>
                        <Link href={`/band/${band.id}`}>{band.name}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}