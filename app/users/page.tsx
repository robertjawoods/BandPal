import { User } from "@prisma/client";
import Link from "next/link";
import prisma from "@/app/lib/prisma";
import { getUser } from "../lib/supabase/server";

export const dynamic = 'force-dynamic' // defaults to auto

export default async function Users() {

    const users: User[] = await prisma.user.findMany();

    const { user: currentUser } = await getUser();


    return (
        <div className="flex items-center flex-col">
            <h1 className="mb-4 text-1xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className={`${user.id === currentUser?.id ? "text-blue-600" : "" }`}>
                        <Link href={`/user/${user.id}`}>{user.name ?? user.email}</Link>
                    </li>
                ))}
            </ul>
        </div>

    )
}