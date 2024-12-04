import { Band } from "@prisma/client";
import Link from "next/link";
import prisma from "@/app/lib/prisma";

export default async function Bands() {

    const bands: Band[] = await prisma.band.findMany({

    });

    return (
        <div>
            <div className="text-center flex flex-col gap-3 py-3 justify-center">
                <h1 className="text-4xl font-bold">Bands</h1>
                <ul className="justify-center flex flex-col w-80 mx-auto">
                    {bands.map((band) => (
                        <li key={band.id} className="hover:bg-slate-700 rounded">
                            <Link href={`/band/${band.id}`}><h2 className="text-2xl py-2">{band.name}</h2></Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}