import { Band } from "@prisma/client";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { createClient } from "../lib/supabase/server";

export default async function Bands() {

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const bands: Band[] = await prisma.band.findMany();

    return (
        <div>
            <div className="text-center flex flex-col gap-3 py-3 justify-center">
                <h1 className="text-4xl font-bold">Bands</h1>
                {user && <Link href="/band/create"><button className="bg-slate-700 text-white rounded py-2 px-4">Create Band</button></Link>}
                {!user && <p className="text-lg">Login to create a band</p>}
                <ul className="justify-center flex flex-col w-80 mx-auto">
                    {bands.map((band) => (
                        <li key={band.id} className="hover:bg-slate-700 rounded">
                            <Link href={`/band/${band.id}`}><h2 className={`text-2xl py-2 ${band.lookingForMembers ? "text-blue-800" : ""}`}>{band.name}</h2></Link>
                        </li>
                    ))}
                </ul>
            </div>

        </div>

    )
}